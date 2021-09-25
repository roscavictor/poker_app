import React, { useState } from "react";
import { Component } from 'react';
import styles from "./Poker.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Webcam from "react-webcam";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerData from "./PlayerData";
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
const cards = ["2C.jpg", "2D.jpg", "2H.jpg", "2S.jpg", "3C.jpg", "3D.jpg", "3H.jpg", "3S.jpg", "4C.jpg", "4D.jpg", "4H.jpg", "4S.jpg", "5C.jpg",
      "5D.jpg", "5H.jpg", "5S.jpg", "6C.jpg", "6D.jpg", "6H.jpg", "6S.jpg", "7C.jpg", "7D.jpg", "7H.jpg", "7S.jpg", "8C.jpg", "8D.jpg", "8H.jpg", "8S.jpg",
      "9C.jpg", "9D.jpg", "9H.jpg", "9S.jpg", "10C.jpg", "10D.jpg", "10H.jpg", "10S.jpg", "AC.jpg", "AD.jpg", "AH.jpg", "AS.jpg", "JC.jpg", "JD.jpg", "JH.jpg",
      "JS.jpg", "KC.jpg", "KD.jpg", "KH.jpg", "KS.jpg", "QC.jpg", "QD.jpg", "QH.jpg", "QS.jpg"];
