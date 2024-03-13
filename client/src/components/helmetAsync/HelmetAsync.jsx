import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import logo from "../../assets/imgs/favicon.ico";

const HelmetAsync = ({ description, image }) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  function capitalize() {
    return pathname.charAt(1).toUpperCase() + pathname.slice(2);
  }

  let newPath = capitalize(pathname.substring(1));

  if (newPath !== "") {
    newPath = "| " + newPath;
  }

  const title = `Aparto ${newPath}`;
  const url = "https://aparto.am";
  const name = "Aparto";
  const _image = image || logo;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>

        <meta name="title" content={title} />
        <meta name="description" content={t(description)} />

        {/* Open Graph / Facebook  */}
        <meta property="og:image" content={_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={t(description)} />

        {/* Twitter */}
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={t(description)} />

        <link rel="canonical" href={pathname !== "/" ? url + pathname : url} />

        {/* <meta
          name="description"
          content={pathname !== "/" ? `x ${pathname.substring(1)} page.` : "x."}
        /> */}
      </Helmet>
    </HelmetProvider>
  );
};

export default HelmetAsync;
