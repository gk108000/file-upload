import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const onSubmit = () => {
    if (selectedFile !== "") {
      setShowLoader(true);
      let file = new FormData();
      file.append("config", selectedFile);
      console.log("Uploaded File:", selectedFile);
      axios
        .post("/upload-config-tar", file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("response:", response);
          if (response.status === 200) {
            setShowLoader(false);
            alert("Successfully Uploaded the file.");
          } else {
            setShowLoader(false);
            alert("Failed to Upload the file.");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          setShowLoader(false);
          alert("Failed to Upload the file.");
        });
    } else {
      alert("Please Upload a file.");
    }
  };

  return (
    <React.Fragment>
      {/* Loader */}
      {showLoader && (
        <div className="loader">
          <div style={{ marginTop: "30%" }}>Uploading File...</div>
        </div>
      )}
      <div>
        <h3>File Upload Tester</h3>
        {/* File Upload Box */}
        <div className="drop-container">
          <Dropzone
            onDrop={(acceptedFiles) => {
              setSelectedFile(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                {/* Upload Props*/}
                <div
                  {...getRootProps({
                    disabled: selectedFile !== "",
                    multiple: false,
                  })}
                  className="drop-box"
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>

          {/* Uploaded File Details */}
          {selectedFile !== "" && (
            <div className="file-details">
              {" "}
              <h3>Uploaded File Details</h3>
              <div style={{ marginLeft: "10vw" }}>
                <table>
                  <tbody>
                    <tr>
                      <td>File Name</td>
                      <td>{selectedFile.name}</td>
                    </tr>
                    <tr>
                      <td>File Type</td>
                      <td>{selectedFile.type}</td>
                    </tr>
                    <tr>
                      <td>File Size</td>
                      <td>
                        {Number.parseFloat(
                          selectedFile.size / 1024 / 1024 / 1000
                        ).toFixed(2)}
                        GB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="submit-button" onClick={onSubmit}>
            Submit
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
