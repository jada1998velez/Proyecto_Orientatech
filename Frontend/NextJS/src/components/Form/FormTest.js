import React, { useState } from "react";
import { Form, List, Button, Progress, Container } from "semantic-ui-react";
import styles from "./FormTest.module.scss";
import axios from "axios";
import Link from "next/link";
import { Separator } from "../Shared";
import { set } from "lodash";

export function FormTest({guest}) {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null); // Asegúrate de que setPrediction esté declarada
  const [showReview, setShowReview] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showForm, setShowForm] = useState(true);
  const [showRepeatButton, setShowRepeatButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grado, setGrado] = useState(null);

  const questions = [
    {
      id: 1,
      label: "Edad",
      input: true,
    },
    {
      id: 2,
      label: "Género",
      options: ["Masculino", "Femenino", "Otro", "Prefiero no decirlo"],
    },
    {
      id: 3,
      label: "Código postal",
      input: true,
    },
    {
      id: 4,
      label: "¿Qué modalidad de trabajo te gustaría en el mundo laboral?",
      options: ["Presencial", "Remoto", "Híbrido"],
    },
    {
      id: 5,
      label: "Estudios de acceso al CFGS",
      options: ["Bachillerato", "Prueba de acceso a Grado Superior", "Otros"],
    },
    {
      id: 6,
      label: "Motivo por el que quieres estudiar un CFGS",
      options: [
        "Salida laboral",
        "Continuar mi formación",
        "Especialización profesional",
      ],
    },
    {
      id: 7,
      label:
        "¿Te gustaría trabajar para una empresa o emprender por tu cuenta?",
      options: [
        "Trabajar para una empresa",
        "Continuar mi formación",
        "Emprender por mi cuenta",
      ],
    },
    {
      id: 8,
      label:
        "Sientes interés por el mantenimiento de sistemas, entonos de red, hardware y software",
      options: [0, 1, 2, 3, 4, 5],
    },
    {
      id: 9,
      label:
        "¿Te genera curiosidad aprender sobre el mundo de la ciberseguridad y hacking ético?",
      options: [0, 1, 2, 3, 4, 5],
    },
    {
      id: 10,
      label:
        "He sentido atracción en cómo los programas informáticos incluyen distintos enfoques como el conocimiento de áreas matemáticas, estadística, ciencias…",
      options: [0, 1, 2, 3, 4, 5],
    },
    {
      id: 11,
      label:
        "Siento curiosidad por cómo funcionan los datos y la gestión de procesos que ocurren detrás de un sitio web o aplicación",
      options: [0, 1, 2, 3, 4, 5],
    },
    {
      id: 12,
      label:
        "Pienso que se me daría bien elegir una buena estructura para montar una página web",
      options: [0, 1, 2, 3, 4, 5],
    },
    {
      id: 13,
      label:
        "Sientes curiosidad por cómo está hecha una página web, su estética y diseño me resultan lo más interesante",
      options: [0, 1, 2, 3, 4, 5],
    },
  ];

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      [`question${currentQuestion}`]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación específica para el código postal
    if (name === "question3") {
      // Asegurar que solo sean dígitos y exactamente 5 dígitos
      const validPostalCode = /^\d{5}$/.test(value);

      if (validPostalCode || value === "") {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      // Para otras preguntas, simplemente actualiza el estado
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const calculateProgress = () => {
    const progress = (currentQuestion / questions.length) * 100;
    return progress.toFixed(2);
  };

  const handleNextQuestion = () => {
    // Verificar si se ha respondido a la pregunta actual antes de avanzar
    if (formData[`question${currentQuestion}`] !== undefined) {
      // Guardar el estado actual antes de avanzar
      const updatedFormData = { ...formData };
      setFormData(updatedFormData);

      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Muestra una alerta o realiza alguna acción para indicar que se debe responder la pregunta actual
      alert("Por favor, responde la pregunta actual antes de continuar.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      
        const summaryJSON = generateSummary();
  
        const response = await fetch(
          "https://backend-express-bd.onrender.com/api/answers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: summaryJSON,
          }
        );
  
        const responseBody = await response.json();
        console.log(responseBody);
      
  
      const respuestas = Object.values(formData);
      let respuestaObj = {};
  
      for (let i = 0; i < respuestas.length; i++) {
        respuestaObj[questions[i].label] = respuestas[i];
      }
  
      const ultimasRespuestas = respuestas
        .slice(-6)
        .map((respuesta) => parseInt(respuesta, 10));
      const nombresPreguntas = questions
        .slice(-6)
        .map((pregunta) => pregunta.label);
  
      const datosCuestionario = {
        columnas: nombresPreguntas,
        respuestas: ultimasRespuestas.filter((value) => !isNaN(value)),
      };
  
      // console.log(datosCuestionario);

          const response_prediction = await axios.post(
            'https://django-model-bd.onrender.com/submit-cuestionario/',
            datosCuestionario,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
      
            console.log(response_prediction);

      const resultadoPrediccion = response_prediction.data.prediccion;

 
      setShowForm(false);
      setShowRepeatButton(true);
  
      setPrediction(resultadoPrediccion);
    } catch (error) {
      console.error("Error al obtener la predicción:", error);
    } finally {
      setLoading(false); // Desactiva el estado de carga independientemente del resultado
    }
  };

  const generateSummary = () => {
    const summary = {};

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = formData[`question${i + 1}`];

      if (answer !== undefined) {
        const formattedAnswer = !isNaN(answer) ? parseInt(answer, 10) : answer;

        summary[question.label] = formattedAnswer;
      }
    }
    const summaryJSON = JSON.stringify(summary, null, 2);
    // console.log(summaryJSON);
    return summaryJSON;
  };

  const obtenerResultadoTexto = () => {
    if (prediction == 0) {
      return "ASIR";
    } else if (prediction == 1) {
      return "DAM";
    } else if (prediction == 2) {
      return "DAW";
    } else {
      return "Resultado no reconocido";
    }
  };

  const handleReview = () => {
    setShowReview(true);
  };

  const handleBackToQuestions = () => {
    setShowReview(false);
  };

  const handleRepeatForm = () => {
    // Restablece los estados para repetir el formulario
    setFormData({});
    setPrediction(null);
    setShowForm(true);
    setShowReview(false);
    setShowRepeatButton(false);
    setCurrentQuestion(1);
  };

  return (
    <Container>
      <div className={styles.formContainer}>
        {showForm && (
          <Form onSubmit={handleSubmit}>
            {showReview ? (
              <div>
                <h3>Revisar Respuestas</h3>
                <List>
                  {Object.entries(formData).map(([key, value]) => {
                    // Encontrar la pregunta correspondiente en el array 'questions'
                    const question = questions.find(
                      (q) => `question${q.id}` === key
                    );

                    return (
                      <List.Item key={key}>
                        <List.Content>
                          <List.Header>{question.label}</List.Header>
                          <List.Description>{value}</List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>
                <div className={styles.buttons}>
                  <Button onClick={handleBackToQuestions}>
                    Volver a las preguntas
                  </Button>
                  <Button type="submit" onClick={handleSubmit}>
                    Enviar
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.formStyle}>
                <div className={styles.progressContainer}>
                  <Progress percent={calculateProgress()} progress success />
                </div>
                <div className={styles.currentPage}>
                  Pregunta {currentQuestion} de {questions.length}
                </div>

                {questions.map(
                  (question, index) =>
                    index + 1 === currentQuestion && (
                      <div key={index}>
                        <div className={styles.questionContainer}>
                          <Form.Field>
                            <label>{question.label}</label>
                            {question.options ? (
                              <Form.Group inline>
                                <div className={styles.radioColumn}>
                                  {question.options.map(
                                    (option, optionIndex) => (
                                      <Form.Radio
                                        key={optionIndex}
                                        label={option}
                                        onChange={() =>
                                          handleRadioChange(option)
                                        }
                                        checked={
                                          formData[
                                            `question${currentQuestion}`
                                          ] === option
                                        }
                                      />
                                    )
                                  )}
                                </div>
                              </Form.Group>
                            ) : question.input ? (
                              <Form.Input
                                placeholder={question.label}
                                name={`question${currentQuestion}`}
                                onChange={handleInputChange}
                              />
                            ) : null}
                          </Form.Field>
                        </div>
                        <div className={styles.buttons}>
                          <div>
                            {currentQuestion > 1 && (
                              <Button
                                onClick={() =>
                                  setCurrentQuestion(currentQuestion - 1)
                                }
                              >
                                Volver
                              </Button>
                            )}
                          </div>
                          <div>
                            {currentQuestion < questions.length && (
                              <Button onClick={handleNextQuestion}>
                                Siguiente
                              </Button>
                            )}
                          </div>
                          {currentQuestion === questions.length && (
                            <div className={styles.submitButtonContainer}>
                              <Button onClick={handleReview}>
                                Revisar Respuestas
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </Form>
        )}

        {loading && (
          <div className={styles.loadingContainer}>
            <p>Calculando resultados...</p>
            <Progress percent={100} indicating />
          </div>
        )}
        {prediction && !showForm && !loading && (
          
          <div className={styles.predictionContainer}>
            <Separator height={112} />
            <p className={styles.textoPrediccion}>
              Te recomendamos que estudies...
            </p>
            <p className={styles.resultadoPrediccion}>
              {obtenerResultadoTexto()}
            </p>
            <Separator height={20} />
            <Link href="/info">
              Ver información sobre {obtenerResultadoTexto()} y los otros Grados
              Superiores aquí
            </Link>

            <Separator height={20} />
            {showRepeatButton && ( // Condición para mostrar el botón de repetir
              <Button onClick={handleRepeatForm}>Repetir Formulario</Button>
            )}
            <Separator height={100} />
          </div>
        )}
      </div>
    </Container>
  );
}
