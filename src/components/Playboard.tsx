import { BoardType } from './Game'

interface PlayboardProps {
  board: BoardType
  handleMoveOnClick: (row: number, col: number) => void
}

const Playboard = ({ board, handleMoveOnClick }: PlayboardProps) => {
  return (
    <>
      <div className='flex flex-col border-[1px] border-solid border-gray-400'>
        {board.map((row, rowIdx) => (
          <div className='flex' key={rowIdx}>
            {row.map((cell, cellIdx) => (
              <button
                className={`w-[120px] h-[120px] border-[1px] border-solid border-gray-400 text-center align-middle text-5xl font-bold ${
                  cell === 'X'
                    ? `bg-orange-400 text-white`
                    : cell === 'O'
                    ? `bg-green-400 text-white`
                    : ''
                }`}
                onClick={() => handleMoveOnClick(rowIdx, cellIdx)}
                key={cellIdx}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
export default Playboard
