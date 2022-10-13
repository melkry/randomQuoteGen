import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getQuotes = createAsyncThunk(
  "randomQuote/getQuotes",
  async (thunkAPI) => {
    const response = await fetch("https://type.fit/api/quotes").then((data) =>
      data.json()
    );
    console.log(response);
    return response;
  }
);

export const randomQuoteSlice = createSlice({
  name: "randomQuote",
  initialState: {
    isLoading: false,
    isError: false,
    quotes: [],
    selectedQuote: {}
  },
  reducers: {
    setSelectedQuote: (state, action) => {
      state.selectedQuote = state.quotes[action.payload];
    }
  },
  extraReducers: {
    [getQuotes.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getQuotes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.quotes = action.payload.map((x) => ({
        text: x.text,
        author: x.author
      }));
      state.selectedQuote = state.quotes[Math.floor(Math.random() * 200)];
    },
    [getQuotes.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const selectQuotes = (state) => state.randomQuote.quotes;
export const selectQuotesStatus = (state) => ({
  isLoading: state.randomQuote.isLoading,
  isError: state.randomQuote.isError
});
export const setSelectedQuote = randomQuoteSlice.actions.setSelectedQuote;
export const selectQuote = (state) => state.randomQuote.selectedQuote;

export default randomQuoteSlice.reducer;
