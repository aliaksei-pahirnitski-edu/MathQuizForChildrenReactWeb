import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import QuestionCard from "./Screens/QuestionScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import Quiz from "./Components/QuizTest";

function App() {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xl="4" lg="6" md="8" xs="10" className="mt-3">
            <Stack gap={4} className="outer-box outer-border">
              <div className="m-2 p-2 orange inner-border">
                <h2>Привет Максим!</h2>
              </div>
              <div className="m-2 p-2 pink inner-border">Second item</div>
              <div className="m-2 p-2 pink inner-border">
                <Stack direction="horizontal" gap={2}>
                  <Button variant="primary">Button</Button>
                  <Button as="a" variant="success">
                    Button as link
                  </Button>
                </Stack>
              </div>
              <div className="m-2 p-2 pink inner-border">Third item</div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
