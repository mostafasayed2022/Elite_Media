from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import (
    AboutDashboardViewSet,
    JoinTeamViewSet,
    DashboardContactViewSet,
    HomeDashboardViewSet,
    DashboardWorkViewSet,
    RegisterUser,
    TeamMemberViewSet,
    WorkViewSet,
    TeamMember_aboutViewSet,
    HomeViewSet,
    AboutViewSet,
   ContactViewSet,
   ClientImageViewSet,
GetClientImageListView,
   ServiceViewSet,
   get_serviceViewSet,
)

router = DefaultRouter()
router.register(r'jointeam', JoinTeamViewSet)
router.register(r'dashboard_contact', DashboardContactViewSet,basename='dashboard_contact')
router.register(r'home_dashboard', HomeDashboardViewSet,basename='home_dashboard')
router.register(r'about_dashboard', AboutDashboardViewSet,basename='about_dashboard')
router.register(r'dashboard_work', DashboardWorkViewSet,basename='work_dashboard')
router.register(r'team_member', TeamMemberViewSet, basename='team_member')
router.register(r'work', WorkViewSet, basename='work')
router.register(r'team_member_get', TeamMember_aboutViewSet, basename='team_member_get')
router.register(r'home', HomeViewSet, basename='home')
router.register(r'about', AboutViewSet, basename='about')
router.register(r'contact', ContactViewSet, basename='contact')
router.register(r'client_image', ClientImageViewSet, basename='client_image')
# router.register(r'getclient_image', getclientimageViewSet, basename='get_client_image')
router.register(r'service', ServiceViewSet, basename='service')
router.register(r'get_service', get_serviceViewSet, basename='get_service')







urlpatterns = [
   path('getclient_image/', GetClientImageListView.as_view(), name='get_client_image'),

    path('', include(router.urls)),
    path('api/register/', RegisterUser.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