function shuffle(vector) {
  var indexcurrent=vector.length,indexRand;
  while (indexcurrent!=0) 
  {
    indexRand = Math.floor(Math.random() * indexcurrent);
    indexcurrent--;
    [vector[indexcurrent], vector[indexRand]] = 
    [vector[indexRand], vector[indexcurrent]];
  }
  return vector;
}
function isStraight(straight)
{
  straight.sort(function(a,b){return a - b}).reverse();
  let uniquestraight=[];
  straight.forEach((c) => {
    if (!uniquestraight.includes(c)) {
        uniquestraight.push(c);
    }
});
console.log(uniquestraight)
  for (let i=0;i<uniquestraight.length-1;i++)
   if(uniquestraight[i]-uniquestraight[i+1]!=1)
    return false;
  return true;
}
function card_getnumber(card)
{
  if(card.length==7)
  return 10;
  else if( card.charAt(0)=="J")
  return 11;
  else if( card.charAt(0)=="Q")
  return 12;
  else if( card.charAt(0)=="K")
  return 13;
  else if( card.charAt(0)=="A")
  return 14;
  else if( card.charAt(0)=="7")
  return  7;
  else return parseInt(card.charAt(0),10);
}
function card_getsuit(card)
{
  if(card.length==7)
  return card.charAt(2);
  else return card.charAt(1);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
shuffle(cards);
var  playercard1=cards[0];
//
var  playercard2=cards[1];
//
var  card2=cards[2];
//
var  card1=cards[3];
//
var  card3=cards[4];
//
var  card4=cards[5];
//
var  card5=cards[6];
//
var botcard1=cards[7];
//
var botcard2=cards[8];
//
var botcard3=cards[9];
//
var botcard4=cards[10];
//
var sumpot=15000
function getFrequency(vect, val) {
  var contor = 0;
  vect.forEach((v)=>(v === val && contor++));
  return contor;
}
class Poker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards : ["2C.jpg", "2D.jpg", "2H.jpg", "2S.jpg", "3C.jpg", "3D.jpg", "3H.jpg", "3S.jpg", "4C.jpg", "4D.jpg", "4H.jpg", "4S.jpg", "5C.jpg",
      "5D.jpg", "5H.jpg", "5S.jpg", "6C.jpg", "6D.jpg", "6H.jpg", "6S.jpg", "7C.jpg", "7D.jpg", "7H.jpg", "7S.jpg", "8C.jpg", "8D.jpg", "8H.jpg", "8S.jpg",
      "9C.jpg", "9D.jpg", "9H.jpg", "9S.jpg", "10C.jpg", "10D.jpg", "10H.jpg", "10S.jpg", "AC.jpg", "AD.jpg", "AH.jpg", "AS.jpg", "JC.jpg", "JD.jpg", "JH.jpg",
      "JS.jpg", "KC.jpg", "KD.jpg", "KH.jpg", "KS.jpg", "QC.jpg", "QD.jpg", "QH.jpg", "QS.jpg"],
      playerfold:false,
      bot1fold:false,
      bot2fold:false,
      bot1lost:false,
      bot2lost:false,
      lastaction: "New hand.",
      displayAICards: false,
      playeractive:1,
      bet : 30,
      playertotalbet: 5,
      playerpot : 55555,
      value:5,
      bot1pot:15555,
      bot2pot:15555,
      bot1raiseNr:0,
      bot2raiseNr:0,
      bot1bet:5,
      playercard1:playercard1,
      playercard2:playercard2,
      tablecard1:card1,
      tablecard2:card2,
      tablecard3:card3,
      card2:card2,
card1:card1,
card3:card3,
 card4:card4,
 card5:card5,
botcard1:botcard1,
botcard2:botcard2,
botcard3:botcard3,
botcard4:botcard4,
      tablecard4:'Gray_back.jpg',
      tablecard5:'Gray_back.jpg',
      bot2bet:5,
      bot1card1:'Gray_back.jpg',
      bot1card2:'Gray_back.jpg',
      bot2card1:'Gray_back.jpg',
      bot2card2:'Gray_back.jpg',
      gameStage: 1,
      bot1fold: false,
      bot2fold:false,
      bot1hand:0,
      bot2hand:0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.betChange = this.betChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.dealNewHand=this.dealNewHand.bind(this);
    this.handleFold=this.handleFold.bind(this);
    this.bot1HandleBets=this.bot1HandleBets.bind(this);
    this.handleFoldClick=this.handleFoldClick.bind(this);
    this.bot2HandleBets=this.bot2HandleBets.bind(this);
    this.bot1HandlePlayerCheck=this.bot1HandlePlayerCheck.bind(this);
    this.bot1HandlePlayerRaise=this.bot1HandlePlayerRaise.bind(this);
    this.pOnclick=this.pOnclick.bind(this);
    this.bot2HandlePlayerCheck=this.bot2HandlePlayerCheck.bind(this);
    this.bot2HandlePlayerRaise=this.bot2HandlePlayerRaise.bind(this);
    this.handleZeroPotPlayer=this.handleZeroPotPlayer.bind(this);
  }
  
  handleChange(e) {
    this.setState({value: parseInt(e.target.value,10)});
   
  }

  handleSubmit(event) {
    this.setState({ totalpot: this.state.totalpot + this.state.value })
    
  }
  dealNewHand()
  {
    if(this.state.bot2pot>0)
    this.setState({
      bot2bet:1,
      bot2pot:this.state.bot2pot-1
    })
    if(this.state.bot1pot>0)
    this.setState({
      bot1bet:1,
      bot1pot:this.state.bot1pot-1
    })
    if(this.state.bot2pot==0)
    {alert("bot2 is out");
    this.setState({bot2lost:true})}
    if(this.state.bot1pot==0)
    {alert("bot1 is out");
    this.setState({bot1lost:true})}
    if(this.state.playerpot<=1)
    {alert("you lost");
    window.location.reload();}
    if(this.state.bot1pot<=0 && this.state.bot2pot<=0)
    {alert("you won");
    window.location.reload();}
    shuffle(this.state.cards);
    this.setState({   
      playerfold:false,
      gameStage:1,
      lastaction:"New hand.",
      playeractive:true,
      bot1fold:false,
      bot2fold:false,
      playercard1:this.state.cards[0],
      playercard2:this.state.cards[1],
      bot1card1:'Gray_back.jpg',
      bot1card2:'Gray_back.jpg',
      bot2card1:'Gray_back.jpg',
      bot2card2:'Gray_back.jpg',
      tablecard4:'Gray_back.jpg',
      tablecard5:'Gray_back.jpg',
      tablecard1:this.state.cards[3],
      tablecard2:this.state.cards[4],
      tablecard3:this.state.cards[5],
      botcard1:this.state.cards[6],
      botcard2:this.state.cards[7],
      botcard3:this.state.cards[8],
      botcard4:this.state.cards[9],
      playertotalbet:1,
      playerpot:this.state.playerpot-1
     
    })
    
   
  }
 
  bot1HandleBets()
  {
    if(this.state.bot1lost==false&&this.state.bot1fold==false){
    if(this.state.playerfold==true && (this.state.bot2lost==true || this.state.bot2fold==true))
    this.setState({ 
     
      lastaction:"Bot1 is the only one left. Processing."
                  });   
    else
    {
    var coinflip= Math.floor(Math.random() * this.state.bot1pot);
    if(this.state.bot1pot-(this.state.bot2bet-this.state.bot1bet)-Math.floor(coinflip/4)>=0)
    this.setState({ 
      bot1pot: this.state.bot1pot-(this.state.bot2bet-this.state.bot1bet)-Math.floor(coinflip/4),
      bot1bet:this.state.bot2bet+Math.floor(coinflip/4),
      lastaction:"Bot1 raised"
                  });   
    else{
      this.setState({ 
        bot1pot: this.state.bot1pot-(this.state.bot2bet-this.state.bot1bet)-Math.floor(coinflip/4),
        bot1bet:this.state.bot2bet+Math.floor(coinflip/4),
        lastaction:"Bot1 raised"
                    }); 
                  }
    }   }
    if(this.state.bot1lost==true || this.state.bot1fold==true)
    {
        if(this.state.playertotalbet==this.bot1bet)
        this.setState({gameStage:this.state.gameStage+1})
        if(this.state.playertotalbet<this.bot2bet && this.state.playerpot==0)
        this.decideWinner();
        if(this.state.playertotalbet>this.bot2bet && this.state.bot2pot==0)
        this.decideWinner();
      
    }
    this.handleZeroPotBot1();
  }
  bot2HandleBets()
  {
    if(this.state.bot2lost==false&&this.state.bot2fold==false)
    {
      if(this.state.playerfold==true && (this.state.bot1lost==true || this.state.bot1fold==true))
    this.setState({ 
     
      lastaction:"Bot2 is the only one left. Processing."
                  });   
    else{
    this.setState({ bot2pot: this.state.bot2pot-(this.state.bot1bet-this.state.bot2bet),
      bot2bet:this.state.bot1bet,
      lastaction:"Bot2 checked",
      gameStage:this.state.gameStage+1,
     
    });
  
  if(this.state.gameStage==2)
    {
    this.setState({
    tablecard4:this.state.card4
    });
  }
  if(this.state.gameStage==3)
  {
    this.setState({
    tablecard5:this.state.card5
    });
  }

if(this.state.gameStage==4)
{ 
  if(this.state.bot2lost==false)
  this.setState
  ({
   
    bot2card1:this.state.botcard3,
    bot2card2:this.state.botcard4,
  });
  if(this.state.bot1lost==false)
  this.setState
  ({
    bot1card1:this.state.botcard1,
    bot1card2:this.state.botcard2,
    
  });

}
}}
  if(this.state.bot2lost==true)
  {
    if(this.state.playertotalbet==this.bot1bet)
    this.setState({gameStage:this.state.gameStage+1})
    if(this.state.playertotalbet<this.bot1bet && this.state.playerpot==0)
    this.decideWinner();
    if(this.state.playertotalbet>this.bot1bet && this.state.bot1pot==0)
    this.decideWinner();
  }
  this.handleZeroPotBot2();
}
  handleFold()  // 1 => 3 cards dealt, 2=>turn over 4th card, 3 =>5th card
  {
    
    this.setState({ lastaction:"Player folded",
    playerfold:true,
    playeractive:false, });
    if(this.state.gameStage==1){
    var coinflip= Math.floor(Math.random() * this.state.bot1pot);
    setTimeout
    (this.bot1HandleBets.bind(this),2000);
    setTimeout
    (this.bot2HandleBets.bind(this),4000);}
    if(this.state.gameStage<=2){
    setTimeout
    (this.bot1HandleBets.bind(this),6000 );
  setTimeout
  (
    this.bot2HandleBets.bind(this),8000
  );}
  if(this.state.gameStage<=3){ 
  setTimeout
  (this.bot1HandleBets.bind(this),10000 );
setTimeout
(
  this.bot2HandleBets.bind(this),12000
);}
setTimeout(this.decideWinner.bind(this),14000);  
  }
  
  handleFoldClick(){
    this.setState({
      playerfold:true
    })
    this.handleFold();


  }
  bot1HasGoodHand()
  {
    
    var nr_bot1card1=card_getnumber(this.state.botcard1);
    var nr_bot1card2=card_getnumber(this.state.botcard2);
    var suit_bot1card1=card_getsuit(this.state.botcard1);
    var suit_bot1card2=card_getsuit(this.state.botcard2);
    var nr_tablecard1=card_getnumber(this.state.tablecard1);
    var nr_tablecard2=card_getnumber(this.state.tablecard2);
    var nr_tablecard3=card_getnumber(this.state.tablecard3);
    var nr_tablecard4=card_getnumber(this.state.tablecard4);
    var nr_tablecard5=card_getnumber(this.state.tablecard5);
    var suit_tablecard1=card_getsuit(this.state.tablecard1);
    var suit_tablecard2=card_getsuit(this.state.tablecard2);
    var suit_tablecard3=card_getsuit(this.state.tablecard3);
    var suit_tablecard4=card_getsuit(this.state.tablecard4);
    var suit_tablecard5=card_getsuit(this.state.tablecard5);
    var bot1handrank=1;//Math.max(card_getnumber(botcard1),card_getnumber(botcard2))/20
  
    var numbers=[];
    var suits=[];
    
    numbers.push(nr_tablecard4);
    
    if(this.state.gameStage==1)
    {
      suits.push(suit_tablecard1);
      suits.push(suit_tablecard2);
      suits.push(suit_tablecard3);
      numbers.push(nr_tablecard1);
    numbers.push(nr_tablecard2);
    numbers.push(nr_tablecard3);
    }
    if(this.state.gameStage==2)
    {
      suits.push(suit_tablecard4);
    numbers.push(nr_tablecard4);
    }
    if(this.state.gameStage==3)
   {
    numbers.push(nr_tablecard5);
    suits.push(suit_tablecard5);
   }
   var bot1card1freq=getFrequency(numbers,nr_bot1card1);
   var bot1card2freq=getFrequency(numbers,nr_bot1card2);
   if( bot1card1freq==0 && bot1card2freq==0 && nr_bot1card1 != nr_bot1card2)
   bot1handrank=bot1handrank+parseInt(Math.max(nr_bot1card1,nr_bot1card2))+Math.min(nr_bot1card1,nr_bot1card2)/10;
   if( bot1card1freq==0 && bot1card2freq==0 && nr_bot1card1 == nr_bot1card2)
   bot1handrank=bot1handrank+100+parseInt(nr_bot1card1,10);
   if( bot1card1freq==1 && bot1card2freq==0)
   bot1handrank=bot1handrank+100+parseInt(nr_bot1card1,10);
   if( bot1card1freq==0 && bot1card2freq==1)
   bot1handrank=bot1handrank+100+parseInt(nr_bot1card2,10);
   if( bot1card1freq==1 && bot1card2freq==1 && nr_bot1card1 !=nr_bot1card2 && nr_bot1card1>nr_bot1card2)
   bot1handrank=bot1handrank+200+parseInt(nr_bot1card1,10);
   if( bot1card1freq==1 && bot1card2freq==1 && nr_bot1card1 !=nr_bot1card2 && nr_bot1card1<nr_bot1card2)
   bot1handrank=bot1handrank+200+parseInt(nr_bot1card2,10);
   if( bot1card1freq==1 && bot1card2freq==1 && nr_bot1card1 ==nr_bot1card2)
   bot1handrank=bot1handrank+300+parseInt(nr_bot1card1,10);
   if( bot1card1freq==2 && bot1card2freq==0)
   bot1handrank=bot1handrank+300+parseInt(nr_bot1card1,10);
   if( bot1card1freq==0 && bot1card2freq==2)
   bot1handrank=bot1handrank+300+parseInt(nr_bot1card2,10);
   if( bot1card1freq==1 && bot1card2freq==2)
   bot1handrank=bot1handrank+500+parseInt(nr_bot1card2,10);;
   if( bot1card1freq==2 && bot1card2freq==1)
   bot1handrank=bot1handrank+500+parseInt(nr_bot1card1,10);
   if((getFrequency(suits,suit_bot1card1)==4) && bot1handrank<500) //flush 
   bot1handrank=bot1handrank+400+nr_bot1card1;
   if((getFrequency(suits,suit_bot1card2)==4) && bot1handrank<500)
   bot1handrank=bot1handrank+400+nr_bot1card2;
   if((getFrequency(suits,suit_bot1card1)==3) && getFrequency(suits,suit_bot1card2)==3 && bot1handrank<500)
   bot1handrank=400+Math.max(nr_bot1card1,nr_bot1card2);
   return bot1handrank
  }
  bot2HasGoodHand()
  {
    
    var nr_bot2card1=card_getnumber(this.state.botcard3);
    var nr_bot2card2=card_getnumber(this.state.botcard4);
    var suit_bot2card1=card_getsuit(this.state.botcard3);
    var suit_bot2card2=card_getsuit(this.state.botcard4);
    var nr_tablecard1=card_getnumber(this.state.tablecard1);
    var nr_tablecard2=card_getnumber(this.state.tablecard2);
    var nr_tablecard3=card_getnumber(this.state.tablecard3);
    var nr_tablecard4=card_getnumber(this.state.tablecard4);
    var nr_tablecard5=card_getnumber(this.state.tablecard5);
    var suit_tablecard1=card_getsuit(this.state.tablecard1);
    var suit_tablecard2=card_getsuit(this.state.tablecard2);
    var suit_tablecard3=card_getsuit(this.state.tablecard3);
    var suit_tablecard4=card_getsuit(this.state.tablecard4);
    var suit_tablecard5=card_getsuit(this.state.tablecard5);
    var bot2handrank=1;//Math.max(card_getnumber(botcard1),card_getnumber(botcard2))/20
  
    var numbers=[];
    var suits=[];
    
    numbers.push(nr_tablecard4);
    
    if(this.state.gameStage==1)
    {
      suits.push(suit_tablecard1);
      suits.push(suit_tablecard2);
      suits.push(suit_tablecard3);
      numbers.push(nr_tablecard1);
    numbers.push(nr_tablecard2);
    numbers.push(nr_tablecard3);
    }
    if(this.state.gameStage==2)
    {
      suits.push(suit_tablecard4);
    numbers.push(nr_tablecard4);
    }
    if(this.state.gameStage==3)
   {
    numbers.push(nr_tablecard5);
    suits.push(suit_tablecard5);
   }
   var bot2card1freq=getFrequency(numbers,nr_bot2card1);
   var bot2card2freq=getFrequency(numbers,nr_bot2card2);
   if( bot2card1freq==0 && bot2card2freq==0 && nr_bot2card1 != nr_bot2card2)
   bot2handrank=bot2handrank+parseInt(Math.max(nr_bot2card1,nr_bot2card2))+Math.min(nr_bot2card1,nr_bot2card2)/10;
   if( bot2card1freq==0 && bot2card2freq==0 && nr_bot2card1 == nr_bot2card2)
   bot2handrank=bot2handrank+100+parseInt(nr_bot2card1,10);
   if( bot2card1freq==1 && bot2card2freq==0)
   bot2handrank=bot2handrank+100+parseInt(nr_bot2card1,10);
   if( bot2card1freq==0 && bot2card2freq==1)
   bot2handrank=bot2handrank+100+parseInt(nr_bot2card2,10);
   if( bot2card1freq==1 && bot2card2freq==1 && nr_bot2card1 !=nr_bot2card2 && nr_bot2card1>nr_bot2card2)
   bot2handrank=bot2handrank+200+parseInt(nr_bot2card1,10);
   if( bot2card1freq==1 && bot2card2freq==1 && nr_bot2card1 !=nr_bot2card2 && nr_bot2card1<nr_bot2card2)
   bot2handrank=bot2handrank+200+parseInt(nr_bot2card2,10);
   if( bot2card1freq==1 && bot2card2freq==1 && nr_bot2card1 ==nr_bot2card2)
   bot2handrank=bot2handrank+300+parseInt(nr_bot2card1,10);
   if( bot2card1freq==2 && bot2card2freq==0)
   bot2handrank=bot2handrank+300+parseInt(nr_bot2card1,10);
   if( bot2card1freq==0 && bot2card2freq==2)
   bot2handrank=bot2handrank+300+parseInt(nr_bot2card2,10);
   if( bot2card1freq==1 && bot2card2freq==2)
   bot2handrank=bot2handrank+500+parseInt(nr_bot2card2,10);;
   if( bot2card1freq==2 && bot2card2freq==1)
   bot2handrank=bot2handrank+500+parseInt(nr_bot2card1,10);
   if((getFrequency(suits,suit_bot2card1)==4) && bot2handrank<500) //flush 
   bot2handrank=400+nr_bot2card1;
   if((getFrequency(suits,suit_bot2card2)==4) && bot2handrank<500)
   bot2handrank=400+nr_bot2card2;
   if((getFrequency(suits,suit_bot2card1)==3) && getFrequency(suits,suit_bot2card2)==3 && bot2handrank<500)
   bot2handrank=400+Math.max(nr_bot2card1,nr_bot2card2);
   if(bot2handrank<20)
   {
     if(nr_tablecard1==nr_tablecard2 ||  nr_tablecard1==nr_tablecard3 || nr_tablecard1==nr_tablecard4 || nr_tablecard1==nr_tablecard5  ||
      nr_tablecard2==nr_tablecard3 || nr_tablecard2==nr_tablecard4 || nr_tablecard2==nr_tablecard5 ||
      nr_tablecard3==nr_tablecard4|| nr_tablecard3==nr_tablecard5 || nr_tablecard4==nr_tablecard5 )
      bot2handrank=99;
   }
   return bot2handrank
  }
  decideWinner()
  {
    var nr_playercard1=card_getnumber(this.state.playercard1);
    var nr_playercard2=card_getnumber(this.state.playercard2);
    var nr_bot1card1=card_getnumber(this.state.botcard1);
    var nr_bot1card2=card_getnumber(this.state.botcard2);
    var nr_bot2card1=card_getnumber(this.state.botcard3);
    var nr_bot2card2=card_getnumber(this.state.botcard4);
    var suit_playercard1=card_getsuit(this.state.playercard1);
    var suit_playercard2=card_getsuit(this.state.playercard2);
    var suit_bot1card1=card_getsuit(this.state.botcard1);
    var suit_bot1card2=card_getsuit(this.state.botcard2);
    var suit_bot2card1=card_getsuit(this.state.botcard3);
    var suit_bot2card2=card_getsuit(this.state.botcard4);
    var nr_tablecard1=card_getnumber(this.state.tablecard1);
    var nr_tablecard2=card_getnumber(this.state.tablecard2);
    var nr_tablecard3=card_getnumber(this.state.tablecard3);
    var nr_tablecard4=card_getnumber(this.state.tablecard4);
    var nr_tablecard5=card_getnumber(this.state.tablecard5);
    var suit_tablecard1=card_getsuit(this.state.tablecard1);
    var suit_tablecard2=card_getsuit(this.state.tablecard2);
    var suit_tablecard3=card_getsuit(this.state.tablecard3);
    var suit_tablecard4=card_getsuit(this.state.tablecard4);
    var suit_tablecard5=card_getsuit(this.state.tablecard5);
    if(this.state.playerpot==0)
    this.setState({playerpot:1})
    var playerhandrank=1;//Math.max(card_getnumber(playercard1),card_getnumber(playercard2))/20;
    
    var bot1handrank=1;//Math.max(card_getnumber(botcard1),card_getnumber(botcard2))/20
    var bot2handrank=1;//Math.max(card_getnumber(botcard3),card_getnumber(botcard4))/20
    var numbers=[];
    var suits=[];
    numbers.push(nr_tablecard1);
    numbers.push(nr_tablecard2);
    numbers.push(nr_tablecard3);
    numbers.push(nr_tablecard4);
    numbers.push(nr_tablecard5);
    suits.push(suit_tablecard1);
    suits.push(suit_tablecard2);
    suits.push(suit_tablecard3);
    suits.push(suit_tablecard4);
    suits.push(suit_tablecard5);
    
    var playercard1freq=getFrequency(numbers,nr_playercard1);
    var playercard2freq=getFrequency(numbers,nr_playercard2);
    var bot1card1freq=getFrequency(numbers,nr_bot1card1);
    var bot1card2freq=getFrequency(numbers,nr_bot1card2);
    var bot2card1freq=getFrequency(numbers,nr_bot2card1);
    var bot2card2freq=getFrequency(numbers,nr_bot2card2);
    if( playercard1freq==0 && playercard2freq==0 && nr_playercard1 !=nr_playercard2)
    playerhandrank=playerhandrank+parseInt(Math.max(nr_playercard1,nr_playercard2))+Math.min(nr_playercard1,nr_playercard2)/20;
    if( playercard1freq==0 && playercard2freq==0 && nr_playercard1 ==nr_playercard2)
    playerhandrank=playerhandrank+100+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if( playercard1freq==1 && playercard2freq==0)//1 pair
    playerhandrank=playerhandrank+100+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if( playercard1freq==0 && playercard2freq==1)
    playerhandrank=playerhandrank+100+parseInt(nr_playercard2,10)+parseInt(nr_playercard1,10)/20;
    if( playercard1freq==1 && playercard2freq==1 && nr_playercard1 !=nr_playercard2 && nr_playercard1>nr_playercard2) //2 pairs
    playerhandrank=playerhandrank+200+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if( playercard1freq==1 && playercard2freq==1 && nr_playercard1 !=nr_playercard2 && nr_playercard1<nr_playercard2) //2 pairs
    playerhandrank=playerhandrank+200+parseInt(nr_playercard2,10)+parseInt(nr_playercard1,10)/20;
    if( playercard1freq==2 && playercard2freq==0 ) //3 of a kind 
    playerhandrank=playerhandrank+300+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if( playercard1freq==1 && playercard2freq==1 && nr_playercard1 ==nr_playercard2) //3 of a kind 
    playerhandrank=playerhandrank+300+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if( playercard1freq==0 && playercard2freq==2)
    playerhandrank=playerhandrank+300+parseInt(nr_playercard2,10)+parseInt(nr_playercard1,10)/20;
    if( playercard1freq==1 && playercard2freq==2) //full house
    playerhandrank=playerhandrank+500+parseInt(nr_playercard2,10)+parseInt(nr_playercard1,10)/20;
    if( playercard1freq==2 && playercard2freq==1)
    playerhandrank=playerhandrank+500+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if((getFrequency(suits,suit_playercard1)==4) && playerhandrank<500) //flush 
    playerhandrank=playerhandrank+400+parseInt(nr_playercard1,10);
    if((getFrequency(suits,suit_playercard2)==4) && playerhandrank<500)
    playerhandrank=playerhandrank+400+parseInt(nr_playercard2,10);
    if((getFrequency(suits,suit_playercard1)==3) &&  (getFrequency(suits,suit_playercard2)==3) &&  playerhandrank<500)
    playerhandrank=playerhandrank+400+parseInt(nr_playercard1,10);
    ///////////bot hand
    if( bot1card1freq==0 && bot1card2freq==0 && nr_bot1card1 != nr_bot1card2)
    bot1handrank=bot1handrank+parseInt(Math.max(nr_bot1card1,nr_bot1card2))+Math.min(nr_bot1card1,nr_bot1card2)/20;
    if( bot1card1freq==0 && bot1card2freq==0 && nr_bot1card1 == nr_bot1card2)
    bot1handrank=bot1handrank+100+parseInt(nr_bot1card1,10)+parseInt(nr_bot1card2,10)/20;
    if( bot1card1freq==1 && bot1card2freq==0)
    bot1handrank=bot1handrank+100+parseInt(nr_bot1card1,10)+parseInt(nr_bot1card2,10)/20;
    if( bot1card1freq==0 && bot1card2freq==1)
    bot1handrank=bot1handrank+100+parseInt(nr_bot1card2,10)+parseInt(nr_bot1card1,10)/20;
    if( bot1card1freq==1 && bot1card2freq==1 && nr_bot1card1 !=nr_bot1card2 && nr_bot1card1>nr_bot1card2)
    bot1handrank=bot1handrank+200+parseInt(nr_bot1card1,10)+parseInt(nr_bot1card2,10)/20;
    if( bot1card1freq==1 && bot1card2freq==1 && nr_bot1card1 !=nr_bot1card2 && nr_bot1card1<nr_bot1card2)
    bot1handrank=bot1handrank+200+parseInt(nr_bot1card2,10)+parseInt(nr_bot1card1,10)/20;
    if( bot1card1freq==1 && bot1card2freq==1 && nr_bot1card1 ==nr_bot1card2)
    bot1handrank=bot1handrank+300+parseInt(nr_bot1card1,10)+parseInt(nr_bot1card2,10)/20;
    if( bot1card1freq==2 && bot1card2freq==0)
    bot1handrank=bot1handrank+300+parseInt(nr_bot1card1,10)+parseInt(nr_bot1card2,10)/20;
    if( bot1card1freq==0 && bot1card2freq==2)
    bot1handrank=bot1handrank+300+parseInt(nr_bot1card2,10)+parseInt(nr_bot1card1,10)/20;
    if( bot1card1freq==1 && bot1card2freq==2)
    bot1handrank=bot1handrank+500+parseInt(nr_bot1card2,10)+parseInt(nr_bot1card1,10)/20;
    if( bot1card1freq==2 && bot1card2freq==1)
    bot1handrank=bot1handrank+500+parseInt(nr_bot1card1,10)+parseInt(nr_bot1card2,10)/20;
    if((getFrequency(suits,suit_bot1card1)==4) && bot1handrank<500) //flush 
    bot1handrank=bot1handrank+400+parseInt(nr_bot1card1,10);
    if((getFrequency(suits,suit_bot1card2)==4) && bot1handrank<500)
    bot1handrank=bot1handrank+400+parseInt(nr_bot1card2,10);
    if((getFrequency(suits,suit_bot1card1)==3) && getFrequency(suits,suit_bot1card2)==3 && bot1handrank<500)
    bot1handrank=bot1handrank+400+parseInt(nr_bot1card2,10);
    //bot2
    if( bot2card1freq==0 && bot2card2freq==0 && nr_bot2card1 != nr_bot2card2)
    bot2handrank=bot2handrank+parseInt(Math.max(nr_bot2card1,nr_bot2card2))+Math.min(nr_bot2card1,nr_bot2card2)/20;
    if( bot2card1freq==0 && bot2card2freq==0 && nr_bot2card1 == nr_bot2card2)
    bot2handrank=bot2handrank+100+parseInt(nr_bot2card1,10)+parseInt(nr_bot2card2,10)/20;
    if( bot2card1freq==1 && bot2card2freq==0)
    bot2handrank=bot2handrank+100+parseInt(nr_bot2card1,10)+parseInt(nr_bot2card2,10)/20;
    if( bot2card1freq==0 && bot2card2freq==1)
    bot2handrank=bot2handrank+100+parseInt(nr_bot2card2,10)+parseInt(nr_bot2card1,10)/20;
    if( bot2card1freq==1 && bot2card2freq==1 && nr_bot2card1 !=nr_bot2card2 && nr_bot2card1>nr_bot2card2)
    bot2handrank=bot2handrank+200+parseInt(nr_bot2card1,10)+parseInt(nr_bot2card2,10)/20;
    if( bot2card1freq==1 && bot2card2freq==1 && nr_bot2card1 !=nr_bot2card2 && nr_bot2card1<nr_bot2card2)
    bot2handrank=bot2handrank+200+parseInt(nr_bot2card2,10)+parseInt(nr_bot2card1,10)/20;
    if( bot2card1freq==1 && bot2card2freq==1 && nr_bot2card1 ==nr_bot2card2)
    bot2handrank=bot2handrank+300+parseInt(nr_bot2card2,10)+parseInt(nr_bot2card1,10)/20;
    if( bot2card1freq==2 && bot2card2freq==0)
    bot2handrank=bot2handrank+300+parseInt(nr_bot2card1,10)+parseInt(nr_bot2card2,10)/20;
    if( bot2card1freq==0 && bot2card2freq==2)
    bot2handrank=bot2handrank+300+parseInt(nr_bot2card2,10)+parseInt(nr_bot2card1,10)/20;
    if( bot2card1freq==1 && bot2card2freq==2)
    bot2handrank=bot2handrank+500+parseInt(nr_bot2card2,10)+parseInt(nr_bot2card1,10)/20;
    if( bot2card1freq==2 && bot2card2freq==1)
    bot2handrank=bot2handrank+500+parseInt(nr_bot2card1,10)+parseInt(nr_bot2card2,10)/20;
    if((getFrequency(suits,suit_bot2card1)==4) && bot2handrank<500) //flush 
    bot2handrank=bot2handrank+400+parseInt(nr_bot2card1,10)
    if((getFrequency(suits,suit_bot2card2)==4) && bot2handrank<500)
    bot2handrank=bot2handrank+400+parseInt(nr_bot2card2,10)
    if((getFrequency(suits,suit_bot2card1)==3) && getFrequency(suits,suit_bot2card2)==3 && bot2handrank<500)
    bot2handrank=bot2handrank+400+parseInt(Math.max(nr_bot1card1,nr_bot1card2))+Math.min(nr_bot1card1,nr_bot1card2)/20;
    //straight
    var playerstraight=[nr_tablecard1,nr_tablecard2,nr_tablecard3,nr_playercard1,nr_playercard2,nr_tablecard4,nr_tablecard5];
    if(isStraight(playerstraight)==true)
    playerhandrank=800;
   
    var bot1straight=[nr_bot1card1,nr_bot1card2,nr_tablecard1,nr_tablecard2,nr_tablecard3,nr_tablecard4,nr_tablecard5];
    if(isStraight(bot1straight)==true)
    bot1handrank=800
    var bot2straight=[nr_bot2card1,nr_bot2card2,nr_tablecard1,nr_tablecard2,nr_tablecard3,nr_tablecard4,nr_tablecard5];
    //both pair, different values
    //same pair value, get high card
   
    if(this.state.playerfold==true)
    playerhandrank=0;
    if(this.state.bot1lost==true || this.state.bot1fold==true)
    bot1handrank=0;
    if(this.state.bot2lost==true || this.state.bot2fold==true)
    bot2handrank=0;
    if(playerhandrank>bot1handrank && playerhandrank>bot2handrank && this.state.playerpot==0)
      { 
        
        this.setState({   
          playerpot:this.state.playerpot+this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet-1 ,
          playertotalbet:1,
          lastaction:"Player won. Click here to deal a new hand.",
          bot1bet:0,
          bot2bet:0,
          gameStage:5,
          
         
        })
        
      }
    console.log(playerhandrank);
        console.log(bot1handrank);
        console.log(bot2handrank); 
    if(playerhandrank>bot1handrank && playerhandrank>bot2handrank)
      { 
        
        this.setState({   
          playerpot:this.state.playerpot+this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet ,
          
          lastaction:"Player won. Click here to deal a new hand.",
          bot1bet:0,
          bot2bet:0,
          gameStage:5,
          
         
        },() => { console.log("player pot:");console.log(this.state.playerpot);
        })
        
      }
      
    if(bot1handrank > playerhandrank && bot1handrank > bot2handrank)
      {
          
          this.setState({   
            bot1pot:this.state.bot1pot+this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet ,
            
            lastaction:"Bot1 won. Click here to deal a new hand.",
            bot1bet:0,
            bot2bet:0,
            gameStage:5,
            
           
          })
          
      }
    if(bot2handrank >playerhandrank && bot2handrank>bot1handrank)
    {
    this.setState({   
      bot2pot:this.state.bot2pot+this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet ,
     
      lastaction:"Bot2 won. Click here to deal a new hand.",
      bot1bet:0,
      bot2bet:0,
      gameStage:5,
      
    
      
    })
    if(this.state.bot2pot==0)
    {
      alert("Bot2 is out");
      this.setState({
        bot2lost:true,
        bot2bet:0,
       
      })
    }
    if(this.state.bot1pot==0)
    {
      alert("Bot1 is out");
      this.setState({
        bot1lost:true,
        bot1bet:0,
       
      })
    }
    if(bot1handrank==playerhandrank && playerhandrank>bot2handrank)
    {
      this.setState({
        lastaction:"Bot1 and player split the pot",
        bot1pot:this.state.bot1bet+Math.floor((this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet)/2),
        playerpot:this.state.playerpot+Math.floor((this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet)/2),
      })
    }
    if(bot2handrank==playerhandrank && playerhandrank>bot1handrank)
    {
      this.setState({
        lastaction:"Bot1 and player split the pot",
        bot1pot:this.state.bot1bet+Math.floor((this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet)/2),
        playerpot:this.state.playerpot+Math.floor((this.state.playertotalbet+this.state.bot1bet+this.state.bot2bet)/2),
      })
    }
    setTimeout
    ( ()=> {if(this.state.playerpot==1)
      {
        alert("You lost");
        window.location.reload();
      }

    },3000);
    }
    this.setState({   
     
      gameStage:5
    })
  }
  betChange(event) {
  
  if (this.state.playeractive==1)
  {
    
     if(this.state.bot2lost==false){
     if(this.state.playertotalbet+this.state.value<this.state.bot2bet)
     alert("Raise must be higher than last bet")
    else{
    if(this.state.value>this.state.playerpot)
    this.setState({  playertotalbet:this.state.playertotalbet+this.state.playerpot, 
      playerpot:0 ,
      playeractive:0
    })
    else
    this.setState({  playertotalbet:this.state.playertotalbet+this.state.value, 
      playerpot:this.state.playerpot-this.state.value ,
      playeractive:0
    })
    
    var coinflip= Math.floor(Math.random() * this.state.bot1pot);
   
    setTimeout
    (this.bot1HandlePlayerRaise.bind(this),3000);
  coinflip= Math.floor(Math.random() * this.state.bot2pot);
  setTimeout(
    function() {
      this.setState
      ({ 
        playeractive:1
      });
      
          this.bot2HandlePlayerRaise();
         this.handleZeroPotBot2();
       }
    .bind(this),
    6000
  
);
      }
    }
  if(this.state.bot2lost==true)
  {
    if(this.state.playertotalbet+this.state.value<this.state.bot1bet)
     alert("Raise must be higher than last bet")
    else{
    if(this.state.value>this.state.playerpot)
    this.setState({  playertotalbet:this.state.playertotalbet+this.state.playerpot, 
      playerpot:0 ,
      playeractive:0
    })
    else
    this.setState({  playertotalbet:this.state.playertotalbet+this.state.value, 
      playerpot:this.state.playerpot-this.state.value ,
      playeractive:0
    })
    
    var coinflip= Math.floor(Math.random() * this.state.bot1pot);
   
    setTimeout
    (this.bot1HandlePlayerRaise.bind(this),3000);
  coinflip= Math.floor(Math.random() * this.state.bot2pot);
  setTimeout(
    function() {
      this.setState
      ({ 
        playeractive:1
      });
      
          this.bot2HandlePlayerRaise();
         this.handleZeroPotBot2();
       }
    .bind(this),
    6000
  
);
      }
    
  }
  }
  if(this.state.playeractive==0)
  {
    alert("not your turn");
  }
  
 
}
handleZeroPotBot1()
{
  if(this.state.bot1pot<0)
    this.setState
    ({ 
        bot1bet:this.state.bot1bet-Math.abs(this.state.bot1pot),
        bot1pot: 0,
    });
}
handleZeroPotBot2()
{
  if(this.state.bot2pot<0)
    this.setState
    ({ 
        bot2bet:this.state.bot2bet-Math.abs(this.state.bot2pot),
        bot2pot: 0,
    });
}
handleZeroPotPlayer()
{
  if(this.state.playerpot<0)
    this.setState
    ({ 
        playertotalbet:this.state.playertotalbet-Math.abs(this.state.playerpot),
        playerpot: 0,
    });
}
bot1HandlePlayerCheck()
      {
        var raiseNr=this.state.bot1raiseNr;
        console.log("raisenr");
        console.log(raiseNr);
        console.log("bot1hand");
        var bot1hand=this.bot1HasGoodHand();
        console.log(bot1hand);
        if(this.state.bot1lost==false && this.state.bot1fold==false){
          if(this.state.bot1pot==0)
          this.setState({lastaction:"Bot1 is all in"}); else {
        if(this.state.playerpot>0)
        {
        var coinflip= Math.floor(Math.random() * this.state.bot1pot);
       
         if(this.state.bot1bet<=this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet<=Math.floor(this.state.bot1pot/3)){
          this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
                          bot1bet:this.state.playertotalbet,
                          lastaction:"Bot1 checked"
                        });}
       if(this.state.bot1bet<this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3 )&& bot1hand<100){alert("bot 1 folded");
          this.setState({ 
                          lastaction:"Bot1 folds",
                          bot1fold:true
                        });}
     if(this.state.bot1bet<=this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) && bot1hand>100){
          this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
            bot1bet:this.state.playertotalbet,
            lastaction:"Bot1 checkedb"
          });}            
       if(this.state.bot1bet>=this.state.playertotalbet && this.state.bot2pot==0 && this.state.bot2lost==false)
        this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
                        bot1bet:this.state.playertotalbet,
                        lastaction:"Bot1 checked"
                      });
        if(this.state.bot1bet==this.state.bot2bet && this.state.bot1bet==this.state.playertotalbet )
         if(bot1hand>10 && bot1hand<100 && raiseNr<1){ 
           
          this.setState({ bot1pot: this.state.bot1pot-Math.floor(coinflip/30),
            bot1bet:this.state.bot1bet+Math.floor(coinflip/30),
            lastaction:"Bot1 raised",
            bot1raiseNr:this.state.bot1raiseNr+1,
          });}
          if(bot1hand>100 && raiseNr<3 ){  
            this.setState({ bot1pot: this.state.bot1pot-Math.floor(coinflip/3),
              bot1bet:this.state.bot1bet+Math.floor(coinflip/3),
              lastaction:"Bot1 raised",
              bot1raiseNr:this.state.bot1raiseNr+1,
            });}
          this.handleZeroPotBot1();
        
        
      }
       if (this.state.playerpot<=0 && this.state.bot2lost==false )
      {
        var coinflip= Math.floor(Math.random() * this.state.bot1pot);
       
        if(this.state.bot1bet<=this.state.bot2bet && this.state.bot2bet<=Math.floor(this.state.bot1pot/3)){
         this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
                         bot1bet:this.state.bot2bet,
                         lastaction:"Bot1 checked"
                       });}
       if(this.state.bot1bet<=this.state.bot2bet && this.state.bot2bet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) && bot1hand<100){
         this.setState({ 
                         lastaction:"Bot1 folds",
                         bot1fold:true
                       });}
       if(this.state.bot1bet<=this.state.bot2bet && this.state.bot2bet-this.state.bot1bet>Math.floor(this.state.bot1pot/3)&& bot1hand>100){
         this.setState({ bot1pot: this.state.bot1pot-(this.state.bot2bet-this.state.bot1bet),
           bot1bet:this.state.bot2bet,
           lastaction:"Bot1 checked"
         });} 
      }
      if( ((this.state.bot2lost==true || this.state.bot2fold==true) && this.state.playerpot<=0) || (this.state.bot2pot==0 && this.state.playerpot<=0))
      this.setState({
        lastaction:"Hand is being decided."
      });
      
    }}
    if(this.state.bot1lost==true || this.state.bot1fold==true)
    this.setState({
      lastaction:"Bot1 is out"
    })
      }
