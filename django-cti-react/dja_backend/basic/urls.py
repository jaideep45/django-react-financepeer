# basic URL Configurations
from django.urls import include, path
# import routers
from rest_framework import routers
 
# import everything from views
from . import views
from basic.views import *
 
# define the router
router = routers.DefaultRouter()
 
# define the router path and viewset to be used
router.register(r'fetch-all', DatapointViewSet)
 
# specify URL Path for rest_framework
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('upload/',views.upload),
    path('login/',views.login_view),
    path('logout/',views.logout_view)
]