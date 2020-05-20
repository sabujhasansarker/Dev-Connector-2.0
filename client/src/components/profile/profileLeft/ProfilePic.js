import React, { useRef } from "react";
import axios from "axios";

const ProfilePic = () => {
  const file = useRef("");

  const fileChange = async (e) => {
    let fileData = file.current.files[0];
    // setFile(e.target.files[0]);
    if (fileData) {
      const formData = new FormData();
      formData.append("file", fileData);
      console.log(formData);
      try {
        const res = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { fileName, filePath } = res.data;

        console.log({ fileName, filePath });

        console.log("File Uploaded");
      } catch (err) {
        if (err.response.status === 500) {
          console.log("There was a problem with the server");
        } else {
          console.log(err.response.data.msg);
        }
      }
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          ref={file}
          onChange={fileChange}
        />
        <label className="custom-file-label" htmlFor="customFile"></label>
      </div>

      <input
        type="submit"
        value="Upload"
        className="btn btn-primary btn-block mt-4"
      />
    </form>
  );
};

export default ProfilePic;
