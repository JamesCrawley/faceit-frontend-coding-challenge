import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_TOURNAMENTS_URL } from '../constants/api';
import axios from 'axios';

export const searchTournamentsAsync = createAsyncThunk(
  'tournaments/searchTournamentsAsync',
  async (_, { getState }) => {
    const {
      tournaments: { query }
    } = getState();

    const { data } = await axios.get(API_TOURNAMENTS_URL, {
      params: { q: query }
    });

    return data;
  }
);

export const createTournamentAsync = createAsyncThunk(
  'tournaments/createTournamentAsync',
  async newTournamentName => {
    await axios.post(API_TOURNAMENTS_URL, {
      name: newTournamentName
    });
  }
);

export const editTournamentAsync = createAsyncThunk(
  'tournaments/editTournamentAsync',
  async ({ tournament, newTournamentName }) => {
    await axios.patch(`${API_TOURNAMENTS_URL}/${tournament.id}`, {
      name: newTournamentName
    });
  }
);

export const deleteTournamentAsync = createAsyncThunk(
  'tournaments/deleteTournamentAsync',
  async tournament => {
    await axios.delete(`${API_TOURNAMENTS_URL}/${tournament.id}`);
  }
);

const initialState = {
  // array = results have been fetched
  // null = error has occurred
  tournaments: [],

  // this field exists in state so that the retry button fetches the same set of results
  query: '',

  areTournamentsLoading: false
};

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    changeQuery: (state, { payload }) => {
      state.query = payload;
    }
  },
  extraReducers: {
    [searchTournamentsAsync.pending]: (state, { payload }) => {
      state.areTournamentsLoading = true;
    },
    [searchTournamentsAsync.fulfilled]: (state, { payload }) => {
      state.areTournamentsLoading = false;
      state.tournaments = payload;
    },
    [searchTournamentsAsync.rejected]: (state, { payload, error }) => {
      console.error(error);
      state.areTournamentsLoading = false;
      state.tournaments = null;
    }
  }
});

export default tournamentsSlice;
