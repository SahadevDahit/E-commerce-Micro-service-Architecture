import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusinessState {
  name: string;
  businessEmail: string;
  website: string;
  address: string;
  contact: string;
  panNumber: string;
  description: string;
  logoUrl: string;
}

const initialState: BusinessState = {
  name: "",
  businessEmail: "",
  website: "",
  address: "",
  contact: "",
  panNumber: "",
  description: "",
  logoUrl: "",
};

const businessInfoSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    updateBusinessField: (state, action: PayloadAction<BusinessState>) => {
      return { ...state, ...action.payload };
    }
}});

export const { updateBusinessField } = businessInfoSlice.actions;
export default businessInfoSlice.reducer;
