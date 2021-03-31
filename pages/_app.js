import "tailwindcss/tailwind.css";
import SiteHeader from "../components/SiteHeader";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
