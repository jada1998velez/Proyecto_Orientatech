import * as Yup from "yup";

export function initialValues() {
  return {
    username: "",
    repeatUsername: "",
  };
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string().required(true),
    repeatUsername: Yup.string()
      .email(true)
      .required("Debes confirmar el usuario")
      .oneOf([Yup.ref("username")], true),
  });
}
