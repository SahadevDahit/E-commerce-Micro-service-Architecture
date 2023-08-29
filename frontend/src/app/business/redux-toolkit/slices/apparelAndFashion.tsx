import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConsumerElectronicsState {
  id: string;
  designFeatures: string[];
  fitStyle: string;
  sizes: string[];
}

const initialState: ConsumerElectronicsState = {
  id: "",
  designFeatures: [],
  fitStyle: "",
  sizes: [],
};

const consumerElectronicsSlice = createSlice({
  name: "consumerElectronics",
  initialState,
  reducers: {
    setConsumerElectronicsField: (
      state,
      action: PayloadAction<ConsumerElectronicsState>
    ) => {
      return { ...state, ...action.payload };
    },
    addDesignFeature: (state, action: PayloadAction<string>) => {
      const newFeature = action.payload;
      if (!state.designFeatures.includes(newFeature)) {
        state.designFeatures.push(newFeature);
      }
    },
    removeDesignFeature: (state, action: PayloadAction<number>) => {
      state.designFeatures.splice(action.payload, 1);
    },
    addSize: (state, action: PayloadAction<string>) => {
      const newSize = action.payload;
      if (!state.sizes.includes(newSize)) {
        state.sizes.push(newSize);
      }
    },
    removeSize: (state, action: PayloadAction<number>) => {
      state.sizes.splice(action.payload, 1);
    },
    resetapparelAndFashion: () => initialState,
     setapparelAndFashion: (state, action: PayloadAction<ConsumerElectronicsState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setConsumerElectronicsField,
  addDesignFeature,
  removeDesignFeature,
  addSize,
  removeSize,
  resetapparelAndFashion,
  setapparelAndFashion
} = consumerElectronicsSlice.actions;
export default consumerElectronicsSlice.reducer;
