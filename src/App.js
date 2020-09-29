import React, { useImperativeHandle } from 'react'
import './App.css'

function ListItem(props) {
  return (
  <li
  className={"card "+props.face}
  onClick={ (e) => props.handleClickCard(props.id, e)}
  >
  {props.num}
  </li>
  )
}

function CardList(props) {
  const listItems = props.arrCards.map( cardObj => {
    return (
      <ListItem
      key={cardObj.id.toString()}
      num={cardObj.num}
      face={cardObj.face}
      id={cardObj.id}
      handleClickCard={props.handleClickCard}
      />
    )
  })

  return (
    <ul className="wrapper">
      {listItems}
    </ul>
  )
}

class MemoryGame extends React.Component {
  constructor() {
    super()

    this.state = {
      currentPlayer: 1,
      playerScores: {player1: 0, player2: 0},
      arrCards: initializeCards(),
      frontCards: []
    }

    function initializeCards() {
      /* sample card objects */
      const arrCards = []    
      for (let i=1; i<=10; i++) {
        arrCards.push({id: i, face: "backCard", num: i<=5 ? i : i-5})
      }
      return arrCards
    }
  }
  
  handleClickCard = (id, e) => {
    console.log("the clicked element: ", e.target)
    console.log("the clicked element's id: ", id)
    
    /* Testing memo */
    /* the numbers on the cards are removed from the elements?(not transparency) */

    /* Is it restrected to reverse the already reversed cards ? */
    if(this.state.frontCards.includes(id)) {
      return
    }
    
    /* Is it restrected to reverse more cards than two? */
    if (this.state.frontCards.length === 2) {
      return
    }

    /* find the card object which has the same id*/
    const arrCards = this.state.arrCards.slice()    
    
    for(let idx = 0; idx< arrCards.length; idx++) {
      if (arrCards[idx].id === id) {
        arrCards[idx].face = "frontCard"
      }
    }
    
    this.setState({
      arrCards: arrCards,
      frontCards: this.state.frontCards.concat([id])
    })
  }

  componentDidUpdate() {
    /* check if two front cards exist, after updating frontCards by setState in handleClickCard */
    if (this.state.frontCards.length === 2) {
      const timerId = setTimeout( () => {
        const arrCards = this.state.arrCards.slice()
        const [firstCard, secondCard] = this.state.frontCards
        const { playerScores } =  { ...this.state }
        const nextState = {}

        if (arrCards[firstCard-1].num === arrCards[secondCard-1].num){
          arrCards[firstCard-1].face = "removedCard"
          arrCards[secondCard-1].face = "removedCard"
          this.state.currentPlayer === 1 ?
            playerScores.player1 += 20 :
            playerScores.player2 += 20

          nextState.playerScores = playerScores
        } else {
        /* return over the front to back*/
        /* be sure that at this time the order of a cards list are never arranged so id and idx have relationship, id starts from 1, idx starts from 0 */
        arrCards[firstCard-1].face = "backCard"
        arrCards[secondCard-1].face = "backCard"
        nextState.currentPlayer = this.state.currentPlayer === 1 ? 2 : 1
        }

      nextState.arrCards = arrCards
      nextState.frontCards =  []

      this.setState(nextState)

      }, 1000)
    }
    }

  render () {

    const gameEnd = this.state.arrCards.every(
      card => card.face === "removedCard")

    const {player1: p1score, player2: p2score} = { ...this.state.playerScores }
    const winner = p1score > p2score ? "player 1" : "player 2"

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="cards">
        <CardList
          arrCards={this.state.arrCards}
          handleClickCard={this.handleClickCard}
          />
      </div>
      { gameEnd && <div><h1>Game End</h1><h2>Winner: {winner}</h2></div>}
      <div>
        CURRENT TURN: player {this.state.currentPlayer}
      </div>
      <div>
        <div>
          player 1, score: {this.state.playerScores.player1}
        </div>
        <div>
          player 2, score: {this.state.playerScores.player2}
        </div>
      </div>
      <div>
      <button>Start</button>
      <button>Reset</button>
      </div>
    </div>
  )
  }
}


function App() {
  return <MemoryGame />
}

export default App


/* import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          dit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */