from django.shortcuts import render
import json
from django.http import HttpResponse
from django.http import JsonResponse


# Create your views here.

# import viewsets
from rest_framework import viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
 
# import local data
from .serializers import DatapointSerializer
from django.core import serializers
from .models import Datapoint
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    return JsonResponse({'status':400,'message':'Logged out','result':'success'})

def login_view(request):
    try:
        body = json.loads(request.body)
        username = body['username']
        password = body['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status':400,'message':'Logged in','result':'success'})
        else:
            return JsonResponse({'status':200,'message':'Wrong Credentials','result':'failure'})
    except Exception as e:
        raise e


@csrf_exempt 
def upload(request):
    received_json_data = json.loads(request.body)
    print(received_json_data)

    def isValid(js_object):
        for row in js_object:
            print(row)
            if 'userId' not in row:
                return False
            if 'id' not in row:
                return False
            if 'title' not in row:
                return False
            if 'body' not in row:
                return False
        return True

    if (not isValid(received_json_data)):
        print("Not valid")
        return JsonResponse({'status':200,'message':'Not valid file','result':'failure'})

    for data in received_json_data:
        if not Datapoint.objects.filter(id=data["id"]).exists():
            # Insert new data here
            d = Datapoint.objects.create(userId=data["userId"], title=data["title"],body=data["body"], id=data["id"])
            print(d)
        pass

    return JsonResponse({'status':200,'message':'File uploaded','result':'success'})
    pass


# create a viewset
class DatapointViewSet(ReadOnlyModelViewSet):
    # define queryset
    queryset = Datapoint.objects.all()
    # specify serializer to be used
    serializer_class = DatapointSerializer
