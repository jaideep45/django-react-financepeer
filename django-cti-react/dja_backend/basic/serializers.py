from rest_framework import serializers
 
# import model from models.py
from .models import Datapoint
 
# Create a model serializer
class DatapointSerializer(serializers.HyperlinkedModelSerializer):
    # specify model and fields
    class Meta:
        model = Datapoint
        fields = ('id','userId','title', 'body')