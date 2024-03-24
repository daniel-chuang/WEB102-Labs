import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinInfo(props) {
  // REACTIVES
  const [price, setPrice] = useState(null);

  // RENDERING AFTER UPDATE
  // Instead of running every render, only when the symbol we pass in changes
  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(
        // Note that here we are referencing symbol!
        `https://min-api.cryptocompare.com/data/price?fsym=${props.symbol}&tsyms=USD&api_key=` +
          API_KEY
      );
      const json = await response.json();
      setPrice(json);
    };

    getCoinPrice().catch(console.error);
  }, [props.symbol]);

  return (
    <div>
      {price ? ( // rendering only if API call actually returned us data
        <li className="main-list" key={props.symbol}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${props.image}`}
            alt={`Small icon for ${props.name} crypto coin`}
          />
          {props.name} <span className="tab"></span> ${price.USD} USD
        </li>
      ) : null}
    </div>
  );
}

export default CoinInfo;
