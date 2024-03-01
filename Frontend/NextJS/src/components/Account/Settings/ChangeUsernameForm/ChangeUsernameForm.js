import React, { useState } from "react";
import * as styles from "./ChangeUsernameForm.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeUsernameForm.form";
import { useAuth } from "@/hooks";
import { User } from "@/api";

const userCtrl = new User();

export function ChangeUsernameForm() {
  const { user, updateUser } = useAuth();
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);



  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { username: formValue.username });
        updateUser("username", formValue.username);
        formik.handleReset();
        setIsUsernameChanged(true);

        setTimeout(() => {
          setIsUsernameChanged(false);
        }, 3000);

      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>Cambiar nombre de usuario</label>

      <div className={styles.content}>
        <Form.Input
          name="username"
          placeholder="Usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Form.Input
          name="repeatUsername"
          placeholder="Repetir usuario"
          value={formik.values.repeatUsername}
          onChange={formik.handleChange}
          error={formik.errors.repeatUsername}
        />
        <Form.Button type="submit" loading={formik.isSubmitting}>
          Cambiar
        </Form.Button>
      </div>
      {isUsernameChanged && (
        <div className={styles.confirmationMessage}>
          Se ha cambiado el nombre de usuario.
        </div>
      )}
    </Form>
  );
}
