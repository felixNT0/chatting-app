import { Col, Row } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import SignUp from "../../components/SignUp/SignUp";
import styles from "./SignUp.module.css";

function SignUpPage() {
  const isMobile = useMediaQuery({
    query: "(min-width: 992px)",
  });
  return (
    <>
      <Row gutter={24}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}
        >
          <SignUp />
        </Col>
        {isMobile && (
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
          >
            <div className={styles.root}></div>
          </Col>
        )}
      </Row>
    </>
  );
}

export default SignUpPage;
