from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

class jointeam(models.Model):
    user=models.ForeignKey(User,related_name='jointeam', on_delete=models.CASCADE)
    name=models.CharField(max_length=40,null=True,blank=True)
    email=models.EmailField(max_length=40,unique=True,blank=True)
    linkedin_profile=models.CharField(max_length=40,null=True,blank=True)
    phonenumber=models.CharField(max_length=40,null=True,blank=True)
    portfolio=models.CharField(max_length=200,null=True,blank=True)
    resume=models.FileField(upload_to='resumes/')
    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-created_at'] 

    def __str__(self):
        return self.user.username

class home_dashboard(models.Model):
    user=models.OneToOneField(User,related_name='home_dashboard', on_delete=models.CASCADE)

    text = models.TextField(_("Description"),null=True,blank=True) 
    video=models.FileField(upload_to='dashboard_home/intro_session/video/',null=True,blank=True)
    image=models.ImageField(upload_to='dashboard_home/intro_session/image/',null=True,blank=True)

    clientvideo=models.FileField(upload_to='dashboard_home/client_session/video/',null=True,blank=True)

    teamtext = models.TextField(_("Description"),null=True,blank=True) 
    teamvideo=models.FileField(upload_to='dashboard_home/team_session/video/',null=True,blank=True)
    teamimage=models.ImageField(upload_to='dashboard_home/team_session/image/',null=True,blank=True)

    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-created_at'] 

    def __str__(self):
        return self.user.username

class service(models.Model):
    user=models.ForeignKey(User,related_name='service', on_delete=models.CASCADE)

    servicename=models.CharField(max_length=40,null=True,blank=True)
    serviceimage=models.ImageField(upload_to='dashboard_home/service_session/image/',null=True,blank=True)
    servicevideo=models.FileField(upload_to='dashboard_home/service_session/video/',null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)

    class Meta:
        ordering=['-created_at']
    def __str__(self):
        return self.user.username
    

class clientimage(models.Model):
 user=models.ForeignKey(User,related_name='clientimage', on_delete=models.CASCADE)
 clientimage=models.ImageField(upload_to='dashboard_home/client_session/image/',null=True,blank=True)
 created_at=models.DateTimeField(auto_now_add=True)
 update_at=models.DateTimeField(auto_now=True)
 class Meta:
        ordering=['-created_at'] 

 def __str__(self):
        return self.user.username


class about_dashboard(models.Model):
    user=models.OneToOneField(User,related_name='about_client_session', on_delete=models.CASCADE)
    text = models.TextField(_("Description"),null=True,blank=True)
    image=models.ImageField(upload_to='dashboard_about/clients_session/image/',null=True,blank=True)

    abouttext_about = models.TextField(_("Description"),null=True,blank=True)
    aboutimage=models.ImageField(upload_to='dashboard_about/session/image/',null=True,blank=True)

    why_choose_ustext = models.TextField(_("Description"),null=True,blank=True)
    why_choose_usimage=models.ImageField(upload_to='dashboard_about/why_choose_us_session/image/',null=True,blank=True)

    text_philo = models.TextField(_("Description"),null=True,blank=True)
    image_philo=models.ImageField(upload_to='dashboard_about/session/image_philo/',null=True,blank=True)

    teamtext = models.TextField(_("Description"),null=True,blank=True)

    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-created_at'] 

    def __str__(self):
        return self.user.username

class team_members(models.Model):
        user=models.ForeignKey(User,related_name='team_members_session', on_delete=models.CASCADE)
        name=models.CharField(max_length=40,null=True,blank=True)
        title=models.CharField(max_length=255,null=True,blank=True)
        image=models.ImageField(upload_to='dashboard_about/team_members_session/image/',null=True,blank=True)
        created_at=models.DateTimeField(auto_now_add=True)
        update_at=models.DateTimeField(auto_now=True)
        class Meta:
         ordering=['-created_at'] 

        def __str__(self):
         return self.user.username


class dashboard_contact(models.Model):
    user=models.OneToOneField(User,related_name='dashboard_contact', on_delete=models.CASCADE)
    address=models.CharField(max_length=255)
    phone=models.CharField(max_length=255)
    email=models.EmailField(max_length=255)
    facebook_profile=models.CharField(max_length=100)
    instagram_profile=models.CharField(max_length=100)
    linkedin_profile=models.CharField(max_length=100)
    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-created_at'] 

    def __str__(self):
        return self.user.username

class dashboard_work(models.Model):
    user=models.ForeignKey(User,related_name='dashboard_work', on_delete=models.CASCADE)
    title=models.CharField(max_length=255,null=True,blank=True)
    logo=models.ImageField(upload_to='dashboard_work/intro_session/image/',null=True,blank=True)
    deliverables=models.CharField(max_length=100)
    video=models.FileField(upload_to='dashboard_work/intro_session/video/',null=True,blank=True)

    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-created_at'] 

    def __str__(self):
        return self.user.username
    



