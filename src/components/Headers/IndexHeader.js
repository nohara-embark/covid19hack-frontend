// reactstrap components
import { Button, Col, Container, FormGroup, Input, Row } from "reactstrap";

/*eslint-disable*/
import React from "react";
import { fetchPost } from "../../services/fetch";

let pageHeader = React.createRef();
class IndexHeader extends React.Component {
  componentDidMount = () => {
    this.handleResize();
  };

  handleResize = () => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  };

  handleJoin = async () => {
    const name = document.getElementById("name").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    // todo: validation

    const result = await fetchPost("https://rl1g1tkdy4.execute-api.us-east-1.amazonaws.com/registerUser", {
      name,
      phoneNumber
    });

    console.log(result);
  };

  render() {
    return (
      <>
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
            }}
            ref={pageHeader}
          ></div>
          <Container>
            <div className="content-center brand">
              <img
                alt="..."
                className="n-logo"
                src={require("assets/img/now-logo.png")}
              ></img>
              <h1 className="h1-seo">Next Sweat</h1>
              <h3>
                Take the challenge. Do a 3 minute workout and nominate your
                friends.
              </h3>

              <Row>
                <Col lg="4" sm="0"></Col>

                <Col lg="4" sm="12">
                  <FormGroup>
                    <Input placeholder="Name" type="text" id="name"></Input>
                  </FormGroup>
                </Col>

                <Col lg="4" sm="0"></Col>
              </Row>

              <Row>
                <Col lg="4" sm="0"></Col>

                <Col lg="4" sm="12">
                  <FormGroup>
                    <Input
                      placeholder="Phone number"
                      type="number"
                      id="phoneNumber"
                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4" sm="0"></Col>
              </Row>

              <Row>
                <Col lg="4" sm="0"></Col>

                <Col lg="4" sm="12">
                  <Button
                    className="btn-round btn-block"
                    color="info"
                    type="button"
                    onClick={this.handleJoin}
                  >
                    Join
                  </Button>
                </Col>

                <Col lg="4" sm="0"></Col>
              </Row>

              <br />

              <h3>#NextSweatCovid19</h3>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default IndexHeader;
