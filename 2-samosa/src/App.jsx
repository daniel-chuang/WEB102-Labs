import './App.css';
import { useState } from 'react';

const App = () => {

  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Updates the count of the amount of samosas we currently have
  const updateCount = () => setCount(count + multiplier);

  const buyDoubleStuffed = () => {
    if (count >= 10) {
      setMultiplier(multiplier * 2);
      setCount(count - 10);
    }
  }

  const buyPartyPack = () => {
    if (count >= 100) {
      setMultiplier(multiplier * 5);
      setCount(count - 100);
    }
  }

  const buyFullFeast = () => {
    if (count >= 1000) {
      setMultiplier(multiplier * 10);
      setCount(count - 1000);
    }
  }

  return (
    <div className="App">
      <h1>Samosa Clicker</h1>
      <h2>Count: {count}</h2>
      <h3>Multiplier: {multiplier}</h3>
      <img src="/src/assets/samosa.png" className = "samosa hover:cursor-pointer hover:scale-[1.1] active:scale-[0.95]" onClick={updateCount}></img>

      <div className = "container flex mt-[50px]">
        <div className = "upgrade rounded-[5px] border-[1px] border-solid border-[rgba(153, 153, 153, 0.497)] py-[20px] px-[10px] mr-[25px] w-[200px] leading-[50px]">
          <h3>Double Stuffed 👯‍♀️</h3>
          <p>2x per click</p>
          <button onClick={buyDoubleStuffed}>10 samosas</button>
        </div>
        <div className = "upgrade rounded-[5px] border-[1px] border-solid border-[rgba(153, 153, 153, 0.497)] py-[20px] px-[10px] mr-[25px] w-[200px] leading-[50px">
          <h3>Party Pack 🎉</h3>
          <p>5x per click</p>
          <button onClick={buyPartyPack}>100 samosas</button>
        </div>
        <div className = "upgrade rounded-[5px] border-[1px] border-solid border-[rgba(153, 153, 153, 0.497)] py-[20px] px-[10px] mr-[25px] w-[200px] leading-[50px]">
          <h3>Full Feast 👩🏽‍🍳</h3>
          <p>10x per click</p>
          <button onClick={buyFullFeast}>1000 samosas</button>
        </div>
      </div>
    </div>
  )
}

export default App