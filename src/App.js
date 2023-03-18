// Import Libraries
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

// Import Style Sheets
import './App.css';

// Import Components
import Die from './components/Die.js'

function App() {

  // State (Regular Javascript data type)
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })



  // Initialize state
  function allNewDice(){
    
    let diceArray = []

    for(let i=0; i < 10; i++){
      let randNum = getRandomNumber()
      diceArray.push({
         value: randNum, 
         isHeld: false,
         id: nanoid()    // Gave a unique id to each javascript object before it got changed to a JSX element
      })
    }

    return diceArray
  }


  // Map Data to JSX elements
  const diceElements = dice.map( (dieObject) => {
    return <Die
              key={dieObject.id}
              id = {dieObject.id}
              value={dieObject.value}
              isHeld={dieObject.isHeld}
              holdDieFace={() => holdDieFace(dieObject.id)}
            />
  })
  


  // Event Handler
  function rollDice(){
    if(tenzies){
      setDice(allNewDice)
      setTenzies(false)
    }
    else{
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : {...die, id: nanoid(), value: getRandomNumber()}
      }))
    }
  }

  function holdDieFace(id){
    console.log("Held die face", id)
    // We are dealing with the Javascript array of objects. The plain state
    // Loop through all the objects in the array. If 
    setDice(prevDice => prevDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  
  // Helper function
  function getRandomNumber(){
    return Math.ceil(Math.random() * 6)
  }
  
  // Use Effect
  useEffect( () => {
    console.log("Dice state changed")

    // Check if all dice are held
    const allDiceHeld = dice.every(die => die.isHeld)

    // Check if they all have the same value
    const allHaveSameValue = dice.every(die => die.value === dice[0].value)
    

    if(allDiceHeld && allHaveSameValue)
    {
      setTenzies(true)
      console.log("You won")
    }

    function handleResize(){
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [dice])


  return (
    <>
      {tenzies && <Confetti width={windowSize.width} height={windowSize.height}/>}
      <main className="main">
          
          <h1 className='game-header'>Tenzies</h1>
          <p className='game-info'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

          <div className='grid-container'>
            {diceElements}
          </div>

          <button className='button' onClick={rollDice}>{ tenzies ? 'New Game' : 'Roll'}</button>    
      </main>
    </>
    
  );
}

export default App;
