// DatabaseConnection.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function DatabaseConnection({ summaryJSON, formData, questions, setLoading }) {
    console.log(summaryJSON);
    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // const summaryJSON = generateSummary(formData, questions);

        const response = await axios.post(
          'https://backend-express-bd.onrender.com/api/answers',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: summaryJSON,
          }
        );

        const responseBody = await response.json();
        console.log(responseBody);

        // Resto de tu lógica para manejar la respuesta

        // setPrediction(responseBody.data.prediccion);
      } catch (error) {
        console.error('Error al obtener la predicción:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formData, questions, setLoading]);

  return null; // Este componente no renderiza nada en la interfaz, solo maneja la lógica de conexión a la base de datos
}
