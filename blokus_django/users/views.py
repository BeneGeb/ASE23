from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from .serializers import PasswordResetRequestSerializer, PasswordResetSerializer
from rest_framework import status
from django.contrib.auth.tokens import PasswordResetTokenGenerator



JWT_SECRET = "r3FIem8T67NVumSmD7IrdrC042YTrPAugLZJsucI80GLH0mHWkHmahHZKhc3jON_cu5aHMaIRM3u04svAv11QQ"

class RegisterView(APIView):
    def post(self, request):       
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
 

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=serializer.validated_data['email'])
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)
        reset_link = request.build_absolute_uri(
            reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        )
        # Send email with reset link (this is a simple example)
        send_mail(
            'Password Reset Request',
            'Here is your password reset link: {}'.format(reset_link),
            'from@example.com',
            [user.email],
            fail_silently=False,
        )
        return Response({'message': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    def post(self, request, uidb64, token):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(uidb64=uidb64, token=token)
        return Response({'message': 'Password has been reset successfully'}, status=status.HTTP_200_OK)
