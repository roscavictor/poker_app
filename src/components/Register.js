import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import main_image from "../imgs/main_image.jpeg";

import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Form,
} from "reactstrap";




const Register = () => {
  return (
    <div className={styles.container}> 
      <Container >
        <Row>
          <Col xs="4" >
            <Form  >
              <p className="text-center">
                  Inregistrare
              </p>
              <FormGroup>
                <div >
                  
                  <Input
                    type="text"
                    className="form-control py-4"
                  />
                </div>
              </FormGroup>

              <div>
                
                <Input
                  type="text"
                  className="form-control py-4"
                  placeholder="Password"
                />
              </div>
              <div>
                
                <Input
                  type="text"
                  className="form-control py-4"
                  placeholder="Email"
                />
              </div>
              <div>
              <Link to="/Register">
              <button type="button">
                Register
              </button>
              </Link>
              </div>

              
            </Form>
          </Col>
        </Row>
      </Container>

      
    </div>
  );
};

export default Register;