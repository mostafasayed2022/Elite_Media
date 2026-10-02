from django.conf import settings
from django.db import DatabaseError, connection, transaction
from django.http import FileResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework import generics, mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from . import models, serializers


def set_refresh_cookie(response, token):
    response.set_cookie(
        settings.AUTH_REFRESH_COOKIE_NAME, token,
        max_age=int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
        httponly=True, secure=not settings.DEBUG,
        samesite=settings.AUTH_COOKIE_SAMESITE, path=settings.AUTH_REFRESH_COOKIE_PATH,
    )
    response['Cache-Control'] = 'no-store'
    return response


class CsrfView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        response = Response({'csrfToken': get_token(request)})
        response['Cache-Control'] = 'no-store'
        return response


class CookieAuthView(APIView):
    def get_authenticate_header(self, request):
        return 'Bearer'


@method_decorator(csrf_protect, name='dispatch')
class LoginView(CookieAuthView):
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'auth'

    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = Response({'access': serializer.validated_data['access'], 'user': serializers.UserSerializer(serializer.user).data})
        return set_refresh_cookie(response, serializer.validated_data['refresh'])


@method_decorator(csrf_protect, name='dispatch')
class RefreshView(CookieAuthView):
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'refresh'

    def post(self, request):
        token = request.COOKIES.get(settings.AUTH_REFRESH_COOKIE_NAME)
        if not token:
            raise InvalidToken('Please sign in again.')
        serializer = TokenRefreshSerializer(data={'refresh': token})
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as error:
            raise InvalidToken('Please sign in again.') from error
        return set_refresh_cookie(Response({'access': serializer.validated_data['access']}), serializer.validated_data['refresh'])


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        token = request.COOKIES.get(settings.AUTH_REFRESH_COOKIE_NAME)
        if token:
            try:
                RefreshToken(token).blacklist()
            except TokenError:
                pass
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie(settings.AUTH_REFRESH_COOKIE_NAME, path=settings.AUTH_REFRESH_COOKIE_PATH, samesite=settings.AUTH_COOKIE_SAMESITE)
        response['Cache-Control'] = 'no-store'
        return response

