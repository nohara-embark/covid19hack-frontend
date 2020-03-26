/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>

        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Nick O'Hara & Chirag Gosalia of <a href="https://embarkvet.com/" target="_blank">Embark Vet</a>.
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
