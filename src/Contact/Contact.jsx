import "./Contact.css";
import { ContactContent } from "./ContactContent.jsx";

export function Contact() {
  return (
    <>
      <div id="contactBg">
        <div id="contact" className="layer1">
          <h1>Contact</h1>
          {ContactContent.paragraph1}
          {ContactContent.paragraph2}
          {ContactContent.paragraph3}
        </div>
        <div id="webring-container">
          <div id="webring" className="layer1"></div>
        </div>
      </div>
      {ContactContent.image}
    </>
  );
}
