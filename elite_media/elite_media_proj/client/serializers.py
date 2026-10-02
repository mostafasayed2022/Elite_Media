from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.urls import reverse
from rest_framework import serializers
from .models import jointeam, home_dashboard, dashboard_contact, dashboard_work, about_dashboard, team_members, clientimage, service, ContactMessage
from .validators import validate_upload


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, max_length=128, trim_whitespace=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'email': {'required': True, 'allow_blank': False}}

    def validate(self, attrs):
        user = User(username=attrs['username'], email=attrs['email'])
        try:
            validate_password(attrs['password'], user=user)
        except DjangoValidationError as error:
            raise serializers.ValidationError({'password': error.messages}) from error
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_staff']
        read_only_fields = fields


class UploadSerializer(serializers.ModelSerializer):
    """Validate every upload and prevent client-supplied ownership."""
    def validate(self, attrs):
        for name, value in attrs.items():
            if hasattr(value, 'read'):
                kind = 'video' if 'video' in name else 'image'
                validate_upload(value, kind)
        return attrs


class JoinTeamSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(write_only=True)
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = jointeam
        fields = ['id', 'name', 'job_title', 'email', 'linkedin_profile', 'phonenumber', 'portfolio', 'resume', 'resume_url', 'created_at', 'update_at']
        read_only_fields = ['id', 'resume_url', 'created_at', 'update_at']
        extra_kwargs = {'name': {'required': True, 'allow_blank': False, 'allow_null': False}, 'email': {'required': True, 'allow_blank': False}}

    def get_resume_url(self, obj):
        request = self.context.get('request')
        if not obj.resume or not request or not request.user.is_staff:
            return None
        return request.build_absolute_uri(reverse('jointeam-resume', kwargs={'pk': obj.pk}))

    def validate_resume(self, value):
        return validate_upload(value, 'resume')


class Home_dashboardSerailizer(UploadSerializer):
    class Meta:
        model = home_dashboard
        fields = ['id', 'text', 'video', 'image', 'clientvideo', 'teamtext', 'teamvideo', 'teamimage', 'created_at', 'update_at']
        read_only_fields = ['id', 'created_at', 'update_at']


class DashboardContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = dashboard_contact
        fields = ['id', 'address', 'phone', 'email', 'facebook_profile', 'instagram_profile', 'linkedin_profile', 'created_at', 'update_at']
        read_only_fields = ['id', 'created_at', 'update_at']

    def validate(self, attrs):
        for name in ['facebook_profile', 'instagram_profile', 'linkedin_profile']:
            if attrs.get(name):
                attrs[name] = serializers.URLField().run_validation(attrs[name])
                if not attrs[name].startswith('https://'):
                    raise serializers.ValidationError({name: 'Use an HTTPS URL.'})
        return attrs


class DashboardAboutSerializer(UploadSerializer):
    class Meta:
        model = about_dashboard
        fields = ['id', 'text', 'image', 'abouttext_about', 'aboutimage', 'why_choose_ustext', 'why_choose_usimage', 'text_philo', 'image_philo', 'teamtext', 'created_at', 'update_at']
        read_only_fields = ['id', 'created_at', 'update_at']


class DashboardWorkSerializer(UploadSerializer):
