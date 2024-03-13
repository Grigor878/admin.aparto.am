import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
// import logo from "../../assets/imgs/favicon.ico";

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
  const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAMAAADdXFNzAAAAgVBMVEVHcEwwZc8gWMk/d+c6bdI+b9BBeOclWcI6cd82a9c2a9UxZs9Ec9E+deM+duY/asANRbQrY9QwW7RAcdNWheR4n+sHPq1Nb7JAeeonX89Bd+QgWMkbU8NBduAUTLxAc9lBdd1AcdMvaNk2b+ENRLQ7dOY9acA1Z8pojdZYe8F2nOkXrFO5AAAAGHRSTlMA0Le2SA7sGCpqh76tkdq+6uyL7Va9xNrIabguAAABHklEQVQoka3S13qDMAwGUJbDKKNZLTOMAjG8/wP2lzEzkJvWV4aD9ElCivK/x3qvYdi8++IE94/ZjuHN7dAzeNj8HLEj3dlnlks/SOBO7u6xVRZwnbwyd1zN4b7ik6uvbJTklmKRV8aLX8l1XHTy85btEh4z3ExwFdkbJ848cfXIozU7Ilw+EEerITERPua04UnCFu6Sn6bHM7k2syXC554M8nReBJV4+d9V8mlIRj6MZpEQnD7GhFdifdWPRv4pyy3AMVu5An7UQ0NFBsZobvd7EAQfOJqmCa+JPWgYogre933bPp8YDmUnv8BPxMjkcs6li+rANVWgY2doNJeu41x4MobXX3hvYulFb99d1w6eyvB62KNxm5i5Ocrfzy8r5yS4d3fNSgAAAABJRU5ErkJggg==";
  const _image = image || logo;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={t(description)} />

      {/* Open Graph / Facebook  */}
      <meta property="og:image" content={_image} />
      <meta property="og:image:secure_url" content={_image} />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:alt" content="Image" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url + pathname} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={t(description)} />

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
