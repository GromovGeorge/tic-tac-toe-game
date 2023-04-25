import { useState } from 'react'
import Playboard from './Playboard'
import { getWinner } from 'utils/getWinner'
import { getBestMoves } from 'utils/getBestMoves'

export type BoardType = Array<Array<string | null>>

const Game = () => {
  const initialBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => null)
  )

  const [board, setBoard] = useState<BoardType>(initialBoard)
  const [player, setPlayer] = useState('X')
  const [winner, setWinner] = useState<string | null>(null)
  const [isDraw, setIsDraw] = useState(false)

  const handleMoveOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return
    }

    //
    const updPlayerBoard = board.map((newRow, rowIdx) =>
      newRow.map((cell, cellIdx) =>
        rowIdx === row && cellIdx === col ? player : cell
      )
    )

    // Pick A Winner
    setBoard(updPlayerBoard)
    const resWinner = getWinner(updPlayerBoard)
    setWinner(resWinner)
    setPlayer('X')

    // Game Draw
    const draw = updPlayerBoard.some((row) => row.some((cell) => cell === null))

    if (!winner && !draw) {
      setIsDraw(true)
      return
    }

    // Computer's Move
    if (!resWinner) {
      const nextMove = player === 'X' ? 'O' : 'X'

      const bestMove = getBestMoves(updPlayerBoard, nextMove, getWinner)

      setTimeout(() => {
        const computerBoard = updPlayerBoard.map((r, rIdx) =>
          r.map((c, cIdx) =>
            rIdx === bestMove?.[0] && cIdx === bestMove[1] ? nextMove : c
          )
        )
        setBoard(computerBoard)
        setWinner(getWinner(computerBoard))
      }, 500)
    }
  }

  // New Game
  const newGame = () => {
    setBoard(initialBoard)
    setPlayer('X')
    setWinner(null)
    setIsDraw(false)
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-[60px] text-center my-8'>Tic Tac Toe Game</h1>

        <div className='flex justify-center mb-8'>
          <Playboard board={board} handleMoveOnClick={handleMoveOnClick} />
        </div>

        {winner && (
          <p>
            {winner === 'X' ? (
              <p className='text-xl text-green-400 text-center'>You Win! 😄</p>
            ) : (
              <p className='text-xl text-red-400 text-center'>You Lost! 😕 </p>
            )}
          </p>
        )}

        {isDraw && <p className='text-xl text-center'>Game Draw! 🤝 </p>}

        <button
          className=' w-[360px] h-[48px] mt-8 border-[1px] border-solid border-gray-400 transition-all hover:border-black'
          type='button'
          onClick={() => newGame()}
        >
          New Game
        </button>
      </div>
    </>
  )
}
export default Game
