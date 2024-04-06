import React from 'react';
import { render, screen } from '@testing-library/react';
import Sum from './Sum';

describe('Sum', () => {
  test('renders sum of 2 numbers', () => {
    render(<Sum num1={10} num2={2} />);
    const numbers = screen.getByText(/Numbers → \(10, 2\)/);
    expect(numbers).toBeInTheDocument();
    const sum = screen.getByText(/10 \+ 2 = 12/);
    expect(sum).toBeInTheDocument();
  });

  test('throw error with unsafe sum', () => {
    const expectedError = `Sum of ${Number.MAX_SAFE_INTEGER} and 1 is not safe.`;
    const oldError = console.error;
    console.error = (msg: string) => {
      if (!msg.includes(expectedError) && !msg.includes('Consider adding an error boundary')) {
        oldError(msg);
      }
    }
    expect(() => render(<Sum num1={Number.MAX_SAFE_INTEGER} num2={1} />))
      .toThrow(expectedError);
    console.error = oldError;
  });
});
