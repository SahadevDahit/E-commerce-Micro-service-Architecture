import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippingAddressState {
  _id: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  streetName: string;
}

const initialState: ShippingAddressState = {
  _id: "",
  country: "Nepal",
  province: "",
  city: "",
  zipCode: "",
  streetName: "",
};

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    setShippingAddress: (
      state,
      action: PayloadAction<Partial<ShippingAddressState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setShippingAddress } = shippingAddressSlice.actions;

export default shippingAddressSlice.reducer;
