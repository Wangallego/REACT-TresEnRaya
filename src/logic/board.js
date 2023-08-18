import { WINNER_COMBOS } from "../component/constants"

export const checkWinner = (boardToCheck) =>{
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

  export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate
    //si no hay mas espacios vacios
    //en el tablero
    return newBoard.every((square) => square != null)
  }