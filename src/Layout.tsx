import React from "react";
import { ReactNode } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

function Layout(props: { children: ReactNode }) {
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
      </Container>
    </>
  );
}

export default Layout;
