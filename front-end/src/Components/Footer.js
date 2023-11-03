import React from "react";
import "./Footer.scss";
import pursuit from "../assets/pursuit.png";

function Footer(props) {
  return (
    <footer className="py-3">
      <div className="container">
        <div className="footer-items">
          <div className="item col-xs-12 col-sm-6 col-md-3">
            <div className="logo">
              <img src={pursuit} alt="pursuit-logo" />
            </div>
          </div>
          <div className="item col-xs-12 col-sm-6 col-md-3 ">
            <h6>Backend</h6>
            <ul className="list-unstyled">
              <li>AWS RDS</li>
              <li>Postgres</li>
              <li>JWToken</li>
            </ul>
          </div>
          <div className="item col-xs-12 col-sm-6 col-md-3">
            <h6>Frontend</h6>
            <ul className="list-unstyled">
              <li>React</li>
              <li>SCSS</li>
              <li>Dall-E 3 Images</li>
            </ul>
          </div>
          <div className="item col-xs-12 col-sm-6 col-md-3">
            <h6>About Me</h6>
            <ul className="list-unstyled">
              <li>
                <a href="https://github.com/arupay">Github</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/augusto-rupay-a07a286b/">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
