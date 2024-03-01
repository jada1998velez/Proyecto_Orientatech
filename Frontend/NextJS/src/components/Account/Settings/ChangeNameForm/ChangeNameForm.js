import React, { useState } from "react";
import * as styles from "./ChangeName.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeNameForm.form";
import { useAuth } from "@/hooks";
import { User } from "@/api";

const userCtrl = new User();

export function ChangeNameForm() {
  const { user } = useAuth();
  const [isNameSet, setIsNameSet] = useState(Boolean(user.firstname && user.lastname));
  const [isNameChanged, setIsNameChanged] = useState(false);


  const formik = useFormik({
    initialValues: initialValues(user.firstname, user.lastname),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, formValue);
        setIsNameSet(true); // Marcar como establecido después de la actualización
        setIsNameChanged(true);
        setTimeout(() => {
          setIsNameChanged(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>{isNameSet ? "Cambiar nombre y apellidos" : "Añadir nombre y apellidos"}</label>

      <div className={styles.content}>
        <Form.Input
          name="firstname"
          placeholder="Nombre"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastname"
          placeholder="Apellidos"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
        <Form.Button type="submit" loading={formik.isSubmitting}>
          Cambiar
        </Form.Button>
      </div>
      {isNameChanged && (
        <div className={styles.confirmationMessage}>
          Se ha cambiado el nombre correctamente.
        </div>
      )}
    </Form>
  );
}
