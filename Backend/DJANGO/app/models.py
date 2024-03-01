from django.db import models

# Create your models here.
class Respuesta(models.Model):
    pregunta = models.CharField(max_length=255)
    respuesta = models.IntegerField()

    def __str__(self):
        return self.pregunta

    class Meta:
        db_table = 'respuesta'
