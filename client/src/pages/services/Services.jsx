import React from "react";
import soon from "../../assets/imgs/soon.webp";

import "./Services.scss";

const Services = () => {
  return (
    <section>
      <img
        src={soon}
        alt="soon"
        style={{ objectFit: "contain", width: "100%", height: "444px" }}
      />
    </section>
  );
};

export default Services;
