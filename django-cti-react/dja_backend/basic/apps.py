from django.apps import AppConfig
from pathlib import Path
import json
from pathlib import Path
import os

class BasicConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'basic'

    def ready(self):
        from basic.models import Datapoint
        def add_data(u, t, b,i):
            if not Datapoint.objects.filter(id=i).exists():
                # Insert new data here
                d = Datapoint.objects.create(userId=u, title=t,body=b, id=i)
                print(d)
                return d
            pass


        BASE = Path(__file__).resolve().parent.parent
        json_data = open(os.path.join(BASE, 'static/data.json'))
        entries = Datapoint.objects.all()
        data1 = json.load(json_data) # deserialises it
        for data in data1:
            add_data(data["userId"],data["title"],data["body"],data["id"])

        json_data.close()

        pass



