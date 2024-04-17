from django.db import models

# Create your models here.

class Task(models.Model):
# que datos van a ser seleccionados para ser enviados desde el backend y convertirlos a JSON
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title