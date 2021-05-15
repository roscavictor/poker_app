import React, { useState } from "react";
import { Component } from 'react';
import styles from "./Poker.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from "@testing-library/react";

var cards=['5H','5C','3C','3S']
var randomNr=Math.floor(Math.random()*cards.length);
if(randomNr==0)
  var randomNr=Math.floor(Math.random()*cards.length);
var  randomCard1=cards[randomNr];
cards.splice(randomNr);
randomNr=Math.floor(Math.random()*cards.length);
var randomCard2=cards[randomNr];
cards.splice(randomNr);
var sumpot=15000




class Poker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: {
        player: { id: 'player', active: true, hand: [] },
        ai1: { id: 'ai1', active: true, hand: [] },
        ai2: { id: 'ai2', active: true, hand: [] },
        ai3: { id: 'ai3', active: true, hand: [] },
      },
      tableCards: [],
      playerOptions: { Fold: false, Call: false, Deal: true, 'New Game': false },
      displayAICards: false,
      gameStage: 0,
      playerIsActive: true,
      totalpot: 5
    };
  }
  render()
  {
return (

    <div className={styles.container}> 
    <div className={styles.player1}> 
    <p>Pot= {this.state.totalpot}</p>
    <Button color="success" className="btn-primary">Primary</Button>
    <Button  onClick={ () =>this.setState({ totalpot: this.state.totalpot + 1 })} color="danger" className="btn-primary">Primary</Button>
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+randomCard2+'.jpg'} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+randomCard1+'.jpg'} />
    <p>Bet= {sumpot}</p>
    </div>
    <div className={styles.player2}> 
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    </div>
    <div className={styles.player3}> 
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    </div>
    <div  className={styles.cardsDiv}>
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/Gray_back.jpg'} />
    </div>
    <div className={styles.pot}> 
   <p>Pot= {sumpot}</p>
    </div>
    </div>)
}
}
export default Poker;