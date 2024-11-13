from rest_framework import serializers
from .models import (
    jointeam,
    home_dashboard,
    dashboard_contact,
    dashboard_work,
    about_dashboard,
    team_members,
    clientimage,
    service,
)

class JoinTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = jointeam
        fields = '__all__'  

class Home_dashboardSerailizer(serializers.ModelSerializer):
    video = serializers.FileField(required=False)
    image = serializers.ImageField(required=False)
    clientvideo = serializers.FileField(required=False)
    clientimage = serializers.ImageField(required=False)
    teamvideo = serializers.FileField(required=False)
    teamimage = serializers.ImageField(required=False)
    servicevideo = serializers.FileField(required=False)
    serviceimage = serializers.ImageField(required=False)

    class Meta:
        model=home_dashboard
        fields='__all__'

class DashboardContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = dashboard_contact
        fields = '__all__'

class DashboardAboutSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    aboutimage = serializers.ImageField(required=False)
    why_choose_usimage = serializers.ImageField(required=False)
    image_philo = serializers.ImageField(required=False)
    
    
    class Meta:
        model = about_dashboard
        fields = '__all__'

class DashboardWorkSerializer(serializers.ModelSerializer):
    logo=serializers.ImageField(required=False)
    video=serializers.FileField(required=False)
    class Meta:
        model = dashboard_work
        fields = '__all__'

class TeamMembersSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = team_members
        fields = '__all__'

class ClientImageSerializer(serializers.ModelSerializer):
    clientimage = serializers.ImageField(required=False)
    class Meta:
        model = clientimage
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    servicevideo = serializers.FileField(required=False)
    serviceimage = serializers.ImageField(required=False)
    class Meta:
        model = service
        fields = '__all__'



