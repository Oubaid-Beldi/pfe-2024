import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { emailService } from "./emailService";
import { toast } from "react-toastify";
const initialState = {
  sendingEmail: false,
  emailSend: false,
  msg: "",
};
// Send Automated Email
export const sendAutomatedEmail = createAsyncThunk(
  "email/sendAutomatedEmail",
  async (userData, thunkAPI) => {
    try {
      return await emailService.sendAutomatedEmail(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state) {
      state.sendingEmail = false;
      state.emailSend = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Autmated email
      .addCase(sendAutomatedEmail.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
        state.sendingEmail = false;
        state.emailSend = true;
        state.msg = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendAutomatedEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSend = false;
        state.msg = action.payload;
        toast.error(action.payload);
      });
  },
});
export const { EMAIL_RESET } = emailSlice.actions;
export default emailSlice.reducer;
