import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { getRandomQuestion, getLevelLimit } from "./Services/Randomizer";
import { displayFormula } from "./Models/QuestionModel";

function Layout(props: { children: ReactNode }) {
  const [showToast, setShowToast] = useState(false);
  const [listQuizes, setListQuizes] = useState("");
  useEffect(() => {
    if (listQuizes != "") {
      navigator.clipboard.writeText(listQuizes).catch();
    }
  }, [listQuizes]);

  function showSettings() {
    generateListQuizes();
    setShowToast(true);
  }

  function generateListQuizes() {
    const NperLevel = 5;
    const NLevels = 9;
    const initialLevel = 1;
    const splitBy = 15;
    const arrQuizes: string[] = new Array(NperLevel * NLevels + (NperLevel * NLevels) / splitBy);
    let quizGlobalNum = 0;
    for (let level = initialLevel; level <= NLevels; level++) {
      const levelLimit = getLevelLimit(level);
      for (let numInLevel = 1; numInLevel <= NperLevel; numInLevel++) {
        // const quizGlobalNum = (level - 1) * NperLevel + numInLevel - 1;
        const quiz = getRandomQuestion(levelLimit);
        arrQuizes[quizGlobalNum] = displayFormula(quiz);
        quizGlobalNum++;

        if (((level - 1) * NperLevel + numInLevel - 1) % splitBy == splitBy - 1) {
          arrQuizes[quizGlobalNum] = "================";
          quizGlobalNum++;
        }
      }
    }
    const strAllQuizes = arrQuizes.join(" = \n");
    setListQuizes(strAllQuizes);
    console.log(strAllQuizes);
  }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xl="4" lg="6" md="8" xs="11" className="mt-3">
            <Stack gap={4} className="outer-box outer-border">
              {props.children}
            </Stack>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xl="4" lg="6" md="8" xs="11" className="mt-3">
            <span className="float-end" onClick={showSettings}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
              </svg>
            </span>
          </Col>
        </Row>
      </Container>

      <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide={false}>
          <Toast.Header>
            <strong className="me-auto">Settings</strong>
          </Toast.Header>
          <Toast.Body>
            <small>Random 45 quizes</small>
            <Form.Control as="textarea" rows={17} aria-label="With textarea" value={listQuizes} readOnly />
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Layout;
