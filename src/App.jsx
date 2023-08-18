import './App.css'
import './index.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './component/Square'
import { WINNER_COMBOS, TURNS } from './component/constants'
import { checkWinner ,checkEndGame } from './logic/board'
import {WinnerModal } from './component/WinnerModal'


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  //Null no hay ganador, false empate
  const [winner,setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  
  const updateBoard =  (index) => {
    //no actualizamos esta posicion si ya contiene algo
    if(board[index] || winner) return
    // no se pueden mutar nunca las props ni los estados por eso hacemos una copia del board en vez de ejecutarlo en el mismo que ya tenemos. No modificar nunca sus valores.
    //Siempre hay que hacer la copia nueva para evitar problemas de renderizado, tanto en array como en objetos que quieras MODIFICAR

    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn //aqui se guarda el valor del turno x u o
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)//actualiza el estado
    //La actualizacion de los estados es asincrono
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false) //empate 
    }
  }



  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
        board.map((square , index ) =>{
          return (
            <Square 
            key = {index}//Identificador unico
            index = {index}
            updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        })
      }
      </section>
      <section className="turn">
        <Square isSelected = {turn === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected = {turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>
      {
        <WinnerModal resetGame={resetGame} winner={winner} />
      }

    </main>
  ) 
}

export default App