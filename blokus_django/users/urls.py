from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, PasswordResetRequestView, PasswordResetView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('password-reset-request', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset-confirm/<uidb64>/<token>', PasswordResetView.as_view(), name='password-reset-confirm'),
]