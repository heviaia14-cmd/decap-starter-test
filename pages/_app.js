import { useEffect } from "react";

// Los correos de invitación/recuperación/confirmación de Netlify Identity
// apuntan al dominio del sitio (esta página), no a /admin. Si alguien hace
// clic en ese link tal cual, hay que mandarlo a /admin/ conservando el
// mismo fragmento (#invite_token=...) para que Decap CMS pueda procesarlo.
function redirectIdentityTokenToAdmin() {
  if (typeof window === "undefined") return;
  const hash = window.location.hash;
  if (/^#(invite|recovery|confirmation|email_change)_token=/.test(hash)) {
    window.location.replace("/admin/" + hash);
  }
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    redirectIdentityTokenToAdmin();
  }, []);

  return <Component {...pageProps} />;
}
