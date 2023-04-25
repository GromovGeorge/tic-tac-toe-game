import { BoardType } from 'components/Game'

export const getWinner = (board: BoardType): string | null => {
  const winningCombos = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],

    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],

    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ]

  // Проверка
  for (const wc of winningCombos) {
    if (wc[0] && wc[0] === wc[1] && wc[1] === wc[2]) {
      return wc[0]
    }
  }

  return null
}
