from django.shortcuts import render
from rest_framework import status,viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser


from .models import (
    jointeam,
  home_dashboard,
    dashboard_contact,
    dashboard_work,
    about_dashboard,
    team_members,
    clientimage,
    service
)
from .serializers import (
    JoinTeamSerializer,
 Home_dashboardSerailizer,
    DashboardContactSerializer,
    DashboardWorkSerializer,
    DashboardAboutSerializer,
    TeamMembersSerializer,
    ClientImageSerializer,
    ServiceSerializer
)

class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)  
        )
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


class JoinTeamViewSet(viewsets.ModelViewSet):
    queryset = jointeam.objects.all()
    serializer_class = JoinTeamSerializer



class DashboardContactViewSet(viewsets.ModelViewSet):
   
    serializer_class = DashboardContactSerializer
    permission_classes = [IsAuthenticated]  
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        
        user = self.request.user
        if user.is_superuser:
            return dashboard_contact.objects.all()  
        return dashboard_contact.objects.filter(user=user)  

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            
            instance = dashboard_contact.objects.get(user=user)
            return self.update(request, *args, **{'pk': instance.id})
        except dashboard_contact.DoesNotExist:
            
            data = request.data.copy()
            data['user'] = user.id  
            serializer = self.get_serializer(data=data)

            if serializer.is_valid():
                serializer.save()  
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            
            print("An unexpected error occurred:", str(e))
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def update(self, request, *args, **kwargs):
       
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

       
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to update this contact."}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['user'] = request.user.id  

        serializer = self.get_serializer(instance, data=data, partial=partial)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this entry."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the file from storage
        if instance.clientimage:
            instance.clientimage.delete()
        # Delete the database record
        instance.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    

    
class HomeDashboardViewSet(viewsets.ModelViewSet):
    serializer_class = Home_dashboardSerailizer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, FormParser)  

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return home_dashboard.objects.all()
        return home_dashboard.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            
            instance = home_dashboard.objects.get(user=user)
            
            return self.update(request, *args, **{'pk': instance.id})
        except home_dashboard.DoesNotExist:
            
            data = request.data.copy()
            data['user'] = user.id

            
            serializer = self.get_serializer(data=data)

            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("An unexpected error occurred:", str(e))
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
     partial = kwargs.pop('partial', True)  # Set to True to allow partial updates
     instance = self.get_object()

     if not request.user.is_superuser and instance.user != request.user:
        return Response({"detail": "You do not have permission to update this dashboard."}, status=status.HTTP_403_FORBIDDEN)

    
     data = request.data

    
     serializer = self.get_serializer(instance, data=data, partial=partial)

     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this entry."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the file from storage
        if instance.clientimage:
            instance.clientimage.delete()
        # Delete the database record
        instance.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    

class AboutDashboardViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardAboutSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return about_dashboard.objects.all()
        return about_dashboard.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            # Check if the user already has an instance
            instance = about_dashboard.objects.filter(user=user).first()

            if instance:
                # If an instance exists, update it instead of creating
                return self.update(request, *args, **{'pk': instance.id})

            # If no instance exists, create a new one
            data = request.data.copy()
            data['user'] = user.id
            
            serializer = self.get_serializer(data=data)

            if serializer.is_valid():
                dashboard = serializer.save()  # Only save after validation
                
                # Handle image uploads
                images = request.FILES.getlist('why_choose_usimage')
                for image in images:
                    why_choose_us_images.objects.create(about_dashboard=dashboard, image=image)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print("An unexpected error occurred:", str(e))
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def update(self, request, *args, **kwargs):
     partial = kwargs.pop('partial', True)  # Set to True to allow partial updates
     instance = self.get_object()
     print(f"Partial: {partial}")
     print(f"Data: {request.data}")
     if not request.user.is_superuser and instance.user != request.user:
        return Response({"detail": "You do not have permission to update this dashboard."}, status=status.HTTP_403_FORBIDDEN)

    
     data = request.data

    
     serializer = self.get_serializer(instance, data=data, partial=partial)

     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this entry."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the file from storage
        if instance.clientimage:
            instance.clientimage.delete()
        # Delete the database record
        instance.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    

class DashboardWorkViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardWorkSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return dashboard_work.objects.all()
        return dashboard_work.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            # Copy the data and add user to the data
            data = request.data.copy()
            data['user'] = user.id

            # Use the serializer to validate and save the new entry
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("An unexpected error occurred:", str(e))
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()

        # Check if the logged-in user is the owner of the dashboard or a superuser
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to update this dashboard."}, status=status.HTTP_403_FORBIDDEN)

        # Get the data from the request
        data = request.data

        # Validate and update the existing entry
        serializer = self.get_serializer(instance, data=data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this entry."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the file from storage
        if instance.clientimage:
            instance.clientimage.delete()
        # Delete the database record
        instance.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    


class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMembersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return team_members.objects.all()
        return team_members.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            # Copy the data and add user to the data
            data = request.data.copy()
            data['user'] = user.id

            # Use the serializer to validate and save the new entry
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("An unexpected error occurred:", str(e))
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()

        # Check if the logged-in user is the owner of the dashboard or a superuser
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to update this dashboard."}, status=status.HTTP_403_FORBIDDEN)

        # Get the data from the request
        data = request.data

        # Validate and update the existing entry
        serializer = self.get_serializer(instance, data=data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this entry."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the file from storage
        if instance.clientimage:
            instance.clientimage.delete()
        # Delete the database record
        instance.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    
class ClientImageViewSet(viewsets.ModelViewSet):
    serializer_class = ClientImageSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return clientimage.objects.all()
        return clientimage.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            # Copy the data and add user to the data
            data = request.data.copy()
            data['user'] = user.id

            # Use the serializer to validate and save the new entry
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("An unexpected error occurred:", str(e))
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()

        # Check if the logged-in user is the owner of the dashboard or a superuser
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to update this dashboard."}, status=status.HTTP_403_FORBIDDEN)

        # Get the data from the request
        data = request.data

        # Validate and update the existing entry
        serializer = self.get_serializer(instance, data=data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this entry."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the file from storage
        if instance.clientimage:
            instance.clientimage.delete()
        # Delete the database record
        instance.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return service.objects.all()
        return service.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            # Copy the data and add user to the data
            data = request.data.copy()
            data['user'] = user.id

            # Use the serializer to validate and save the new entry
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("An unexpected error occurred:", str(e))
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()

        # Check if the logged-in user is the owner of the dashboard or a superuser
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to update this dashboard."}, status=status.HTTP_403_FORBIDDEN)

        # Get the data from the request
        data = request.data

        # Validate and update the existing entry
        serializer = self.get_serializer(instance, data=data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_superuser and instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this entry."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the file from storage
        if instance.clientimage:
            instance.clientimage.delete()
        # Delete the database record
        instance.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    

class WorkViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardWorkSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    # Disable authentication and allow unrestricted access
    authentication_classes = []  # No authentication required
    permission_classes = [AllowAny]  # Allow any user to access the endpoint

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_superuser:
            return dashboard_work.objects.all()
        # Return all objects for unauthenticated or regular users as well
        return dashboard_work.objects.all()



class TeamMember_aboutViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMembersSerializer
    permission_classes = [AllowAny]  # Change if you need restricted access
    authentication_classes = []  # Add JWTAuthentication if required
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_superuser:
            return team_members.objects.all()
        return team_members.objects.all()  # Add logic to filter for non-superusers



class HomeViewSet(viewsets.ModelViewSet):
    serializer_class = Home_dashboardSerailizer
    permission_classes = [AllowAny]
    authentication_classes = []
    parser_classes = (MultiPartParser, FormParser)  

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_superuser:
            return home_dashboard.objects.all()
        return home_dashboard.objects.all()




from rest_framework import generics, mixins



class GetClientImageListView(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = ClientImageSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        # This can be adjusted depending on user permissions or requirements
        if user.is_authenticated and user.is_superuser:
            return clientimage.objects.all()
        return clientimage.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)



class AboutViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardAboutSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_superuser:
            return about_dashboard.objects.all()
        return about_dashboard.objects.all()


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = DashboardContactSerializer
    permission_classes = [AllowAny]  
    authentication_classes = []

    def get_queryset(self):
        
        user = self.request.user
        if user.is_authenticated and user.is_superuser:
            return dashboard_contact.objects.all()  
        return dashboard_contact.objects.all() 
    
class get_serviceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]  
    authentication_classes = []

    def get_queryset(self):
        
        user = self.request.user
        if user.is_authenticated and user.is_superuser:
            return service.objects.all()  
        return service.objects.all() 

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import FrontendControl
from .serializers import FrontendControlSerializer

class FrontendControlView(APIView):
    def get(self, request, *args, **kwargs):
        # Fetch the data from the database
        frontend_control = FrontendControl.objects.first()  # Assuming there's only one record
        if frontend_control:
            serializer = FrontendControlSerializer(frontend_control)
            return Response(serializer.data)
        return Response({"is_feature_enabled": False})  # Default value if not found

class UpdateFrontendControlView(APIView):
    def post(self, request, *args, **kwargs):
        frontend_control, created = FrontendControl.objects.get_or_create(id=1)
        frontend_control.is_feature_enabled = request.data.get("is_feature_enabled", False)
        frontend_control.save()
        return Response({"message": "Feature status updated successfully"})