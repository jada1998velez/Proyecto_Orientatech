import { BasicLayout } from "@/layouts";
import { useRouter } from "next/router";
import {
  Info,
  Settings,
  Graphics,
} from "@/components/Account";
import { Tab } from "semantic-ui-react";
import * as styles from "./account.module.scss";
import { Separator } from "@/components/Shared";;
import { useAuth } from "@/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from "lodash";

export default function account() {
  const router = useRouter();
  const { logout, user } = useAuth();

  if (!user) {
    router.push("/");
    return null;
  }

  const handleLogout = async () => {
    try {
      // Mostrar Toast de cierre de sesión
     setTimeout(() => {
        toast.success("¡Sesión cerrada exitosamente!");
      }
      , 1000);

      // Realizar logout después de mostrar el Toast
      await logout();

      // Redirigir a la página principal después del logout
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const panes = [
    {
      menuItem: "Estadísticas",
      render: () => 
        <Tab.Pane attached={false}>
          <p>Gráficas</p>
        </Tab.Pane>
    },
    {
      menuItem: {
        key: 20,
        icon: "settings",
        content: "Ajustes",
      },
      render: () => (
        <Tab.Pane attached={false}>
          <Settings.ChangeNameForm />
          {/* <div className={styles.containerForms}>
            <Settings.ChangeUsernameForm />
          </div > */}
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
          </div>
          
          <div className={styles.containerForms}>
            <Settings.ChangePasswordForm />
          </div>

          <Separator height={100} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        content: "Cerrar sesión",
        onClick: handleLogout,
      },
    },
  ];

  return (
    <>
      <BasicLayout isContainer relative>
        <Info />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        />
        <Separator height={100} />
      </BasicLayout>
    </>
  );
}
