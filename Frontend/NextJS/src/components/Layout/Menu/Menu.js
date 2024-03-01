import * as styles from "./Menu.module.scss";
import Link from "next/link";


export function Menu() {
  return (
    <div>
      <div className={styles.categories}>
        <Link href="/">Inicio</Link>
        <Link href="/form">Realizar test</Link>
        <Link href="/info">Información de FP GS</Link>
      </div>
    </div>
  );
}
