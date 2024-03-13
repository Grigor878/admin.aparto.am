import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const HelmetAdmin = () => {
  const { pathname } = useLocation();

  function capitalize() {
    return pathname.charAt(1).toUpperCase() + pathname.slice(2);
  }

  let newPath = capitalize(pathname.substring(1));

  if (newPath !== "") {
    newPath = "| " + newPath;
  }

  return (
      <Helmet>
        <title>Aparto {newPath}</title>
      </Helmet>
  );
};

export default HelmetAdmin;
