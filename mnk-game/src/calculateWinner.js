export function calculateWinner(squares, size, target) {
  const lines = [];

  // horizontal
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - target; col++) {
      lines.push(
        Array.from({ length: target }, (_, i) => row * size + col + i)
      );
    }
  }

  // vertical
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - target; row++) {
      lines.push(
        Array.from({ length: target }, (_, i) => (row + i) * size + col)
      );
    }
  }

  // diagonal (top-left to bottom-right)
  for (let row = 0; row <= size - target; row++) {
    for (let col = 0; col <= size - target; col++) {
      lines.push(
        Array.from({ length: target }, (_, i) => (row + i) * size + col + i)
      );
    }
  }

  // diagonal (top-right to bottom-left)
  for (let row = 0; row <= size - target; row++) {
    for (let col = size - 1; col >= target - 1; col--) {
      lines.push(
        Array.from({ length: target }, (_, i) => (row + i) * size + col - i)
      );
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [a, b, c, d, e] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d] &&
      squares[a] === squares[e]
    ) {
      return squares[a];
    }
  }

  return null;
}
