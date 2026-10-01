/**
 * Guess result for a single column.
 * Correct = green guess
 * Incorrect = gray guess
 * Maybe = yellow guess
 */
export enum GuessStatus {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  MAYBE = 'maybe',
}

/**
 * Guess result for a "numeric" column. Should be combined with GuessStatus
 */
export enum GuessStatusDetail {
  UP = 'up',
  DOWN = 'down',
  UNKNOWN = 'unknown'
}
