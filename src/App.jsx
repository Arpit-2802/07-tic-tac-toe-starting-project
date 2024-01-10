import {useState} from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log';
import {WINNING_COMBINATIONS} from './winning-combinations';
import GameOver from './components/GameOver';
function deriveActivePlayer(gameTurn){
      let currentPlayer='X';
      if(gameTurn.length>0 && gameTurn[0].player==='X')
        currentPlayer='O'
  
    return currentPlayer;
}

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];



function App() {
  
  const [gameTurn,setTurns]=useState([])
  //const[activePlayer,setActivePlayer]= useState('X');
  const [hasWinner,setHasWinner]=useState(false)

  const activePlayer=deriveActivePlayer(gameTurn)

  let gameBoard=[...initialGameBoard.map(array=>[...array])];
    
    for(const turn of gameTurn)
    {
        const {square,player}=turn;
        const {row,col}=square;

        gameBoard[row][col]=player;
    }

  let winner;
  for(const combinations of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol=gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol=gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareSymbol=gameBoard[combinations[2].row][combinations[2].column]
    
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
        winner=firstSquareSymbol
    }
    
  }

  function handleRematch()
  {
    setTurns([]);
  }
  const hasDraw= gameTurn.length===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex)
  {
    // setActivePlayer((currentPlayer)=> currentPlayer==='X'? 'O': 'X');
    setTurns(prevTurn => {
    
    const currentPlayer=deriveActivePlayer(prevTurn)
    const updateTurns=[{square: {row:rowIndex, col:colIndex}, player: currentPlayer},...prevTurn]
    return updateTurns;
    })
  }

  return (
    <main>
      <div id="game-container">

        <ol id="players" className="highlight-player">
          <Player initialName='Player1' symbol='X' isActive={activePlayer==='X'}></Player>
          <Player initialName='Player2' symbol='O' isActive={activePlayer==='O'}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
