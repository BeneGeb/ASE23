from rest_framework import serializers
from .models import User
from rest_framework.exceptions import ValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise ValidationError('A user with this email does not exist.')
        return value

class PasswordResetSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=1)
    uidb64 = serializers.CharField(min_length=1)
    password = serializers.CharField(min_length=6, write_only=True)

    def validate(self, data):
        try:
            uid = force_str(urlsafe_base64_decode(data.get('uidb64')))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise ValidationError('Invalid token or user does not exist')

        if not PasswordResetTokenGenerator().check_token(user, data.get('token')):
            raise ValidationError('Invalid token')

        return data

    def save(self, **kwargs):
        uid = force_str(urlsafe_base64_decode(self.validated_data.get('uidb64')))
        user = User.objects.get(pk=uid)
        user.set_password(self.validated_data.get('password'))
        user.save()