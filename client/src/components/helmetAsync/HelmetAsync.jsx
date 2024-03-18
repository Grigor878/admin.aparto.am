import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

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

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={t(description)} />
      <meta name="keywords" content="Real Estate,Agency,Aparto" />

      {/* Open Graph / Facebook  */}
      <meta property="og:url" content={url + pathname} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={t(description)} />
      {image ? (
        <meta property="og:image" content={image} />
      ) : (
        <meta
          property="og:image"
          content="https://aparto.am/static/media/logo.c81fd539113588de5f95.png"
        />
      )}
      {image ? (
        <meta property="og:image:secure_url" content={image} />
      ) : (
        <meta
          property="og:image"
          content="https://aparto.am/static/media/logo.c81fd539113588de5f95.png"
        />
      )}
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:alt" content="image" />
      <meta property="fb:app_id" content="946682250427136" />

      {/* Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="website" />
      <meta name="twitter:url" content={url + pathname} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={t(description)} />

      <link rel="canonical" href={url + pathname} />

      {/* <meta
          name="description"
          content={pathname !== "/" ? `x ${pathname.substring(1)} page.` : "x."}
        /> */}
    </Helmet>
  );
};

export default HelmetAsync;
