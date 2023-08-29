import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookState {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  isbn: string;
  paperback: boolean;
  noOfPage:number;
  language: string;
}

const initialState: BookState = {
  id: "",
  title: "",
  author: "",
  publisher: "",
  edition: "",
  isbn: "",
  paperback: false,
  noOfPage:0,
  language: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<BookState>) => {
      return { ...state, ...action.payload };
    },
    clearBook: () => {
      return initialState;
    },
    resetBookState: () => initialState,
     setBooks: (state, action: PayloadAction<BookState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setBook, clearBook,resetBookState,setBooks } = bookSlice.actions;

export default bookSlice.reducer;
