import React from "react";

const ContactBtn = () => {
  return (
    <div
      className="position-fixed bottom-0 end-0 m-5 border border-primary rounded-circle p-3 bg-primary"
      style={{
        cursor: "pointer",
        color: "white",
        zIndex: "1000",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <i className="fa fa-solid fa-question" />
    </div>
  );
};

export default ContactBtn;
