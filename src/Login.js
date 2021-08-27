import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";


import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Form,
} from "reactstrap";




const Login = () => {
  return (
    <div className={styles.container}> 
      <Container >
        <Row>
          <Col xs="8" >
            
          </Col>
          <Col xs="4" >
            <Form  >
              <p className="text-center">Autentificare</p>
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

              <Button
                type="submit"
              >
                Sign in
              </Button>
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

export default Login;