bot1HandlePlayerRaise()
      {
       
        console.log("bot1hand");
        
       var bot1hand=this.bot1HasGoodHand();
       console.log(bot1hand);
        if(this.state.bot1lost==false && this.state.bot1fold==false){
          if(this.state.playerpot==0 && (this.state.bot2lost==true||this.state.bot2fold==true ) )
     {
      var coinflip= Math.floor(Math.random() * this.state.bot1pot);
      if(this.state.bot1bet<=this.state.playertotalbet &&  this.state.playertotalbet-this.state.bot1bet<=Math.floor(this.state.bot1pot/3))
       this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
                       bot1bet:this.state.playertotalbet,
                       lastaction:"Bot1 checked. Player is all in. "
                     });
       if(this.state.bot1bet<this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) && bot1hand<100){
       this.setState({ 
                       lastaction:"Bot1 folds. Player went all in.",
                       bot1fold:true

                     });      }
       if(this.state.bot1bet<=this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) && bot1hand>100)
       this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
         bot1bet:this.state.playertotalbet,
         lastaction:"Bot1 checked. Player is all in."
       });
     }
          else{
        if(this.state.playerpot>0){
        var coinflip= Math.floor(Math.random() * this.state.bot1pot);
         if(this.state.bot1bet<this.state.playertotalbet &&  this.state.playertotalbet-this.state.bot1bet<=Math.floor(this.state.bot1pot/3))
          this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
                          bot1bet:this.state.playertotalbet,
                          lastaction:"Bot1 checked"
                        });
          if(this.state.bot1bet<this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) && bot1hand<100){
          this.setState({ 
                          lastaction:"Bot1 folds.",
                          bot1fold:true

                        });      }
          if(this.state.bot1bet<this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) && bot1hand>100)
          this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
            bot1bet:this.state.playertotalbet,
            lastaction:"Bot1 checked"
          });        
         if(bot1hand>100)
         {
          this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet)-Math.floor(coinflip/2),
            bot1bet:this.state.playertotalbet+Math.floor(coinflip/2),
            lastaction:"Bot1 raised"
          });
         }
        }
       
       if(this.state.playerpot<=0 && this.state.playertotalbet>this.state.bot1bet&& this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) &&bot1hand<100) //player all in
        {
          this.setState({ 
            lastaction:"Bot1 folds.",
            bot1fold:true

          });   
        }
        else if(this.state.playerpot<=0 && this.state.playertotalbet>this.state.bot1bet&& this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3)  &&bot1hand>100) //player all in
        {
          this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
            bot1bet:this.state.playertotalbet,
            lastaction:"Bot1 checked"
          });
        }
        
      }
      
    }
        this.handleZeroPotBot1();
      }
      bot2HandlePlayerCheck()
      {

        var bot2hand=this.bot2HasGoodHand();
        var raisedNr=this.state.bot2raiseNr;
        var coinflip= Math.floor(Math.random() * this.state.bot2pot);
        console.log("bot2hand");
   console.log(bot2hand);
        if(this.state.bot2lost==false && this.state.bot2fold==false){
          if(this.state.bot2pot<=0)
          this.setState({lastaction:"Bot2 is all in"}); else {
        if(this.state.bot1lost==true || this.state.bot1pot==0 || this.state.bot1fold==true)
        {
     
         if(this.state.bot2bet<=this.state.playertotalbet && this.state.playertotalbet-this.state.bot2bet<Math.floor(this.state.bot2pot/4))
          this.setState({ bot2pot: this.state.bot2pot-(this.state.playertotalbet-this.state.bot2bet),
                          bot2bet:this.state.playertotalbet,
                          lastaction:"Bot2 checked"
                        });
          if(this.state.bot2bet<=this.state.playertotalbet && this.state.playertotalbet-this.state.bot2bet>=Math.floor(this.state.bot2pot/4) &&bot2hand>90)
          this.setState({ bot2pot: this.state.bot2pot-(this.state.playertotalbet-this.state.bot2bet),
                          bot2bet:this.state.playertotalbet,
                          lastaction:"Bot2 checked"
                        });
           if(this.state.bot2bet<=this.state.playertotalbet && this.state.playertotalbet-this.state.bot2bet>=Math.floor(this.state.bot2pot/4) &&bot2hand<90)
          this.setState({ 
                          lastaction:"Bot2 folded",
                          bot2fold:true
                        });
          
          if(bot2hand==99 && this.state.playertotalbet>9000 )
          {
            this.setState({ 
              bot2bet:this.state.bot2bet+this.state.bot2pot,
              bot2pot:0,
              lastaction:"Bot2 went all in."
            });
          }
          this.handleZeroPotBot2();
        }
        else if(this.state.bot1lost==false && this.state.bot1fold==false)
        {
         
          if(this.state.bot2bet<=this.state.bot1bet && this.state.bot1bet-this.state.bot2bet<Math.floor(this.state.bot2pot/4))
          this.setState({ bot2pot: this.state.bot2pot-(this.state.bot1bet-this.state.bot2bet),
                          bot2bet:this.state.bot1bet,
                          lastaction:"Bot2 checked"
                        });
          if(this.state.bot2bet<=this.state.bot1bet && this.state.bot1bet-this.state.bot2bet>=Math.floor(this.state.bot2pot/4) &&bot2hand>90)
          this.setState({ bot2pot: this.state.bot2pot-(this.state.bot1bet-this.state.bot2bet),
                          bot2bet:this.state.bot1bet,
                          lastaction:"Bot2 checked"
                        });
           if(this.state.bot2bet<=this.state.bot1bet && this.state.bot1bet-this.state.bot2bet>=Math.floor(this.state.bot2pot/4) &&bot2hand<90)
          this.setState({ 
                          lastaction:"Bot2 folded",
                          bot2fold:true
                        });
          if(bot2hand>100&&raisedNr<2)
          this.setState({ bot2pot: this.state.bot2pot-Math.floor(coinflip/3),
            bot2bet:this.state.bot2bet+Math.floor(coinflip/3),
            lastaction:"Bot2 raised",
          bot2raiseNr:this.state.bot2raiseNr+1
          });
          if(bot2hand==99 && this.state.bot1bet>9000 )
          {
            this.setState({ 
              bot2bet:this.state.bot2bet+this.state.bot2pot,
              bot2pot:0,
              lastaction:"Bot2 went all in."
            });
          }

          this.handleZeroPotBot2();
        }}}
        else
        this.setState({ 
          lastaction:"Bot2 is out"
        });
        this.handleZeroPotBot2();
       
      }
