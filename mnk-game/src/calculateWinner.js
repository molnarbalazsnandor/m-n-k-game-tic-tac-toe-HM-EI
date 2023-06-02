export function calculateWinner(squares, size, goal) {
  const lines = [];

  // Horizontal
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - goal; col++) {
      const line = [];
      for (let i = 0; i < goal; i++) {
        line.push(row * size + col + i);
      }
      lines.push(line);
    }
  }

  // Vertical
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - goal; row++) {
      const line = [];
      for (let i = 0; i < goal; i++) {
        line.push((row + i) * size + col);
      }
      lines.push(line);
    }
  }

  // Diagonal (top-left to bottom-right)
  for (let row = 0; row <= size - goal; row++) {
    for (let col = 0; col <= size - goal; col++) {
      const line = [];
      for (let i = 0; i < goal; i++) {
        line.push((row + i) * size + col + i);
      }
      lines.push(line);
    }
  }

  // Diagonal (top-right to bottom-left)
  for (let row = 0; row <= size - goal; row++) {
    for (let col = size - 1; col >= goal - 1; col--) {
      const line = [];
      for (let i = 0; i < goal; i++) {
        line.push((row + i) * size + col - i);
      }
      lines.push(line);
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
