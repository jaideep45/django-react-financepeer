from django.db import models

# Create your models here.

class Datapoint(models.Model):
    id = models.BigAutoField(primary_key=True)
    userId = models.IntegerField()
    title = models.CharField(max_length=500)
    body = models.CharField(max_length=500)