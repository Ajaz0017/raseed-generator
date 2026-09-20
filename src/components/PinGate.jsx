import { useState } from 'react';
import { PIN } from '../constants';

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (pin === PIN) {
      setError('');
      onUnlock();
    } else {
      setError('Galat PIN, dobara try karein.');
      setPin('');
    }
  }

  return (
    <div className="pin-gate">
      <form className="card pin-card" onSubmit={handleSubmit}>
        <h1>Bill Generator</h1>
        <p>Continue karne ke liye PIN daalein</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
        />
        {error && <p className="pin-error">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block">
          Unlock
        </button>
      </form>
    </div>
  );
}
