// notifySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotifySliceState {
  notifyMessage: string;
  modalShow: boolean;
}

const initialState: NotifySliceState = {
  notifyMessage: '',
  modalShow: false,
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotifyMessage: (state, action: PayloadAction<string>) => {
      state.notifyMessage = action.payload;
    },
    setModalShow: (state, action: PayloadAction<boolean>) => {
      state.modalShow = action.payload;
    },
  },
});

export const { setNotifyMessage, setModalShow } = notifySlice.actions;
export default notifySlice.reducer;
