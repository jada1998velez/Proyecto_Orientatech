import "semantic-ui-css/semantic.min.css";
import "@/scss/global.scss";
import { AuthProvider } from "@/contexts";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  );
}