bot2HandlePlayerRaise()
{ 
  var raisedNr=this.state.bot2raiseNr;
   var bot2hand=this.bot2HasGoodHand();
   console.log("bot2hand");
   console.log(bot2hand);
   var coinflip= Math.floor(Math.random() * this.state.bot2pot);
   if (bot2hand>10 && bot2hand<100)
        coinflip=Math.floor(coinflip/10);
   var raiseNr=this.state.bot2raiseNr;  
   if(this.state.bot2lost==false && this.state.bot2fold==false){
  if(this.state.bot1lost==true || this.state.bot1pot==0 || this.state.bot1fold==true)
  {
    
         if(this.state.bot2bet<this.state.playertotalbet && this.state.playertotalbet-this.state.bot2bet<=Math.floor(this.state.bot2pot/4))
          this.setState({ bot2pot: this.state.bot2pot-(this.state.playertotalbet-this.state.bot2bet),
                          bot2bet:this.state.playertotalbet,
                          lastaction:"Bot2 checked"
                        });
          if(this.state.bot2bet<this.state.playertotalbet && this.state.playertotalbet-this.state.bot2bet>Math.floor(this.state.bot2pot/4) && bot2hand<200 )
          this.setState({ 
            lastaction:"Bot2 folded",
            bot2fold:true
          });
          if(this.state.bot2bet<this.state.playertotalbet && this.state.playertotalbet-this.state.bot2bet>Math.floor(this.state.bot2pot/4)  && bot2hand>=200 )
          this.setState({ bot2pot: this.state.bot2pot-(this.state.playertotalbet-this.state.bot2bet),
            bot2bet:this.state.playertotalbet,
            lastaction:"Bot2 checked"
          });
         if((coinflip%3==0  || coinflip%3==2)&&raisedNr<3 && this.state.bot2bet==this.state.playertotalbet)
         {
          this.setState({ bot2pot: this.state.bot2pot-Math.floor(coinflip/2),
            bot2bet:this.state.bot2bet+Math.floor(coinflip/2),
            lastaction:"Bot2 raised",
            bot2raiseNr:this.state.bot2raiseNr+1
          });
         }
          this.handleZeroPotBot2();
  }
   if (this.state.bot1lost==false && this.state.bot1fold==false && this.state.bot1pot>0)
  {
    if(this.state.bot2bet<=this.state.bot1bet && this.state.bot1bet-this.state.bot2bet<Math.floor(this.state.bot2pot/4))
    this.setState({ bot2pot: this.state.bot2pot-(this.state.bot1bet-this.state.bot2bet),
                    bot2bet:this.state.bot1bet,
                    lastaction:"Bot2 checked"
                  });
    if(this.state.bot2bet<=this.state.bot1bet && this.state.bot1bet-this.state.bot2bet>=Math.floor(this.state.bot2pot/4) &&bot2hand>90)
    this.setState({ bot2pot: this.state.bot2pot-(this.state.bot1bet-this.state.bot2bet),
                    bot2bet:this.state.bot1bet,
                    lastaction:"Bot2 checked"
                  });
     if(this.state.bot2bet<=this.state.bot1bet && this.state.bot1bet-this.state.bot2bet>=Math.floor(this.state.bot2pot/4) &&bot2hand<90)
    this.setState({ 
                    lastaction:"Bot2 folded",
                    bot2fold:true
                  });   

  }
  if(this.state.bot2pot==0)
  this.setState({lastaction:"Bot2 is all in."});
  this.handleZeroPotBot2();
}
 else if(this.state.bot2lost==true || this.state.bot2fold==true)
 {
  this.setState
  ({ 
    lastaction:"Bot2 is out"
  });
 }
 if( (this.state.bot2lost==true||this.state.bot2fold==true)&&(this.state.bot1fold==true||this.state.bot1lost==true))
 {
  this.setState
  ({ 
    lastaction:"Both bots are out."
  });
  this.decideWinner();
 }
}

