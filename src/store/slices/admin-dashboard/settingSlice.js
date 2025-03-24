import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/store/api/api";

import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";

// Initial state
const initialState = {
  frontendSettings: {
    _id: null,
    logo: "",
    title: "",
    description: "",
    contactDetails: [
      {
        type: "location",
        title: "Our Office",
        value: "",
        image: "",
        _id: null
      },
      {
        type: "email",
        title: "Support Email",
        value: "",
        image: "",
        _id: null
      },
      {
        type: "phone",
        title: "Customer Support",
        value: "",
        image: "",
        _id: null
      }
    ],
    socialLinks: [
      {
        id: "1",
        platform: "Instagram",
        link: "",
        _id: null
      },
      {
        id: "2",
        platform: "LinkedIn",
        link: "",
        _id: null
      },
      {
        id: "3",
        platform: "Twitter",
        link: "",
        _id: null
      },
      {
        id: "4",
        platform: "Facebook",
        link: "",
        _id: null
      }
    ],
    createdAt: null,
    updatedAt: null,
  },
  emailSettings: {
    smtpHost: "",
    port: 587,
    smtpUsername: "",
    smtpPassword: "",
  },
  paymentSettings: {
    stripe: {
      mode: 'test',
      clientId: '',
      secret: '',
    },
    paypal: {
      mode: 'test',
      clientId: '',
      secret: '',
    }
  },
  payoutSettings: {
    stripe: {
      mode: 'test',
      clientId: '',
      secret: '',
    },
    paypal: {
      mode: 'test',
      clientId: '',
      secret: '',
    }
  },
  isLoading: {
    getFrontendSettings: false,
    updateFrontendSettings: false,
    getPaymentSettings: false,
    updatePaymentSettings: false,
    getEmailSettings: false,
    updateEmailSettings: false,
    getPayoutSettings: false,
    updatePayoutSettings: false,
  },
  error: {
    getFrontendSettings: null,
    updateFrontendSettings: null,
    getPaymentSettings: null,
    updatePaymentSettings: null,
    getEmailSettings: null,
    updateEmailSettings: null,
    getPayoutSettings: null,
    updatePayoutSettings: null,
  },
};

// Async thunks
export const getFrontendSettings = CreateApiAsyncThunk(
  "GET/settings/getFrontendSettings",
  () => api.get("/frontend-settings")
);

export const updateFrontendSettings = CreateApiAsyncThunk(
  "settings/updateFrontendSettings",
  (data) => api.post("/frontend-settings", data)
);

export const getPaymentSettings = CreateApiAsyncThunk(
  "GET/settings/getPaymentSettings",
  () => api.get("/payment-settings")
);

export const updatePaymentSettings = CreateApiAsyncThunk(
  "settings/updatePaymentSettings",
  (data) => api.post("/payment-settings", data)
);

export const getEmailSettings = CreateApiAsyncThunk(
  "GET/settings/getEmailSettings",
  () => api.get("/email-settings")
);

export const updateEmailSettings = CreateApiAsyncThunk(
  "settings/updateEmailSettings",
  (data) => api.post("/email-settings", data)
);

export const getPayoutSettings = CreateApiAsyncThunk(
  "GET/settings/getPayoutSettings",
  () => api.get("/payout-settings")
);

export const updatePayoutSettings = CreateApiAsyncThunk(
  "settings/updatePayoutSettings",
  (data) => api.post("/payout-settings", data)
);

