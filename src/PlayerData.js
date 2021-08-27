import React, { useState } from "react";
import { Component } from 'react';
import styles from "./PlayerData.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Slider from '@material-ui/core/Slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
    Form,
  } from "reactstrap";
  import 'bootstrap/dist/css/bootstrap.min.css';
class PlayerData extends Component{
    constructor(props) {
        super(props);
       
    }
render()
{
  
  const active=this.props.playeractive;
return(

    <div className={styles.player1}>
    <p>Bet= {this.props.playertotalbet}</p>
    
      
    <div className={styles.playerbuttons}>
    <Button  onClick={ this.props.handleCheck} color="success" className="btn-primary">Check</Button>
    <Button color="warning" className="btn-primary" 
        onClick={ this.props.betChange}>Raise
     </Button>
      <Button  onClick={ this.props.handleFold} color="danger" className="btn-primary">Fold</Button>
      
    </div>
    <img className={styles.tableCardPlayer} src={process.env.PUBLIC_URL + '/imgs/'+this.props.playercard1} />
    <img className={styles.tableCardPlayer} src={process.env.PUBLIC_URL + '/imgs/'+this.props.playercard2} />
    <p>Total pot= {this.props.playerpot}</p>
        Bet amount:
        <input
    
    
    type="number"
    value={this.props.value}
    onChange={ this.props.handleChange}
/>
          
        

</div>

)

}
}
export default PlayerData;