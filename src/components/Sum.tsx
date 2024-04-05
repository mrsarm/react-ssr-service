import React from 'react';

function Sum({ num1, num2 } : {num1: number, num2: number}) {
  const sum = safeSum(num1, num2);
  if (!sum) {
    throw new Error(`Sum of ${num1} and ${num2} is not safe.`);
  }
  return (
    <div className="sum">
      <h1>Sum</h1>
      <p>Numbers → ({num1}, {num2})</p>
      <p><strong>{num1} + {num2} = {sum}</strong></p>
    </div>
  );
}

function safeSum(num1: number, num2: number): number | null {
    const sum: number = num1 + num2;
    return sum <= Number.MAX_SAFE_INTEGER && sum >= Number.MIN_SAFE_INTEGER ? sum : null;
}

export default Sum;
