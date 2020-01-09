import React, {Component} from 'react';
 
export default class TurnsHistory extends Component {
  constructor(props) {
    super(props)
    this.buildTurnsHistory = this.buildTurnsHistory.bind(this);
  }
  buildTurnsHistory(turns){
    if (turns.length > 0) {
      turns.map(function(turn,i) {
        return (
        <ul>
          {turn.guess.map(function(guess,i) {
            console.log(guess);
            return <li className={guess} key={i}>{i}</li>
          })}
        </ul>
        )
      })
    } else {
      return null
    }
  }
 
  render(){
    //return this.buildTurnsHistory(this.props.turns)
    if (this.props.turns.length > 0) {
      return (
        this.props.turns.map(function(turn,i) {
          return (
            <div className="row" key={i}>
              <h2 key={`turn-${i}`}>{i+1}</h2>
              <ul key={`guess-${i}`} className="guesses">
                {turn.guess.map(function(guess,i) {
                  //console.log(guess);
                  return <li className={guess} key={i}>{guess}</li>
                })}
              </ul>
              <ul className="answer" key={`answer-${i}`}>
                {turn.answer.map(function(answer,i){
                  return <li className={answer} key={i}>{answer}</li>
                })}
              </ul>
            </div>
          );
        })
      );
    } else {
      return null
    }
  }
}