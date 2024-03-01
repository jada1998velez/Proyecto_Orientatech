import * as styles from "./Footer.module.scss";
import Link from "next/link";
import { Container, Button } from "semantic-ui-react";

export function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.columns}>
          <div>
            <Link href="/">OrientaTech</Link>
          </div>
          <div>
            <ul>
              <Link href="#">Términos y condiciones</Link>
              <Link href="#">Política de privacidad</Link>
              <Link href="#">Contacto</Link>
              <Link href="#">FAQs</Link>
            </ul>
          </div>
          <div className={styles.social}>
            <Button as="a" href="#" circular color="facebook" icon="facebook" />
            <Button as="a" href="#" circular color="twitter" icon="twitter" />
            <Button
              as="a"
              href="#"
              circular
              color="instagram"
              icon="instagram"
            />
            <Button
              as="a"
              href="#"
              circular
              color="google plus"
              icon="google plus"
            />
          </div>
        </div>

        <div className={styles.copyright}>
          <span>Copyright 2024 OrientaTech - All rights reserved</span>
        </div>
      </Container>
    </div>
  );
}
