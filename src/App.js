import React from 'react'
import './App.css'

function ListItem(props) {
  return <li className="card frontCard">{props.value}</li>
}

function CardList(props) {
  const listItems = props.nums.map( num => {
    return <ListItem key={num.toString()} value={num} />
  })

  return (
    <ul className="wrapper">
      {listItems}
    </ul>
  )
}

function App() {
  const cardNumbers = [1,2,3,4,5,1,2,3,4,5]
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="cards">
        <CardList nums={cardNumbers}/>
{/*     
<ul className="wrapper">
    <li className="card backCard">{cardNumbers[0]}</li>
        <li className="card frontCard">{cardNumbers[1]}</li>
        <li className="card">{cardNumbers[2]}</li>
        <li className="card">{cardNumbers[3]}</li>
        <li className="card">{cardNumbers[4]}</li>
        <li className="card">{cardNumbers[5]}</li>
        <li className="card">{cardNumbers[6]}</li>
        <li className="card">{cardNumbers[7]}</li>
        <li className="card">{cardNumbers[8]}</li>
        <li className="card">{cardNumbers[9]}</li> 
                </ul>
                */}

      </div>
    </div>
  )
}

const classList = ["card", "frontCard", "backCard", "removedCard"]
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