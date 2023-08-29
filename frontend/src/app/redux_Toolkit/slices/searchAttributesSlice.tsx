import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchAttributes {
  productId:string;
  index:number;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  colors: string;
  minPrice: number;
  maxPrice: number;
  maxRange: number;
  refresh: boolean;
}

const initialState: SearchAttributes = {
  productId:"",
  index:0,
  name: "",
  category: "",
  subCategory: "",
  brand: "",
  colors: "",
  minPrice: 0,
  maxPrice: 0,
  maxRange:1000,
  refresh: false
};

const attributesSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<Partial<SearchAttributes>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setField } = attributesSlice.actions;

export default attributesSlice.reducer;
