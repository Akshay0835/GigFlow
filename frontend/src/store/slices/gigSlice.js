import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ FIXED: Changed /auth to /gigs
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/gigs` 
  : 'http://localhost:5001/api/gigs';

axios.defaults.withCredentials = true;

export const fetchGigs = createAsyncThunk(
  'gig/fetchGigs',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      const { data } = await axios.get(`${API_URL}?${params}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchGigById = createAsyncThunk(
  'gig/fetchGigById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createGig = createAsyncThunk(
  'gig/createGig',
  async (gigData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API_URL, gigData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMyGigs = createAsyncThunk(
  'gig/fetchMyGigs',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/my-gigs`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateGig = createAsyncThunk(
  'gig/updateGig',
  async ({ id, gigData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, gigData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteGig = createAsyncThunk(
  'gig/deleteGig',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const gigSlice = createSlice({
  name: 'gig',
  initialState: {
    gigs: [],
    currentGig: null,
    myGigs: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.currentGig = action.payload;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.myGigs.push(action.payload);
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.myGigs = action.payload;
      })
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.myGigs = state.myGigs.filter(gig => gig._id !== action.payload);
      });
  }
});

export const { clearError } = gigSlice.actions;
export default gigSlice.reducer;