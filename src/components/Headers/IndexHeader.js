// reactstrap components
import {
  Alert,
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Row
} from "reactstrap";

/*eslint-disable*/
import React from "react";
import { fetchPost } from "../../services/fetch";

const typeError = "error";
const typeSuccess = "success";

let pageHeader = React.createRef();
class IndexHeader extends React.Component {
  state = {
    errorType: typeError,
    errorMessage: "",
    errorIsVisible: false
  };

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

    if (name.length === 0) {
      this.showAlert(typeError, "Please add your name");
      return;
    }

    if (!phoneNumber.match(/^\d{10}$/)) {
      this.showAlert(typeError, "Number must be 10 digits.");
      return;
    }

    const result = await fetchPost(
      "https://rl1g1tkdy4.execute-api.us-east-1.amazonaws.com/registerUser",
      {
        name,
        phoneNumber
      }
    );

    if (result !== 200) {
      this.showAlert(
        typeError,
        "Your phone number has already been registered."
      );
      return;
    }

    this.showAlert("success", "You're in! We will text you shortly.");
    this.clearInputs();
  };

  showAlert = (type, message) => {
    this.setState(
      { errorType: type, errorIsVisible: true, errorMessage: message },
      () => {
        window.setTimeout(() => {
          this.setState({ errorIsVisible: false });
        }, 3500);
      }
    );
  };

  clearInputs = () => {
    document.getElementById("name").value = "";
    document.getElementById("phoneNumber").value = "";
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
              <h1 className="h1-seo">Next Act</h1>
              <h3>
                Take the challenge. Do a 3 minute workout and nominate your
                friends.
              </h3>

              {this.state.errorIsVisible && (
                <Row>
                  <Col lg="4" sm="0"></Col>
                  <Col lg="4" sm="0">
                    <Alert
                      color="danger"
                      className={`alert-style-${this.state.errorType}`}
                    >
                      {this.state.errorMessage}
                    </Alert>
                  </Col>
                  <Col lg="4" sm="0"></Col>
                </Row>
              )}

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

              <h3>#NextActCovid19</h3>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default IndexHeader;
