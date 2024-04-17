
from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

# Create your views here.
#crea todo el crud que vamos a necesitar
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()