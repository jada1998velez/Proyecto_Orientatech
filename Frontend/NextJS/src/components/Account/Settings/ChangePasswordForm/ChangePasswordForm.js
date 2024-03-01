import React, { useState } from "react";
import * as styles from "./ChangePasswordForm.module.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePasswordForm.form";
import { User } from "@/api";
import { useAuth } from "@/hooks";

const userCtrl = new User();

export function ChangePasswordForm() {
  const { user, logout } = useAuth();
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { password: formValue.password });
        setIsPasswordChanged(true);
        setTimeout(() => {
          setIsPasswordChanged(false);
        }, 3000);
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label className={styles.text}>Cambiar contraseña</label>
      <div className={styles.content}>
        <Form.Input
          type="password"
          name="password"
          placeholder="Nueva contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Form.Input
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword}
        />
        <Form.Button type="submit" loading={formik.isSubmitting}>
          Cambiar
        </Form.Button>
      </div>

      {isPasswordChanged && (
        <div className={styles.confirmationMessage}>
          Se ha cambiado la contraseña correctamente.
        </div>
      )}
    </Form>
  );
}
