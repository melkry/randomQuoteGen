import { configureStore } from "@reduxjs/toolkit";
import randomQuoteReducer from "./components/randomQuote/randomQuoteSlice.js";

export const store = configureStore({
  reducer: {
    randomQuote: randomQuoteReducer
  }
});
