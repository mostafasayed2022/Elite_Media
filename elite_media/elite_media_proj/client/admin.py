from django.contrib import admin
from .models import *
from django.contrib import admin
from .models import FrontendControl

@admin.register(FrontendControl)
class FrontendControlAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_feature_enabled')
    list_editable = ('is_feature_enabled',)


admin.site.register(jointeam)

admin.site.register(home_dashboard)
admin.site.register(about_dashboard)
admin.site.register(clientimage)
admin.site.register(service)
admin.site.register(dashboard_contact)
admin.site.register(dashboard_work)
admin.site.register(team_members)

