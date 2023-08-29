import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConsumerElectronicsState {
  id: string;
  sound: string;
  battery: string;
  storage: string;
  chipset: string;
  processor: string;
  camera: string;
  connectivity: string;
  display: string;
  operatingSystem: string;
}
// Define the initial state using the interface
const initialState: ConsumerElectronicsState = {
  id: "",
  sound: "",
  battery: "",
  storage: "",
  chipset: "",
  processor: "",
  camera: "",
  connectivity: "",
  display: "",
  operatingSystem: "",
};

// Create the slice
const consumerElectronicsSlice = createSlice({
  name: "consumerElectronics",
  initialState,
  reducers: {
    setConsumerElectronicsState: (
      state,
      action: PayloadAction<ConsumerElectronicsState>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetConsumerElectronicsState: () => initialState,
     setconsumerElectronics: (state, action: PayloadAction<ConsumerElectronicsState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Export the actions and reducer
export const { setConsumerElectronicsState, resetConsumerElectronicsState,setconsumerElectronics } =
  consumerElectronicsSlice.actions;
export default consumerElectronicsSlice.reducer;
