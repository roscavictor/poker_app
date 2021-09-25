import React, { useEffect, useState, useRef } from "react";
import styles from "./Profile.module.css";
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
  
function renderContent()
{
    var sectionStyle = {
        width: "80%",
        height: "800px",
        backgroundImage: `url(${main_image})`
      };
    let render=(
<div class="row" style={ sectionStyle }>
    <div class="col-md-6 col-md-offset-3">
    <Button variant="dark">Button 1</Button>{' '}
    <br/>
    <Button variant="dark">Button 3</Button>{' '}
    <br/>
    <Button variant="dark">Button 4</Button>{' '}
    <br/>
    <Button variant="dark">Button 2</Button>{' '}
    <Col xs="8" >
            
          </Col></div>
</div>
  )
  return render;
}
function MainPage(props) 
{
    var render=renderContent()
    return (<div>{render}</div>);
    
    
}
export default MainPage;