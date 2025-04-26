import { createSlice } from "@reduxjs/toolkit";
import { CreateApiAsyncThunk } from "../CreateApiAsyncThunk/CreateApiAsyncThunk";
import { api } from "../api/api";

const initialState = {
  ticketStatsData: [],
  allTickets: [],
  tickets: [],
  totalPages: null,
  isLoading: {},
  error: {},
};

export const getInstructorTickets = CreateApiAsyncThunk(
  "GET/support/getInstructorTickets",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/ticket?${query}`);
  }
);

export const getAdminTickets = CreateApiAsyncThunk(
  "GET/support/getAdminTickets",
  (formData) => {
    const query = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    return api.get(`/ticket/admin/get?${query}`);
  }
);

export const getAllTickets = CreateApiAsyncThunk(
  "GET/support/getAllTickets",
  (isAdmin) => {
    return api.get(!isAdmin ? `/ticket` : `/ticket/admin/get`);
  }
);

export const contactUs = CreateApiAsyncThunk("contactUs", (data) =>
  api.post(`/contact`, data)
);
export const raiseTicket = CreateApiAsyncThunk("support/raiseTicket", (data) =>
  api.post(`/ticket`, data)
);
export const updateConversation = CreateApiAsyncThunk(
  "support/updateConversation",
  ({ id, data }) => api.post(`/ticket/addMessage/${id}`, data)
);

export const updateAdminConversation = CreateApiAsyncThunk(
  "support/updateAdminConversation",
  (data) => api.post(`/ticket/admin`, data)
);

export const updateTicketStatus = CreateApiAsyncThunk(
  "support/updateTicketStatus",
  (data) => api.post(`/ticket/admin/status?id=${data.id}&status=${data.status}`)
);

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    makeStatsData: (state, action) => {
      const tickets = state.allTickets;
      const data = [
        {
          name: "tatal",
          value: tickets?.length,
        },
        {
          name: "open",
          value: tickets?.filter((tic) => tic?.status === "open")?.length,
        },
        {
          name: "closed",
          value: tickets?.filter((tic) => tic?.status === "close")?.length,
        },
      ];
      state.ticketStatsData = data;
    },
    updateMessagesOfTicketLocally: (state, action) => {
      const { id, message } = action.payload;
      const ticket = state.tickets?.find((tic) => tic?._id === id);
      if (ticket) {
        ticket?.messages?.push(message);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstructorTickets.pending, (state) => {
        state.isLoading["getInstructorTickets"] = true;
      })
      .addCase(getInstructorTickets.fulfilled, (state, action) => {
        state.isLoading["getInstructorTickets"] = false;
        state.tickets = action.payload.data;
        state.totalPages = action.payload?.pagination?.totalPages;
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
        state.totalPages = action.payload?.pagination?.totalPages;
      })
      .addCase(getAdminTickets.rejected, (state, action) => {
        state.isLoading["getAdminTickets"] = false;
        state.isLoading["getAdminTickets"] = action.payload;
      })
      // raise ticket
      .addCase(raiseTicket.pending, (state) => {
        state.isLoading["raiseTicket"] = true;
      })
      .addCase(raiseTicket.fulfilled, (state, action) => {
        state.isLoading["raiseTicket"] = false;
        const ticket = action.payload?.data;
        if (ticket) {
          state.tickets = [...state.tickets, ticket];
        }
      })
      .addCase(raiseTicket.rejected, (state, action) => {
        state.isLoading["raiseTicket"] = false;
        state.isLoading["raiseTicket"] = action.payload;
      })
      .addCase(contactUs.pending, (state) => {
        state.isLoading["contactUs"] = true;
      })
      .addCase(contactUs.fulfilled, (state, action) => {
        state.isLoading["contactUs"] = false;
        
      })
      .addCase(contactUs.rejected, (state, action) => {
        state.isLoading["contactUs"] = false;
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
      })
      // update admin conversations in the ticket
      .addCase(updateAdminConversation.pending, (state) => {
        state.isLoading["updateAdminConversation"] = true;
      })
      .addCase(updateAdminConversation.fulfilled, (state) => {
        state.isLoading["updateAdminConversation"] = false;
      })
      .addCase(updateAdminConversation.rejected, (state, action) => {
        state.isLoading["updateAdminConversation"] = false;
        state.isLoading["updateAdminConversation"] = action.payload;
      })
      // gets all tickets
      .addCase(getAllTickets.pending, (state) => {
        state.isLoading["getAllTickets"] = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.isLoading["getAllTickets"] = false;
        state.allTickets = action.payload.data;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.isLoading["getAllTickets"] = false;
        state.isLoading["getAllTickets"] = action.payload;
      })
      // Update Ticket Status
      .addCase(updateTicketStatus.pending, (state) => {
        state.isLoading["updateTicketStatus"] = true;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.isLoading["updateTicketStatus"] = false;
        state.tickets = state.tickets.map((ticket) =>
          ticket?._id === action.payload?.data?._id
            ? action.payload?.data
            : ticket
        );
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.isLoading["updateTicketStatus"] = false;
        state.isLoading["updateTicketStatus"] = action.payload;
      });
  },
});

export const { makeStatsData, updateMessagesOfTicketLocally } = supportSlice.actions;
export default supportSlice.reducer;
