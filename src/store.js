import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tournamentsSlice, {
  createTournamentAsync,
  searchTournamentsAsync,
  editTournamentAsync,
  deleteTournamentAsync
} from './reducers/tournaments';

const reducer = combineReducers({
  tournaments: tournamentsSlice.reducer
});

const store = configureStore({
  reducer,
  devTools: {
    name: 'James Solution'
  }
});

export const actions = {
  tournaments: {
    ...tournamentsSlice.actions,
    createTournamentAsync,
    searchTournamentsAsync,
    editTournamentAsync,
    deleteTournamentAsync
  }
};

export default store;
