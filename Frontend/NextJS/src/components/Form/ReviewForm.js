import React from 'react';
import { List, Button } from 'semantic-ui-react';
import styles from './ReviewForm.module.scss';

const ReviewForm = ({ formData, questions, handleBackToQuestions, handleSubmit }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Revisar Respuestas</h3>
      <List className={styles.questionList}>
        {Object.entries(formData).map(([key, value]) => {
          const question = questions.find((q) => `question${q.id}` === key);

          return (
            <List.Item key={key} className={styles.questionItem}>
              <List.Content>
                <List.Header className={styles.questionHeader}>{question.label}</List.Header>
                <List.Description className={styles.questionDescription}>{value}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
      <div className={styles.buttons}>
        <Button className={styles.backButton} onClick={handleBackToQuestions}>
          Volver a las preguntas
        </Button>
        <Button className={styles.submitButton} type="submit" onClick={handleSubmit}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
