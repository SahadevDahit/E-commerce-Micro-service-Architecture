import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  id:string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  totalQty: number;
  totalSold: number;
  description: string;
  images: string;
  status: string;
  colors: string[];
}

const initialState: ProductState = {
  id:"",
  name: "",
  category: "",
  subCategory: "",
  brand: "",
  price: 0,
  status: "true",
  totalQty: 0,
  totalSold: 0,
  description: "",
  images: "",
  colors: ["red", "yellow"],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ name: string; value: any }>) => {
      const { name, value } = action.payload;
      if (name === "colors") {
        // Check if the value already exists in colors array
        if (state.colors.includes(value)) {
          return state; // Return current state without making any changes
        }
        // Merge the existing colors with the new value
        return {
          ...state,
          colors: [...state.colors, value],
        };
      }
      return {
        ...state,
        [name]: value,
      };
    },
    removeColor: (state, action: PayloadAction<string>) => {
      const colorToRemove = action.payload;
      return {
        ...state,
        colors: state.colors.filter((color) => color !== colorToRemove),
      };
    },
    resetProductState: (state) => {
      // Destructure and retain the desired fields from initialState
      const { category, subCategory, brand, ...retainedFields } = initialState;
      return {
        ...retainedFields,
        category: state.category,
        subCategory: state.subCategory,
        brand: state.brand,
      };
    },
    setProducts: (state, action: PayloadAction<ProductState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setField, removeColor, resetProductState, setProducts } =
  productSlice.actions;

export default productSlice.reducer;
