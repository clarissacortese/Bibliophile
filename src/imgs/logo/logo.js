import logoImg from "./logo.png";
import "./logo.css";

function logo() {
    const logoImage = document.createElement("IMG");
    logoImage.src= logoImg;
    logoImage.className= "my-logo d-block mx-auto mb-4";
    logoImage.id= "home";
    return logoImage
}

export default logo;