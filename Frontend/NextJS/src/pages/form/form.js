import { BasicLayout } from "@/layouts";
import { Separator } from "@/components/Shared";
import Link from "next/link";
import { FormTest } from "@/components/Form";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
import * as styles from "./form.module.scss";
import { Container } from "semantic-ui-react";

export default function FormPage() {
  const { logout, user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <>
      <BasicLayout>
        <Container>
        <div className={styles.container}>
        <Separator height={100} />
        <h1 className={styles.title}>Formulario</h1>
        <span className={styles.subtitle}>
          Rellena el formulario para ver qué grado superior se adapta mejor a ti
        </span>
        <Separator height={50} />
        {isLoggedIn ? (
          // Si el usuario está logueado, mostrar el formulario
          <FormTest />
        ) : (
          // Si el usuario no está logueado, mostrar los botones estilizados
          <div className={styles.buttonContainer}>
            <Link href="/join/sign-in" className={styles.loginButton}>
              Iniciar sesión para guardar tus resultados
            </Link>
            <Link href="/form/guestForm" className={styles.guestButton}>
              Acceder como invitado
            </Link>
          </div>
        )}
        <Separator height={110} />
        </div>
        </Container>
      </BasicLayout>
    </>
  );
}
