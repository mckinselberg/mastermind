import React, {Component} from 'react';
import TurnsHistory from './TurnsHistory.js';
import './App.css';
 
export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solutionArr: [],
      currguess: {},
      turns:[]
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
  }
  returnColors() {
    return ['purple','green','blue','orange','yellow','pink']
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
    for (let i = 0; i <= 3; i++) {
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
        <select name={i} key={i} onChange={this.handleGuessOptionChange} className={this.state.currguess[i]}>
          <option></option>
          <option value="none">none</option>
          {colors.map(function(color,i) {
            return <option className={color} key={i} value={color}>{color}</option>
          })}
        </select>
      )
    }
    return guessOpts;
  }
  handleGuessOptionChange(e) {
    let selectName = e.target.getAttribute('name');
    let currguessState = this.state.currguess;
    //console.log(currguessState);
    //record the guess as an object in state
    this.setState({
      currguess:{
        ...currguessState,
        ...{[selectName] : e.target.value}
      }
    })
  }
  submitGuess(e) {
    e.preventDefault();
 
    if (Object.keys(this.state.currguess).length < 4) {
      alert('Please select 4 colors');
    } else {
      //convert guess object to an array
      let guessArrFromObj = Object.values(this.state.currguess);
      let answerArr = this.compareArrays(this.state.solutionArr,guessArrFromObj);
      let shuffledAnswer = this.shuffleArray(answerArr);
      let turnNo = Object.keys(this.state.turns).length || 0;
      let currTurn = {
        no: turnNo,
        guess: guessArrFromObj,
        answer: shuffledAnswer
      };
      // turn object
      /*
      let turnObj = {
        no:1,
        guess: [],
        answer: []
        
      }*/
      if (shuffledAnswer === ['red','red','red','red']) {
        alert(`yay! You won in ${currTurn.no + 1} turn${currTurn.no === 0 ? '' : 's'}!`)
      }
      this.setState({
        turns:[
          ...this.state.turns,
          currTurn
        ]
      });
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
  
 
  componentDidMount() {
    this.setSolutionArr();
  }
 
  render() {
    return (
      <div className="game">
        <button onClick={this.setSolutionArr}>New Game</button>
        <br />
        <br />
        {this.state.solutionArr.map(function(color,i) {
          //return <li key={i}>{color}</li>
        })}
        <br />
        <br />
        <TurnsHistory turns={this.state.turns} />
        <br />
        <form onSubmit={this.submitGuess}>
        {this.buildGuessOptions()}
        <br />
        <br />
        <button>submit guess</button>
        </form>
      </div>
    );
  }
}