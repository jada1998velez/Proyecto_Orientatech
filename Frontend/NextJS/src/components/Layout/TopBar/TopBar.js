import * as styles from "./TopBar.module.scss";
import Link from "next/link";
import { Account } from "../Account";
import { Menu } from "../Menu";

export function TopBar() {
  return (
    <div className={styles.topBar}>
      <Link href="/" className={styles.left}>
        OrientaTech
      </Link>
      <div className={styles.center}>
        <Menu />
      </div>
      <div className={styles.right}>
        <Account />
      </div>
    </div>
  );
}
