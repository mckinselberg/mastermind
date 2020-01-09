import React, {Component} from 'react';
import TurnsHistory from './TurnsHistory.js';
import './App.css';
 
export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solutionArr: [],
      currGuess: {},
      turns:[],
      turnsAllowed:7
      /*
      turns: [{
        no:0,
        guess:[],
        answer:[]
      }]
      */
    }
    this.returnColors = this.returnColors.bind(this);
    this.setSolutionArr = this.setSolutionArr.bind(this);
    this.buildGuessOptions = this.buildGuessOptions.bind(this);
    this.handleGuessOptionChange = this.handleGuessOptionChange.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
    this.compareArrays = this.compareArrays.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  returnColors() {
    return ['purple','green','blue','orange','yellow','salmon']; //'aqua',]; //'pink']
  }
 
  returnRandomValFromArr(arr) {
    let arrLength = arr.length - 1;
    let min = Math.ceil(0);
    let max = Math.floor(arrLength);
    return arr[Math.floor(Math.random() * (max - min + 1)) + min];
  }
  setSolutionArr() {
    let arr = this.returnColors().slice(0);
    let solutionArr = [];
    for (let i = 0; i < 4; i++) {
      let random = this.returnRandomValFromArr(arr);
      solutionArr.push(random);
      arr.splice(arr.indexOf(random), 1)
    }
    this.setState({solutionArr:solutionArr})
  }
  buildGuessOptions() {
    let guessOpts = [];
    let colors = this.returnColors().slice(0);
    
    for (let i = 0; i < 4; i++) {
      guessOpts.push(
        <select name={i} key={i} onChange={this.handleGuessOptionChange} className={this.state.currGuess[i]}>
          <option className="white" value="empty"></option>
          <option className="none" value="none">none</option>
          {colors.map(function(color,i) {
            return <option className={color} key={i} value={color}>{color}</option>
          })}
        </select>
      )
    }
    /*
    for (let i = 0; i < 4; i++) {
      guessOpts.push(
        <div key={i} className={`custom-select ${this.state.currGuess[i]}`}>
          {colors.map(function(color,i) {
            return <div key={i} className={color}></div>
          })}
        </div>
      )
    }
    */
    return guessOpts;
  }
  handleGuessOptionChange(e) {
    let selectName = e.target.getAttribute('name');
    let currGuessState = this.state.currGuess;
    //console.log(currGuessState);
    //record the guess as an object in state
    //if (e.target.value !== "") {
      this.setState({
        currGuess:{
          ...currGuessState,
          ...{[selectName] : e.target.value}
        }
      })
    //}
  }
  submitGuess(e) {
    e.preventDefault();
 
    //if (Object.keys(this.state.currGuess).length < 4) {
      let guessArrFromObj = Object.values(this.state.currGuess);
    
    if (guessArrFromObj.includes("empty") || Object.keys(this.state.currGuess).length < 4) {
      alert('Please select 4 colors');
    } else {
      //convert guess object to an array
      let answerArr = this.compareArrays(this.state.solutionArr,guessArrFromObj);
      let shuffledAnswer = this.shuffleArray(answerArr);
      let turnNo = Object.keys(this.state.turns).length || 0;
      let currTurn = {
        no: turnNo,
        guess: guessArrFromObj,
        answer: shuffledAnswer
      };
      if (turnNo >= this.state.turnsAllowed) {
        alert(`You're out of turns. :(`);
      } else {
      // turn object
      /*
      let turnObj = {
        no:1,
        guess: [],
        answer: []
        
      }*/
        this.setState({
          turns:[
            ...this.state.turns,
            currTurn
          ]
        });
      
 
        //check for winner
        const winner = ['red','red','red','red'];
        //compares the winner array with the shuffledAnswer array
        let isWinner = (array1, array2) => array1.length === array2.length && array1.sort().every((value, index) => value === array2[index])
        
        if (isWinner(winner,shuffledAnswer)) {
          alert(`yay! You won in ${currTurn.no + 1} turn${currTurn.no === 0 ? '' : 's'}!`);
        }
      }
    }
    
  }
 
  compareArrays(solutionArr, guessArr) {
    let responseArr = [];  
    for (let i = 0; i <= 3; i++) {
      //console.log(solutionArr.indexOf(guessArr[i]));
      if (solutionArr.includes(guessArr[i]))  {
        if (solutionArr[i] === guessArr[i]) {
          responseArr.push('red');
        } else {
          responseArr.push('white')
        }
      } else {
          responseArr.push('none');
      }
    }
    return responseArr; 
  }
 
  shuffleArray(arr) {
    let i = arr.length;
    while(--i > 0) {
      let j = Math.floor(Math.random() * (i + 1));
      // destructuring assignment
      [arr[j], arr[i]] = [arr[i], arr[j]]; 
      // verbose assignment
      /*
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
      */
    }
    return arr;
  }
  resetGame() {
    this.setState({
      solutionArr: [],
      currGuess: {},
      turns:[]
    });
    this.setSolutionArr();
  }
 
  componentDidMount() {
    this.setSolutionArr();
  }
 
  render() {
    return (
      <div className="game">
        <h1>Mastermind</h1>
        <button onClick={this.resetGame}>New Game</button>
        {/*this.state.solutionArr.map(function(color,i) {
          //return <li key={i}>{color}</li>
        })*/}
        <TurnsHistory turns={this.state.turns} />
        <br />
        <form onSubmit={this.submitGuess}>
          {this.buildGuessOptions()}
          <div style={{marginTop:"20px"}}>
            <button>Submit Guess</button>
          </div>
        </form>
      </div>
    );
  }
}
 