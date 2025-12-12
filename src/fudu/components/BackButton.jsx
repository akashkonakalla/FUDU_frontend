import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BsTransparency } from "react-icons/bs";

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        background: "rgba(17, 2, 2, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.3)",
        padding: "8px 12px",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "15px"
      }}
    >
      <FaArrowLeft size={14} /> Back
    </button>
  );
};

export default BackButton;
