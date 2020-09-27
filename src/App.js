import React, { useImperativeHandle } from 'react'
import './App.css'

function ListItem(props) {
  return (
  <li
  className={"card "+props.face}  
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
      currentTurn: 1,
      arrCards: initializeCards(),
    }

    function initializeCards() {
      /* sample card objects */
      const arrCards = []    
      for (let i=1; i<=10; i++) {
        arrCards.push({id: i, face: "frontCard", num: i<=5 ? i : i-5})
      }
      return arrCards
    }
  }
  
  render () {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="cards">
        <CardList
          arrCards={this.state.arrCards}
          />
      </div>
      <div>
        CURRENT TURN: player {this.state.currentTurn}
      </div>
      <div>
        <div>
          player 1, score: ?                    
        </div>
        <div>
          player 2, score: ?
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