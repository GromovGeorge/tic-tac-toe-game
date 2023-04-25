import { BoardType } from 'components/Game'

type GetWinnerType = (board: BoardType) => string | null
type BestMovesType = Array<[number, number]>
type ReturnType = [number, number]

export const getBestMoves = (
  board: BoardType,
  nextMove: string,
  getWinner: GetWinnerType
): ReturnType => {
  const bestMoves: BestMovesType = []

  // Check For Winning Moves
  board.forEach((row, rowIdx) =>
    row.map((col, colIdx) => {
      if (!board[rowIdx][colIdx]) {
        const clonedBoard = board.map((r) => [...r])
        clonedBoard[rowIdx][colIdx] = nextMove
        if (getWinner(clonedBoard) === nextMove) {
          bestMoves.unshift([rowIdx, colIdx])
        }
      }
    })
  )

  // Opponent Moves
  const opponent = nextMove === 'X' ? 'O' : 'X'

  board.some((row, rowIdx) =>
    row.some((col, colIdx) => {
      if (!board[rowIdx][colIdx]) {
        const clonedBoard = board.map((r) => [...r])

        clonedBoard[rowIdx][colIdx] = opponent
        if (getWinner(clonedBoard) === opponent) {
          bestMoves.push([rowIdx, colIdx])
          return true
        }
        return false
      }
    })
  )

  if (bestMoves.length > 0) {
    return bestMoves[0]
  }

  // Center Cell Move

  if (!board[1][1]) {
    return [1, 1]
  }

  // Random Move
  const emptyCells: BestMovesType = []

  board.forEach((row, rowIdx) =>
    row.forEach((col, colIdx) => {
      if (!board[rowIdx][colIdx]) {
        emptyCells.push([rowIdx, colIdx])
      }
    })
  )

  const randomMove = Math.floor(Math.random() * emptyCells.length)
  return emptyCells[randomMove]
}
