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
  // const logo = "https://aparto.am/static/media/logo.c81fd539113588de5f95.png";
  // const _image = image || logo;
  // const _imageWidth = 600;
  // const _imageHeight = 600;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={t(description)} />
      <meta name="keywords" content="Real Estate,Agency,Aparto" />

      {/* Open Graph / Facebook  */}
      <meta property="og:url" content={url + pathname} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={t(description)} />
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta property="og:image:secure_url" content={image} /> : null}

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
