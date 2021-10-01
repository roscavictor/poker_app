# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the src directory, you can run:
### `npm build`
### `npm start`

Runs the app in the development mode.\


 ## Implementation of the game itself
 ### 1. The deck of cards
 First we'll have to declare an array of cards(which are just the strings of the file names themselves) which we can use to render the cards themselves.
 We use the Fisher-Yates shuffle since it's an algorhitm that allows us to randomly shuffle an array:
 ```
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
```
### 2. Initial states
We can now set up the initial states of the player's, bot1's and bot2's cards. The values of the cards themselves are stored in certain states, but for the cards on the table we'll just render the cards' back.
![image](https://user-images.githubusercontent.com/49694231/135669150-b7a7ad9d-f315-4b99-86d9-700de9990d0a.png)
### 3. Going forward
In the most general case, the game will move on to the next stage after all 3 players have checked the same amount of money. As such, only the handleCheck function checks if these conditions are met so the game can move on to the next stage. 
```
if(this.state.playertotalbet==this.state.bot1bet && this.state.bot1bet==this.state.bot2bet)
        this.setState({
          gameStage:this.state.gameStage+1
        });
        
```
However there are lots of other variations of these case. For example:
1. Bot1 is out of money so he has to go all-in, therefore he cant bet the same amount as other players.
2. Same as above, but bot2 is out of the game. Therefore, the game *should* automatically skip to the stage where it decides the winner. 
When the game moves on to the next stage, the next card is revealed.

### 4. The bots
The bots have 2 basic ideas: if they have good cards, and if the bet is over/under their "sweet spot" (around 1/3 of bot1's pot and 1/4 of bot's pot). If either of them has at least a pair, they'll raise a few times with a randomly generated number that has their pot used as the seed:
```
if(bot1hand>100 && this.state.bot1raiseNr<3 ){  
            this.setState({ bot1pot: this.state.bot1pot-Math.floor(coinflip/3),
              bot1bet:this.state.bot1bet+Math.floor(coinflip/3),
              lastaction:"Bot1 raised",
              bot1raiseNr:this.state.bot1raiseNr+1,
            });} }
```
Keep in mind that the bots must take into consideration if any of the other 2 players it out of the game, so they "know" whose pot to "look" at when considering betting. 
Example of condition being checked:
```
if(this.state.bot1bet<=this.state.playertotalbet && this.state.playertotalbet-this.state.bot1bet>Math.floor(this.state.bot1pot/3) && bot1hand>100)
       this.setState({ bot1pot: this.state.bot1pot-(this.state.playertotalbet-this.state.bot1bet),
         bot1bet:this.state.playertotalbet,
         lastaction:"Bot1 checked. Player is all in."
       });
 ```
 Here bot1 must look if their bet is smaller than the player's, check if the bet they must place is smaller than a third, and to see if their hand is decent.
 There's a plethora of cases that must be checked, and according to the 3 conditions mentioned above, they'll either check, raise, or fold accordingly. 
 Bot2 will "bluff" if there's a pair higher than 10 on the table and go all-in.
 ### 4. Deciding winning hand
 The formula is this : value of highest card + value of 2ndcard/20 + type of pair.
 For example: lets check if there's 1 pair in a hand. We have the values of both cards, and the values of the cards on the table. We can look at this as a problem of looking for frequencies of a number in an array. So, if getFrequence(card1,array)=1 then we have a pair. However, there's also the case of when the pair is in the player's hands (player has 2 aces in hand) for example:
 ```
 playerhandrank=playerhandrank+parseInt(Math.max(nr_playercard1,nr_playercard2))+Math.min(nr_playercard1,nr_playercard2)/20;
    if( playercard1freq==0 && playercard2freq==0 && nr_playercard1 ==nr_playercard2)
    playerhandrank=playerhandrank+100+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if( playercard1freq==1 && playercard2freq==0)//1 pair
    playerhandrank=playerhandrank+100+parseInt(nr_playercard1,10)+parseInt(nr_playercard2,10)/20;
    if( playercard1freq==0 && playercard2freq==1)
    playerhandrank=playerhandrank+100+parseInt(nr_playercard2,10)+parseInt(nr_playercard1,10)/20;
 ```
###5. Short summary.
The entire paper is just a lot of if's and working around several states. There are issues where because setState is async, states are not updated fast enough for the game to work properly. Several problems need to be worked on. 
![image](https://user-images.githubusercontent.com/49694231/135673284-676c0206-4f05-4075-bb06-b12eeaed0f77.png)

