import Link from "next/link";
import { JoinLayout } from "@/layouts";
import { RegisterForm } from "@/components/Auth";
import styles from "./sign-up.module.scss";

export default function SignUpPage() {
  return (
    <>
      <JoinLayout>
        <div className={styles.signUp}>
          <h3>Crear cuenta</h3>
          <RegisterForm />

          <div className={styles.actions}>
            <Link href="/join/sign-in">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
