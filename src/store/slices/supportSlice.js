import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

const initialState = {
  tickets: [],
  isLoading: {},
  error: {},
};

export const getInstructorTickets = CreateApiAsyncThunk(
  "GET/support/getInstructorTickets",
  () => api.get(`/ticket`)
);
export const getAdminTickets = CreateApiAsyncThunk(
  "GET/support/getAdminTickets",
  () => api.get(`/ticket/admin/get`)
);

export const getFilteredInstructorTickets = CreateApiAsyncThunk(
  "GET/support/getFilteredInstructorTickets",
  (status) => api.get(`/ticket/filter/${status}`)
);

export const raiseTicket = CreateApiAsyncThunk("support/raiseTicket", (data) =>
  api.post(`/ticket`, data)
);
export const updateConversation = CreateApiAsyncThunk(
  "support/updateConversation",
  ({ id, data }) => api.post(`/ticket/addMessage/${id}`, data)
);

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstructorTickets.pending, (state) => {
        state.isLoading["getInstructorTickets"] = true;
      })
      .addCase(getInstructorTickets.fulfilled, (state, action) => {
        state.isLoading["getInstructorTickets"] = false;
        state.tickets = action.payload.data;
      })
      .addCase(getInstructorTickets.rejected, (state, action) => {
        state.isLoading["getInstructorTickets"] = false;
        state.isLoading["getInstructorTickets"] = action.payload;
      })
      // admin gets all tickets
      .addCase(getAdminTickets.pending, (state) => {
        state.isLoading["getAdminTickets"] = true;
      })
      .addCase(getAdminTickets.fulfilled, (state, action) => {
        state.isLoading["getAdminTickets"] = false;
        state.tickets = action.payload.data;
      })
      .addCase(getAdminTickets.rejected, (state, action) => {
        state.isLoading["getAdminTickets"] = false;
        state.isLoading["getAdminTickets"] = action.payload;
      })
      // get filtered tickets
      .addCase(getFilteredInstructorTickets.pending, (state) => {
        state.isLoading["getFilteredInstructorTickets"] = true;
      })
      .addCase(getFilteredInstructorTickets.fulfilled, (state, action) => {
        state.isLoading["getFilteredInstructorTickets"] = false;
        state.instructorTickets = action.payload.data;
      })
      .addCase(getFilteredInstructorTickets.rejected, (state, action) => {
        state.isLoading["getFilteredInstructorTickets"] = false;
        state.isLoading["getFilteredInstructorTickets"] = action.payload;
      })
      // raise ticket
      .addCase(raiseTicket.pending, (state) => {
        state.isLoading["raiseTicket"] = true;
      })
      .addCase(raiseTicket.fulfilled, (state) => {
        state.isLoading["raiseTicket"] = false;
      })
      .addCase(raiseTicket.rejected, (state, action) => {
        state.isLoading["raiseTicket"] = false;
        state.isLoading["raiseTicket"] = action.payload;
      })
      // update conversations in the ticket
      .addCase(updateConversation.pending, (state) => {
        state.isLoading["updateConversation"] = true;
      })
      .addCase(updateConversation.fulfilled, (state) => {
        state.isLoading["updateConversation"] = false;
      })
      .addCase(updateConversation.rejected, (state, action) => {
        state.isLoading["updateConversation"] = false;
        state.isLoading["updateConversation"] = action.payload;
      });
  },
});

export default supportSlice.reducer;
