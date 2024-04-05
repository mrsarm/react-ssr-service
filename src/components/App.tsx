import React from 'react';
import logo from './logo.svg';
import Sum from './Sum';

function App({ num1, num2 } : {num1: number, num2: number}) {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" style={{ width: "100px" }} />
      <Sum num1={num1} num2={num2} />
    </div>
  );
}

export default App;
