export const Square = ({ children , isSelected , updateBoard, index }) => {
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