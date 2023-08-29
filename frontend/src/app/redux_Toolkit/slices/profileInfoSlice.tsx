import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  name: string;
  gender: string;
  dob: string;
  profileImage: string;
  email: string;
  phoneNumber: number;
  role: string;
}

const initialState: ProfileState = {
  name: "",
  gender: "",
  dob: "",
  profileImage: "",
  email: "",
  phoneNumber: 0,
  role: "customer",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
