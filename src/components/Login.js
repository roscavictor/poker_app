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
      <div className={styles.column}>
      
          <Col xs="4" >
            <Form  >
              <p className={styles.loginheader}  >Login </p>
              <FormGroup>
                <div >
                  
                  <Input
                   placeholder="Email"
                    type="text"
                    className="form-control py-4"
                  />
                </div>
              </FormGroup>

              <div className={styles.signinbutton}>
                <Input
                  type="text"
                  className="form-control py-4"
                  placeholder="Password"
                />
              </div  > 
              <Link to="/Poker">
              <button className={styles.submitbtn}> Sign in</button>
              </Link>
             

              
            </Form>
          </Col>
        
      </div>

      
    </div>
  );
};

export default Login;
