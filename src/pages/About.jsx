import React from "react";
import Fahad from "../images/Fahad.jpg";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/About.css";

function About() {
  function openNewTab(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <main className="aboutme">
      <h1>About Me</h1>
      <div className="card">
        <div className="card-content">
          <div className="image">
            <img src={Fahad} alt="" />
          </div>

          <div className="sm-icons">
            <FaFacebook
              className="media-icon"
              onClick={() =>
                openNewTab("https://www.facebook.com/fahad.memon.18007218")
              }
            />
            <FaInstagram
              className="media-icon"
              onClick={() =>
                openNewTab("https://www.instagram.com/fahad_peerwani/")
              }
            />
            <FaLinkedin
              className="media-icon"
              onClick={() =>
                openNewTab("https://www.linkedin.com/in/fahad-memon-848874212/")
              }
            />
          </div>

          <div className="my-info">
            <h2>Fahad Memon</h2>
            <h3>Developer/Designer</h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
