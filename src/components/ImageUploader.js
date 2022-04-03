import React, { Component } from "react";
import "../css/ImageUploader.css";

/*
 * Component that allows users to upload an image from their devices
 */
class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  // When an image is uploaded, convert it to base64 and return to parent 
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
      });
      // Convert image to base64
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.props.onImageUploaded(reader.result);
      });
      reader.readAsDataURL(img);
    }
  };

  render() {
    return (
      <div>
        <div>
          <img src={this.state.image} alt="" />
          <div className="outerDiv">
            <h2>Select Image</h2>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
}
export default ImageUploader;
