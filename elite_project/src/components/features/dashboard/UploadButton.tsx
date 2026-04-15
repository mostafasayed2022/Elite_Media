/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from "react";


// Upload Button Component


interface UploadButtonProps {
    
    size: string;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    inputName: string;
  }
  
  const UploadButton: React.FC<UploadButtonProps> = ({  size }) => {
    return (
      <div className="upload-container">
        <button className="upload-btn">Click to upload</button>
        <span className="upload-size">{size}</span>
      </div>
    );
  };
  
  
  
  export default UploadButton;