pOnclick()
{
  if(this.state.gameStage>=5)
        this.dealNewHand();
  else(alert("Can't deal new hand now."))
}
handleCheck(event)
{
  
  if (this.state.playeractive==1)
  { 
    if((this.state.bot2lost==true || this.state.bot2pot==0 || this.state.bot2fold==true) )
    {
      if(this.state.bot2lost==false && this.state.bot2fold==false && this.state.bot2pot==0 && this.state.bot2bet>this.state.playerpot+this.state.playertotalbet)
      {
        {
          alert("You're all in.");
        this.setState
        ({ playerpot: 0,
            playertotalbet:this.state.playertotalbet+this.state.playerpot
        });
        }
      }
      if(this.state.bot2lost==false && this.state.bot2fold==false && this.state.bot2pot==0 && this.state.bot2bet<this.state.playerpot+this.state.playertotalbet
         && this.state.bot2bet>this.state.bot1bet)
      {
        {
          alert("You're all in.");
          this.setState
          ({ playerpot: this.state.playerpot-(this.state.bot2bet-this.state.playertotalbet),
              playertotalbet:this.state.bot2bet
          },this.handleZeroPotPlayer());
        }
      }
      if(this.state.playertotalbet<this.state.bot1bet  && this.state.bot1bet<=this.state.playertotalbet+this.state.playerpot)
    {
    this.setState
    ({ playerpot: this.state.playerpot-(this.state.bot1bet-this.state.playertotalbet),
        playertotalbet:this.state.bot1bet
    },this.handleZeroPotPlayer());
    }
    if(this.state.playertotalbet<this.state.bot1bet  && this.state.bot1bet>this.state.playertotalbet+this.state.playerpot)
    {
      alert("You're all in")
    this.setState
    ({ 
        playertotalbet:this.state.playertotalbet+this.state.playertotalpot,
        playerpot:0,
    },this.handleZeroPotPlayer());
    }
    
     }
    if(this.state.bot2lost==false && this.state.bot2fold==false && this.state.bot2pot>0)
    {
      if(this.state.playertotalbet<this.state.bot2bet && this.state.bot2bet>this.state.playerpot+this.state.playertotalbet)
      {
        alert("You're all in.");
      this.setState
      ({ playerpot: 0,
          playertotalbet:this.state.playertotalbet+this.state.playerpot
      });
      }
      
     else if(this.state.playertotalbet<this.state.bot2bet && this.state.bot2bet<=this.state.playerpot+this.state.playertotalbet)
    {
    this.setState
    ({ playerpot: this.state.playerpot-(this.state.bot2bet-this.state.playertotalbet),
        playertotalbet:this.state.bot2bet
    },this.handleZeroPotPlayer());
    }
    
     }
    if(this.state.bot2lost==false && this.state.bot2fold==false && this.state.bot2pot==0 && this.state.bot2bet>this.state.playerpot+this.state.playertotalbet)
    {
      {
        alert("You're all in.");
      this.setState
      ({ playerpot: 0,
          playertotalbet:this.state.playertotalbet+this.state.playerpot
      });
      }
    }
   
    if(this.state.playerpot<0)
    this.setState
    ({ playerpot: 0,
        playertotalbet:this.state.playertotalbet-Math.abs(this.state.playerpot)
    });
    
    {
    this.setState({  playeractive:0 })
    var coinflip= Math.floor(Math.random() * this.state.bot1pot);
    this.handleZeroPotPlayer();
    setTimeout
    (this.bot1HandlePlayerCheck.bind(this),2000 );
   coinflip= Math.floor(Math.random() * this.state.bot2pot);
   setTimeout(
    function() 
    {  
      this.setState
      ({ 
        playeractive:1
      });
      this.bot2HandlePlayerCheck();
      
      if((this.state.bot1lost==true || this.state.bot1fold==true) && this.state.bot2bet<=this.state.playertotalbet && this.state.bot2pot==0)
      {  this.setState({
          gameStage:4,
              bot2card1:this.state.botcard3,
              bot2card2:this.state.botcard4,
              tablecard4:this.state.card4,
              tablecard5:this.state.card5
        });
        this.decideWinner();
      }
     if((this.state.bot1lost==true || this.state.bot1fold==true) && this.state.bot2bet>=this.state.playertotalbet && this.state.playerpot==0)
     {  this.setState({
        gameStage:4,
            
            bot2card1:this.state.botcard3,
            bot2card2:this.state.botcard4,
            tablecard4:this.state.card4,
            tablecard5:this.state.card5
            
      });
      this.decideWinner();
     }
     if((this.state.bot2lost==true || this.state.bot2fold==true) && this.state.bot1bet>=this.state.playertotalbet && this.state.playerpot==0)
     {  this.setState({
        gameStage:4,
            
            bot2card1:this.state.botcard3,
            bot2card2:this.state.botcard4,
            tablecard4:this.state.card4,
            tablecard5:this.state.card5
            
      });
      this.decideWinner();
     }
        if(this.state.bot1pot==0 && this.state.bot2pot==0 && this.state.bot1bet>0 && this.state.bot2bet>0 && this.state.bot1fold==false && this.state.bot2fold==false)
        {
         
          this.setState({
            gameStage:4,
            bot1card1:this.state.botcard1,
            bot1card2:this.state.botcard2,
            bot2card1:this.state.botcard3,
            bot2card2:this.state.botcard4,
            tablecard4:this.state.card4,
            tablecard5:this.state.card5
          });
  
          this.decideWinner();
        }
    
        if(this.state.bot1pot==0 && this.state.playerpot==0 && this.state.bot1bet>0 && this.state.playertotalbet>0 && this.state.bot1fold==false )
        {
         
          this.setState({
            gameStage:4,
            bot1card1:this.state.botcard1,
            bot1card2:this.state.botcard2,
            bot2card1:this.state.botcard3,
            bot2card2:this.state.botcard4,
            tablecard4:this.state.card4,
            tablecard5:this.state.card5
          });
  
          this.decideWinner();
        }
        if(this.state.bot2pot==0 && this.state.playerpot==0 && this.state.bot2bet>0 && this.state.playertotalbet>0 && this.state.bot2fold==false)
        {
         
          this.setState({
            gameStage:4,
            bot1card1:this.state.botcard1,
            bot1card2:this.state.botcard2,
            bot2card1:this.state.botcard3,
            bot2card2:this.state.botcard4,
            tablecard4:this.state.card4,
            tablecard5:this.state.card5
          });
  
          this.decideWinner();
        }
        if(this.state.bot1pot==0 && this.state.bot1bet!=0 && this.state.bot1bet<this.state.playertotalbet && this.state.bot2bet==this.state.playertotalbet ){
        this.setState({
          gameStage:this.state.gameStage+1
        }); }
       /* if(this.state.bot1pot==0 && this.state.bot1bet!=0 && this.state.bot2bet==this.state.playertotalbet){
        this.setState({
          gameStage:this.state.gameStage+1
        }); alert("bbbb");}*/
        if(this.state.bot2pot==0  && this.state.bot1bet==this.state.playertotalbet && this.state.playertotalbet>this.state.bot2bet && this.state.bot1bet>this.state.bot2bet && this.state.bot2bet>0 )
       { this.setState({
          gameStage:this.state.gameStage+1
        });}
        
        
        if( (this.state.bot1lost==true || this.state.bot1fold==true) && this.state.bot2pot>0 && this.state.playerpot>0 && this.state.bot2bet==this.state.playertotalbet) //todo
        this.setState({
          gameStage:this.state.gameStage+1
        });
        if((this.state.bot1lost==true || this.state.bot1fold==true) && this.state.bot2pot==0 && this.state.playerpot>0 && this.state.bot2bet<=this.state.playertotalbet ) //todo
        this.setState({
          gameStage:this.state.gameStage+1
        });
        if( (this.state.bot2lost==true || this.state.bot2fold==true) && this.state.bot1pot>0 && this.state.playerpot>0 && this.state.bot1bet==this.state.playertotalbet) //todo
        this.setState({
          gameStage:this.state.gameStage+1
        });
        if((this.state.bot2lost==true || this.state.bot2fold==true) && this.state.bot1pot==0 && this.state.playerpot>0 && this.state.bot1bet<=this.state.playertotalbet ) //todo
        this.setState({
          gameStage:this.state.gameStage+1
        });
        
        if(this.state.playertotalpot==0 && this.state.playertotalbet!=0 && this.state.bot1bet==this.state.bot2bet)
        this.setState({
          gameStage:this.state.gameStage+1
        });
        if(this.state.playertotalbet==this.state.bot1bet && this.state.bot1bet==this.state.bot2bet)
        this.setState({
          gameStage:this.state.gameStage+1
        });
        
        if(this.state.gameStage==2)
        this.setState({
          tablecard4:this.state.card4
        });
        if(this.state.gameStage==3)
        { 
          this.setState({
          tablecard5:this.state.card5,
          
        });
        } 
         if(this.state.gameStage==4)
         { 
           this.setState({
           
           bot1card1:this.state.botcard1,
           bot1card2:this.state.botcard2,
           bot2card1:this.state.botcard3,
           bot2card2:this.state.botcard4,
         });
 
         this.decideWinner();
         
          }
        
          
    }
    .bind(this),4000
);
   }
  
  }
  
  if(this.state.playeractive==0)
    alert("not your turn");

}
  render()
  {
   
return (

    <div className={styles.container}> 
    <div className={styles.camera}><Webcam height={250} width={250}></Webcam></div>
     <p onClick={this.pOnclick} className={styles.lastaction} >{this.state.lastaction}</p>
    
        <PlayerData handleChange={this.handleChange}
        betChange={this.betChange}
       handleCheck={this.handleCheck}
       dealNewHand={this.dealNewHand}
       handleFold={this.handleFold}
         playertotalbet={this.state.playertotalbet} 
         playerpot={this.state.playerpot}
         value={this.state.value}
         playercard1={this.state.playercard1}
         playercard2={this.state.playercard2}
         playeractive={this.state.playeractive}
         ></PlayerData>
   
    <div className={styles.player2}> 
    <p>{this.state.gameStage}</p>
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.bot1card1} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.bot1card2} />
    <p> Total pot= {this.state.bot1pot}</p> 
    <p>Bet= {this.state.bot1bet}</p>
    </div>
    <div className={styles.player3}> 
    
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.bot2card1} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.bot2card2} />
    
    <p> Total pot= {this.state.bot2pot}</p>
    <p>Bet= {this.state.bot2bet}</p>
    </div>
    <div  className={styles.cardsDiv}>
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.tablecard1} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.tablecard2} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.tablecard3} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.tablecard4} />
    <img className={styles.tableCard} src={process.env.PUBLIC_URL + '/imgs/'+this.state.tablecard5} />
    </div>
    <div className={styles.pot}> 
   <p>Total pot= {this.state.bot1bet+this.state.bot2bet+this.state.playertotalbet}</p>
    </div>
    </div>)
}

}

export default Poker;