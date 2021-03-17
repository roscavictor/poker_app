import React, { useState } from "react";
import styles from "./Poker.module.css";
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




const Poker = () => {
  return (
    <div className={styles.container}> 
    <div  classname={styles.cards}>
    <img src={process.env.PUBLIC_URL + '/imgs/5H.jpg'} />
    </div>
    </div>)
}
export default Poker;