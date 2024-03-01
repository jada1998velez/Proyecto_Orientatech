import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email(true).required("Debes introducir un email"),
    repeatEmail: Yup.string()
      .email(true)
      .required("Debes confirmar el email")
      .oneOf([Yup.ref("email")], true),
  });
}
