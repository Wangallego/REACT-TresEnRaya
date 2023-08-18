import './App.css'
import './index.css'
import { useState } from 'react'

const TURNS = {
  x : 'x',
  o : 'o'
}

const Square = ({ children , isSelected , updateBoard, index }) => {
  const className = `square ${isSelected ?  'is-selected': ''}`;

  const handleClick = () => {
    updateBoard(index)
  }
  //Aqui no ejecutamos la funcion en el onclick porque queremos que se ejecute en el momento que le indicamos, si la pasaramos como una ejecución se ejecutaria 9 veces.
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS =[  
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  //Null no hay ganador, false empate
  const [winner,setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    //revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        boardToCheck[a] && //0 -> x u o
        boardToCheck[a] === boardToCheck[b] && // Compara si el index es el 
        boardToCheck[a] === boardToCheck[c] // el mismo el los tres
      ){
        return boardToCheck[a] //esto nos deberia devolver x u o
      }
    }// en caso de empate devolver null
    return null
  }
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
      setWinner(newWinner)
    }// TODO:Comprobar si el juego a terminado
  }



  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
        board.map(( _ , index ) =>{
          return (
            <Square 
            key = {index}//Identificador unico
            index = {index}
            updateBoard={updateBoard}
            >
              {board[index]}
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
        winner != null && (  
          <section className="winner">
            <div className='text'>
              <h2>
                {
                  winner === false 
                  ? 'Empate' 
                  : 'Gano:'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section> 
        )
      }

    </main>
  ) 
}

export default App