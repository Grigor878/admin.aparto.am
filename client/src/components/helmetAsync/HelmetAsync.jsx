import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import logo from "../../assets/imgs/logo.png";
// import { API_BASE_URL } from "../../apis/config";

const HelmetAsync = ({ title, description, image }) => {
  const { t, i18n } = useTranslation();

  const name = "Aparto.am";
  const lang = i18n.language;

  const _image = image || logo;
  const _title = title ? `${name} | ${t(title)}` : name;
  const _description = t(description);
  const _url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <HelmetProvider>
      <Helmet htmlAttributes={{ lang }}>
        <title>{_title}</title>
        <meta name="title" content={_title} />
        <meta name="description" content={_description} />

        {/* Open Graph / Facebook  */}
        <meta property="og:image" content={_image} />
        <meta property="og:image:secure_url" content={_image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="image" />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_description} />
        <meta property="og:url" content={_url} />
        <meta property="og:site_name" content={name.toLocaleLowerCase()} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:url" content={_url} />
        <meta name="twitter:title" content={_title} />
        <meta name="twitter:description" content={_description} />

        <meta property="fb:app_id" content="441089532596673" />

        <link rel="canonical" href={_url} />
      </Helmet>
    </HelmetProvider>
  );
};

export default HelmetAsync;
