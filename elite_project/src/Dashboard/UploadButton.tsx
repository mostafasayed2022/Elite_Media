/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from "react";


// Upload Button Component


interface UploadButtonProps {
  label: string;
  size: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ label, size, onFileChange, inputName }) => {
  return (
    <div className="upload-container">
      <label className="upload-btn">
        {label}
        <input
          type="file"
          accept="image/,video/" // Accept both images and videos
          onChange={onFileChange}
          name={inputName}
        />
      </label>
    </div>
  );
};






export default UploadButton;