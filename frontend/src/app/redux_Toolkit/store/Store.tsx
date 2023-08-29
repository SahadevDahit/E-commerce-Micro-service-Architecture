import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "../slices/signUpSlice";
import businessInfoSlice from "../slices/businessInfoSlice";
import notifySlice from "../slices/notifySlice";
import profileInfoSlice from "../slices/profileInfoSlice";
import shippingAddress from "../slices/shippingAddressSlice";
import productSlice from "../../business/redux-toolkit/slices/productSlices";
import consumerElectronics from "../../business/redux-toolkit/slices/consumerElectronics";
import booksSlice from "../../business/redux-toolkit/slices/booksSlice";
import apparelAndFashion from "../../business/redux-toolkit/slices/apparelAndFashion";
import attributesSlice from "../slices/searchAttributesSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    signup: signUpSlice,
    businessInfo: businessInfoSlice,
    notify: notifySlice,
    profileInfo: profileInfoSlice,
    shippingAddress: shippingAddress,
    product: productSlice,
    books: booksSlice,
    consumerElectronics: consumerElectronics,
    apparelAndFashion: apparelAndFashion,
    searchAttributes: attributesSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