// Slice
const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetSettingsError: (state) => {
      state.error = {
        getFrontendSettings: null,
        updateFrontendSettings: null,
        getPaymentSettings: null,
        updatePaymentSettings: null,
        getEmailSettings: null,
        updateEmailSettings: null,
        getPayoutSettings: null,
        updatePayoutSettings: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Get Frontend Settings
    builder
      .addCase(getFrontendSettings.pending, (state) => {
        state.isLoading.getFrontendSettings = true;
        state.error.getFrontendSettings = null;
      })
      .addCase(getFrontendSettings.fulfilled, (state, action) => {
        state.isLoading.getFrontendSettings = false;
        state.frontendSettings = action.payload.data;
      })
      .addCase(getFrontendSettings.rejected, (state, action) => {
        state.isLoading.getFrontendSettings = false;
        state.error.getFrontendSettings = action.payload;
      });

    // Update Frontend Settings
    builder
      .addCase(updateFrontendSettings.pending, (state) => {
        state.isLoading.updateFrontendSettings = true;
        state.error.updateFrontendSettings = null;
      })
      .addCase(updateFrontendSettings.fulfilled, (state, action) => {
        state.isLoading.updateFrontendSettings = false;
        state.frontendSettings = action.payload.data;
      })
      .addCase(updateFrontendSettings.rejected, (state, action) => {
        state.isLoading.updateFrontendSettings = false;
        state.error.updateFrontendSettings = action.payload;
      });

    // Get Payment Settings
    builder
      .addCase(getPaymentSettings.pending, (state) => {
        state.isLoading.getPaymentSettings = true;
        state.error.getPaymentSettings = null;
      })
      .addCase(getPaymentSettings.fulfilled, (state, action) => {
        state.isLoading.getPaymentSettings = false;
        state.paymentSettings = action.payload.data;
      })
      .addCase(getPaymentSettings.rejected, (state, action) => {
        state.isLoading.getPaymentSettings = false;
        state.error.getPaymentSettings = action.payload;
      });

    // Update Payment Settings
    builder
      .addCase(updatePaymentSettings.pending, (state) => {
        state.isLoading.updatePaymentSettings = true;
        state.error.updatePaymentSettings = null;
      })
      .addCase(updatePaymentSettings.fulfilled, (state, action) => {
        state.isLoading.updatePaymentSettings = false;
        state.paymentSettings = action.payload.data;
      })
      .addCase(updatePaymentSettings.rejected, (state, action) => {
        state.isLoading.updatePaymentSettings = false;
        state.error.updatePaymentSettings = action.payload;
      });

    // Get Email Settings
    builder
      .addCase(getEmailSettings.pending, (state) => {
        state.isLoading.getEmailSettings = true;
        state.error.getEmailSettings = null;
      })
      .addCase(getEmailSettings.fulfilled, (state, action) => {
        state.isLoading.getEmailSettings = false;
        state.emailSettings = action.payload.data;
      })
      .addCase(getEmailSettings.rejected, (state, action) => {
        state.isLoading.getEmailSettings = false;
        state.error.getEmailSettings = action.payload;
      });

    // Update Email Settings
    builder
      .addCase(updateEmailSettings.pending, (state) => {
        state.isLoading.updateEmailSettings = true;
        state.error.updateEmailSettings = null;
      })
      .addCase(updateEmailSettings.fulfilled, (state, action) => {
        state.isLoading.updateEmailSettings = false;
        state.emailSettings = action.payload.data;
      })
      .addCase(updateEmailSettings.rejected, (state, action) => {
        state.isLoading.updateEmailSettings = false;
        state.error.updateEmailSettings = action.payload;
      });

    // Get Payout Settings
    builder
      .addCase(getPayoutSettings.pending, (state) => {
        state.isLoading.getPayoutSettings = true;
        state.error.getPayoutSettings = null;
      })
      .addCase(getPayoutSettings.fulfilled, (state, action) => {
        state.isLoading.getPayoutSettings = false;
        state.payoutSettings = action.payload.data;
      })
      .addCase(getPayoutSettings.rejected, (state, action) => {
        state.isLoading.getPayoutSettings = false;
        state.error.getPayoutSettings = action.payload;
      });

    // Update Payout Settings
    builder
      .addCase(updatePayoutSettings.pending, (state) => {
        state.isLoading.updatePayoutSettings = true;
        state.error.updatePayoutSettings = null;
      })
      .addCase(updatePayoutSettings.fulfilled, (state, action) => {
        state.isLoading.updatePayoutSettings = false;
        state.payoutSettings = action.payload.data;
      })
      .addCase(updatePayoutSettings.rejected, (state, action) => {
        state.isLoading.updatePayoutSettings = false;
        state.error.updatePayoutSettings = action.payload;
      });
  },
});

// Actions
export const { resetSettingsError } = settingSlice.actions;

// Selectors
export const selectFrontendSettings = (state) => state.admin.settings?.frontendSettings || initialState.frontendSettings;
export const selectPaymentSettings = (state) => state.admin.settings?.paymentSettings || initialState.paymentSettings;
export const selectEmailSettings = (state) => state.admin.settings?.emailSettings || initialState.emailSettings;
export const selectPayoutSettings = (state) => state.admin.settings?.payoutSettings || initialState.payoutSettings;
export const selectSettingsLoading = (state) => state.admin.settings?.isLoading || initialState.isLoading;
export const selectSettingsError = (state) => state.admin.settings?.error || initialState.error;

export default settingSlice.reducer;
