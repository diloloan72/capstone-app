import React, { Component } from "react";
import "./ImageUploader.css";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
      });
      // Convert image to base 64 
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
          <div>
            <img src={this.state.image} />
            <h1>Select Image</h1>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
}
export default ImageUploader;
