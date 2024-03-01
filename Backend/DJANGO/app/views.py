import json
import logging
import joblib
from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import Respuesta

# Create a logger object
logger = logging.getLogger(__name__)

# Asegúrate de que la ruta al modelo sea correcta
modelo = joblib.load('app/model/entrenamiento_estudiantes.pkl')

@csrf_exempt
def submit_cuestionario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            respuestas_usuario = [respuesta for _, respuesta in zip(data['columnas'], data['respuestas'])]
            prediccion = modelo.predict([respuestas_usuario])

            # Guardar respuestas en la base de datos
            for pregunta, respuesta in zip(data['columnas'], data['respuestas']):
                nueva_respuesta = Respuesta(pregunta=pregunta, respuesta=respuesta)
                nueva_respuesta.save()

            return JsonResponse({'mensaje': 'Respuestas almacenadas correctamente', 'predicción': prediccion.tolist()})
        except json.JSONDecodeError as e:
            logger.error("Error al decodificar JSON: %s", str(e))
            return HttpResponseBadRequest("Error en el formato JSON: " + str(e))
    elif request.method == 'GET':
        try:
            respuestas = Respuesta.objects.all()
            return JsonResponse({'respuestas': [{'pregunta': respuesta.pregunta, 'respuesta': respuesta.respuesta} for respuesta in respuestas]})
        except Exception as e:
            logger.error("Error al obtener las respuestas: %s", str(e))
            return HttpResponseBadRequest("Error al obtener las respuestas: " + str(e))
    else:
        logger.warning("Método no soportado %s", request.method)
        return HttpResponseBadRequest('Método no soportado')
