import { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");
  const [rates, setRates] = useState({});

  // Load ALL currencies once
  useEffect(() => {
    axios.get("https://api.fxratesapi.com/latest").then((res) => {
      setRates(res.data.rates);
    });
  }, []);

  const convert = () => {
    if (!rates[to] || !rates[from]) return;

    const usdValue = amount / rates[from];
    const converted = usdValue * rates[to];

    setResult(converted.toFixed(2));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>💱 Currency Converter</h1>
        <p>Live rates for 100+ countries</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <div className="row">
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(rates).map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <button onClick={swap} className="swap">
            ⇄
          </button>

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(rates).map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <button onClick={convert} className="btn">
          Convert Now
        </button>

        {result && (
          <div className="result">
            {amount} {from} = <b>{result}</b> {to}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;