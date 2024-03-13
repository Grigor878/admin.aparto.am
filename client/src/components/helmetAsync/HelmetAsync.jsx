import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
// import logo from "../../assets/imgs/favicon.ico";

const HelmetAsync = ({ description, keywords, image }) => {
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
  const logo = "https://aparto.am/static/media/logo.c81fd539113588de5f95.png";
  const _image = image || logo;
  const _imageWidth = 600;
  const _imageHeight = 600;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>

        <meta name="title" content={title} />
        <meta name="description" content={t(description)} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook  */}
        <meta property="og:url" content={url + pathname} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={t(description)} />
        <meta property="og:image" content={_image} />
        <meta property="og:image:secure_url" content={_image} />
        <meta property="og:image:width" content={_imageWidth} />
        <meta property="og:image:height" content={_imageHeight} />
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
    </HelmetProvider>
  );
};

export default HelmetAsync;
