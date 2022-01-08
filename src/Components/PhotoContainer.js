import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import Photo from "./Photo";
import NoResults from "./NoResults";
import Spinner from "./Spinner";
import Masonry from "react-masonry-component";

class PhotoContainer extends PureComponent {
  // set the 'initialValue' to the searched tag value or link value once mounted
  // pass 'initialValue' to getData
  componentDidMount() {
    const tag = this.props.match.params.tag;
    const link = this.props.match.params.link;
    const initialValue = tag !== undefined ? tag : link;

    this.props.getData(initialValue);
  }

  // set 'updatedValue' to the searched tag value or link value once updated
  // pass 'updatedValue' to getData
  componentDidUpdate() {
    const tag = this.props.match.params.tag;
    const link = this.props.match.params.link;
    const updatedValue = tag !== undefined ? tag : link;

    this.props.getData(updatedValue);
  }

  render() {
    let photoKey = 1;

    // map will only render 15 photos by not rendering any photo component with a 'photoKey' higher than 15
    const photos = this.props.data.map((photo) => {
      if (photoKey <= 15) {
        return (
          <Photo
            farm={photo.farm}
            serverID={photo.server}
            id={photo.id}
            secret={photo.secret}
            title={photo.title}
            key={photoKey++}
          />
        );
      } else {
        return null;
      }
    });

    // render 'NoResults' if api returns no data
    if (this.props.isLoaded === true && this.props.data.length === 0) {
      return <NoResults />;
    } else {
      return (
        // display heading 'Loading' or value depending on 'isLoaded' state value
        // render 'Spinner' or mapped 'photos' depending on 'isLoaded' state value
        <div className="photo-container">
          {!this.props.isLoaded ? (
            <h2>Loading</h2>
          ) : (
            <h2>{this.props.value}</h2>
          )}
          {!this.props.isLoaded ? (
            <Spinner />
          ) : (
            <ul>
              <Masonry>{photos}</Masonry>
            </ul>
          )}
        </div>
      );
    }
  }
}

export default withRouter(PhotoContainer);
