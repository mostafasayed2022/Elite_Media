/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";


// Upload Button Component


interface UploadButtonProps {
    label: string;
    size: string;
  }
  
  const UploadButton: React.FC<UploadButtonProps> = ({ label, size }) => {
    return (
      <div className="upload-container">
        <button className="upload-btn">Click to upload</button>
        <span className="upload-size">{size}</span>
      </div>
    );
  };
  
  
  export default UploadButton;