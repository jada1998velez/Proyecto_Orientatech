import * as styles from "./Info.module.scss";
import { useAuth } from "@/hooks";
import { Button, Icon } from "semantic-ui-react";
import { DateTime } from "luxon";

export function Info() {
  const { user } = useAuth();

  return (
    <div className={styles.info}>
      <Button icon className={styles.iconUser}>
        <Icon name="user outline" />
      </Button>
      <h3 className={styles.username}>@{user.username}</h3>
      <h4 className={styles.name}>{user.firstname} {user.lastname}</h4>
      <h4 className={styles.email}>{user.email}</h4>
      <p className={styles.createdAt}>
        Miembro desde:{" "}
        {DateTime.fromISO(user.createdAt, { locale: "es" }).toFormat("DDD")}
      </p>
    </div>
  );
}
