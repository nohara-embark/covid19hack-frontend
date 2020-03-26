import {Col, Container, Row} from "reactstrap";

import React from "react";

const hashtag = "puppy";

class HashtagFeed extends React.Component {
  state = {
    instagramPhotoUrls: []
  };

  componentDidMount() {
    this.fetchInstagramHashtag();
  }

  fetchInstagramHashtag() {
    fetch(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let dataSources = [];

        const numberOfOptions = data.graphql.hashtag.edge_hashtag_to_media.edges.length;
        const numberOfInstagramImages = numberOfOptions >= 12 ? 12 : numberOfOptions;

        for (let i = 0; i < numberOfInstagramImages; i++) {
          const node = data.graphql.hashtag.edge_hashtag_to_media.edges[i].node;
          const url = node.thumbnail_resources[2].src;
          dataSources.push(url);
        }

        this.setState({
          instagramPhotoUrls: dataSources
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>

        <div>
          <h1 className="text-center title-margin">
            #NextSweatCovid19
          </h1>
        </div>

        <div
          className="section section-basic instagram-wrapper"
          id="basic-elements"
        >
          <Row className="row-fix">
            {this.state.instagramPhotoUrls.map((url, index) => {
              return (
                  <Col lg="3" sm="12" key={index} className="image-item">
                    <img
                        alt="picture"
                        src={url}
                        className="img-fluid instagram-image"
                    />
                  </Col>
            )
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default HashtagFeed;
