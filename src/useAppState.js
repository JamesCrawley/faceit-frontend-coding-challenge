import { useDispatch, useSelector } from 'react-redux';
import { actions } from './store';

const useAppState = () => {
  const dispatch = useDispatch();

  const state = useSelector(state => {
    return {
      areTournamentsLoading: state.tournaments.areTournamentsLoading,
      tournaments: state.tournaments.tournaments
    };
  });

  return {
    ...state,

    onFetchTournaments: () => {
      dispatch(actions.tournaments.searchTournamentsAsync());
    },

    onCreateTournament: async newTournamentName => {
      await dispatch(
        actions.tournaments.createTournamentAsync(newTournamentName)
      );

      dispatch(actions.tournaments.searchTournamentsAsync());
    },

    onEditTournament: async (tournament, newTournamentName) => {
      await dispatch(
        actions.tournaments.editTournamentAsync({
          tournament,
          newTournamentName
        })
      );
      dispatch(actions.tournaments.searchTournamentsAsync());
    },

    onDeleteTournament: async tournament => {
      await dispatch(actions.tournaments.deleteTournamentAsync(tournament));
      dispatch(actions.tournaments.searchTournamentsAsync());
    },

    onChangeQuery: query => {
      dispatch(actions.tournaments.changeQuery(query));
    }
  };
};

export default useAppState;
