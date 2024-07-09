import React from "react";
import logoicn from "../../assets/images/nagane_dark_m.png"
const LogoIcon = (props) => {
  return <img alt="Logo" src={logoicn}  style={{ maxWidth: 'auto', height: '100%' }}  {...props} />;
};

export default LogoIcon;
