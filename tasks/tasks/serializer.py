from rest_framework import serializers
from .models import Task
#que campos vamos a recibir
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed']