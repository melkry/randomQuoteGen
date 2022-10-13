import "./randomQuote.css";
import React, { useEffect } from "react";
import { getQuotes } from "./randomQuoteSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectQuotesStatus } from "./randomQuoteSlice";
import { setSelectedQuote } from "./randomQuoteSlice";
import { selectQuote } from "./randomQuoteSlice";

export const RandomQuote = () => {
  const dispatch = useDispatch();
  const quote = useSelector(selectQuote);
  const { isLoading, isError } = useSelector(selectQuotesStatus);

  useEffect(() => {
    dispatch(getQuotes());
  }, [dispatch]);

  const getRandomQuote = () => {
    const randomNum = Math.floor(Math.random() * 200);
    dispatch(setSelectedQuote(randomNum));
  };

  return (
    <div id="quote-box">
      {isLoading ? <p>Loading</p> : null}
      {isError ? <p>Error!</p> : null}
      <h2 id="text">{quote.text}</h2>
      <h3 id="author">- {quote.author ? quote.author : "Unknown"}</h3>
      <div id="links">
        <a href="twitter.com/intent/tweet" id="tweet-quote">
          <img
            alt="twitter"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/292px-Twitter-logo.svg.png"
          />
        </a>
        <p onClick={getRandomQuote} id="new-quote">
          Random Quote
        </p>
      </div>
    </div>
  );
};
