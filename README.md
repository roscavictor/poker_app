# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

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

 
