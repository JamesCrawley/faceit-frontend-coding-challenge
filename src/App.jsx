/* eslint-disable no-restricted-globals */
import React from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import H6 from './components/H6';
import P from './components/P';
import Line from './components/Line';
import Input from './components/Input';
import Center from './components/Center';
import Vertical from './components/Vertical';
import Horizontal from './components/Horizontal';
import Button from './components/Button';
import Grid from './components/Grid';
import Card from './components/Card';
import Padding from './components/Padding';

let timeout;
const debounce = cb => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb();
  }, 500);
};

const getFormattedDate = utcIsoString => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(new Date(utcIsoString));
};

const Toolbar = ({ onFetchTournaments, onChangeQuery, onCreateTournament }) => {
  const onCreateClick = () => {
    const newTournamentName = prompt('Tournament Name:');

    if (newTournamentName !== null) {
      onCreateTournament(newTournamentName);
    }
  };

  return (
    <Horizontal justify="space-between">
      <Input
        placeholder="Search tournament..."
        onInput={e => {
          e.persist();
          debounce(() => {
            onChangeQuery(e.target.value);
            onFetchTournaments();
          });
        }}
      />
      <Button onClick={onCreateClick}>Create Tournament</Button>
    </Horizontal>
  );
};

const TournamentGrid = ({
  tournaments,
  areTournamentsLoading,
  onFetchTournaments,
  onEditTournament,
  onDeleteTournament
}) => {
  return (
    <Padding top={4}>
      <Center>
        {areTournamentsLoading ? (
          <P>Loading tournaments...</P>
        ) : tournaments === null ? (
          <Vertical>
            <P>Something went wrong.</P>
            <Center>
              <Button onClick={onFetchTournaments}>Retry</Button>
            </Center>
          </Vertical>
        ) : tournaments.length === 0 ? (
          <P>No tournaments found.</P>
        ) : (
          <Grid>
            {tournaments.map(tournament => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onEditTournament={newTournamentName =>
                  onEditTournament(tournament, newTournamentName)
                }
                onDeleteTournament={() => onDeleteTournament(tournament)}
              />
            ))}
          </Grid>
        )}
      </Center>
    </Padding>
  );
};

const TournamentCard = ({
  tournament,
  onEditTournament,
  onDeleteTournament
}) => {
  const onEditClick = () => {
    const newTournamentName = prompt('New tournament name:');

    if (newTournamentName !== null) {
      onEditTournament(newTournamentName);
    }
  };

  const onDeleteClick = () => {
    const shouldDelete = confirm(
      'Do you really want to delete this tournament?'
    );

    if (shouldDelete) {
      onDeleteTournament();
    }
  };

  return (
    <Card>
      <H6>{tournament.name}</H6>
      <Line>Organizer: {tournament.organizer}</Line>
      <Line>Game: {tournament.game}</Line>
      <Line>
        Participants:{' '}
        {`${tournament.participants.current}/${tournament.participants.max}`}
      </Line>
      <Line>Start: {getFormattedDate(tournament.startDate)}</Line>
      <Padding top={2}>
        <Horizontal gap={8}>
          <Button onClick={onEditClick}>Edit</Button>

          <Button onClick={onDeleteClick}>Delete</Button>
        </Horizontal>
      </Padding>
    </Card>
  );
};

const App = ({
  tournaments,
  areTournamentsLoading,
  onFetchTournaments,
  onCreateTournament,
  onEditTournament,
  onDeleteTournament,
  onChangeQuery
}) => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Toolbar
        onFetchTournaments={onFetchTournaments}
        onCreateTournament={onCreateTournament}
        onChangeQuery={onChangeQuery}
      />
      <TournamentGrid
        tournaments={tournaments}
        areTournamentsLoading={areTournamentsLoading}
        onFetchTournaments={onFetchTournaments}
        onEditTournament={onEditTournament}
        onDeleteTournament={onDeleteTournament}
      />
    </Container>
  );
};

export default App;
