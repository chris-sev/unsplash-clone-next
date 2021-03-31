import "tailwindcss/tailwind.css";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
      <SiteFooter />
    </>
  );
}

export default MyApp;
