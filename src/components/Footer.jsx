import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center  py-3">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} ProjectZero. All Rights Reserved.
        </p>
        <p className="mb-0">
          <Link to="/privacy-policy" className="text-white">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms-of-service" className="text-white">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
