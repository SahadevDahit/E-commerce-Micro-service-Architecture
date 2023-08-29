// slices/signupSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpState {
  business: boolean;
  userName: string;
  role: string;
  email: string;
  phoneNo: number;
  password: string;
  confirmPassword: string;
  gender: string;
  dob: string;
  profileImage: string;
}

const initialState: SignUpState = {
  business: false,
  userName: "",
  role: "customer",
  email: "",
  phoneNo: 98,
  password: "",
  confirmPassword: "",
  gender: "male",
  dob: "",
  profileImage: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setBusiness: (state, action: PayloadAction<boolean>) => {
      state.business = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhoneNo: (state, action: PayloadAction<number>) => {
      state.phoneNo = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setDob: (state, action: PayloadAction<string>) => {
      state.dob = action.payload;
    },
    setProfile: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
});

export const {
  setBusiness,
  setUserName,
  setRole,
  setEmail,
  setPhoneNo,
  setPassword,
  setConfirmPassword,
  setGender,
  setDob,
  setProfile,
} = signupSlice.actions;

export default signupSlice.reducer;
