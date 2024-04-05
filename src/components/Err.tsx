import React from 'react';

function Err({ msg } : { msg: string }) {
  const message = msg.endsWith('.') ? msg : `${msg}.`;

  return (
    <div className="error">
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
}

export default Err;
