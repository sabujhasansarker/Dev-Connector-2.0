import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class TyniMc extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  render() {
    return (
      <Editor
        apiKey="7vvn2vcpzvc62ctmyekssp125rsg1g5x3rutuprf4zbcrta7"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "codesample",
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default TyniMc;
