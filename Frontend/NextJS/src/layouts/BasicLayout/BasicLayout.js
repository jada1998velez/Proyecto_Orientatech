import * as styles from "./BasicLayout.module.scss";
import { Container } from "semantic-ui-react";
import classNames from "classnames";
import { TopBar, Footer } from "@/components/Layout";

export function BasicLayout(props) {
  const {
    children,
    isContainer = false,
    relative = false,
  } = props;
  return (
    <>
      <TopBar/>
      <Container fluid>
        <div className={classNames({ [styles.relative]: relative })}>
          {isContainer ? <Container>{children}</Container> : children}
        </div>
      </Container>

      <div className={styles.footer}><Footer /></div>
      
    </>
  );
}
