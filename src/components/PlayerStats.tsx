import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Player {
  id: number;
  name: string;
  team: string;
  runs: number;
  wickets: number;
  matches: number;
  lastUpdated: number;
}

const teams = [
  'IND',
  'SL',
  'AUS',
  'ENG',
  'NZ',
  'WI',
  'SA',
  'PAK',
  'BAN',
  'NED',
];


export default function PlayerStats() {

  const [players, setPlayers] = useState<Player[]>([]);

  const [name, setName] = useState('');
  const [team, setTeam] = useState('IND');
  const [runs, setRuns] = useState('');
  const [wickets, setWickets] = useState('');
  const [matches, setMatches] = useState('');

  useEffect(() => {

  const loadPlayers = () => {

    const savedPlayers =
      JSON.parse(
        localStorage.getItem(
          'player_stats_data'
        ) || '[]'
      );

    setPlayers(savedPlayers);

  };

  loadPlayers();

  const interval =
    setInterval(loadPlayers, 1000);

  return () => clearInterval(interval);

}, []);

  useEffect(() => {

  const syncPlayers = () => {

    const savedPlayers =
      JSON.parse(
        localStorage.getItem(
          'player_stats_data'
        ) || '[]'
      );

    setPlayers(savedPlayers);

  };

  window.addEventListener(
    'storage',
    syncPlayers
  );

  return () => {

    window.removeEventListener(
      'storage',
      syncPlayers
    );

  };

}, []);

  const addPlayer = () => {

  if (!name.trim()) return;

  let updatedPlayers: Player[] = [];

  setPlayers((prevPlayers) => {

    const existingPlayer = prevPlayers.find(
      (player) =>
        player.name.toLowerCase() ===
          name.trim().toLowerCase() &&
        player.team === team
    );

    if (existingPlayer) {

      updatedPlayers = prevPlayers.map((player) =>

        player.name.toLowerCase() ===
          name.trim().toLowerCase() &&
        player.team === team

          ? {
              ...player,

              runs:
                player.runs +
                (Number(runs) || 0),

              wickets:
                player.wickets +
                (Number(wickets) || 0),

              matches:
                player.matches +
                (Number(matches) || 0),

              lastUpdated: Date.now(),
            }

          : player
      );

    } else {

      updatedPlayers = [

        ...prevPlayers,

        {
          id: Date.now(),

          name: name.trim(),

          team,

          runs: Number(runs) || 0,

          wickets: Number(wickets) || 0,

          matches: Number(matches) || 0,

          lastUpdated: Date.now(),
        },

      ];

    }

    // SORTING

    updatedPlayers.sort((a, b) => {

      // Orange cap priority first
      if (b.runs !== a.runs) {
        return b.runs - a.runs;
      }

      // Then wickets
      return b.wickets - a.wickets;
    });

    // SAVE TO LOCAL STORAGE

    localStorage.setItem(
      'player_stats_data',
      JSON.stringify(updatedPlayers)
    );

    return updatedPlayers;

  });

  setName('');
  setRuns('');
  setWickets('');
  setMatches('');

};

  const deletePlayer = (
    id: number
  ) => {

    setPlayers(prev =>
      prev.filter(
        player => player.id !== id
      )
    );

  };

  // ORANGE CAP

  const orangeCap = [...players]
  .filter(player => player.runs > 0)
  .sort((a, b) => {

    if (b.runs !== a.runs) {
      return b.runs - a.runs;
    }

    return a.matches - b.matches;
  })
  .slice(0, 10);

  // PURPLE CAP

const purpleCap = [...players]
  .filter(player => player.wickets > 0)
  .sort((a, b) => {

    if (b.wickets !== a.wickets) {
      return b.wickets - a.wickets;
    }

    return a.matches - b.matches;
  })
  .slice(0, 10);

  return (

    <div className="space-y-6">

      {/* ADD PLAYER FORM */}

      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-5 shadow-xl">

        <h2 className="text-2xl font-bold text-white mb-5">

          Add Player Stats

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

          <input
            type="text"
            placeholder="Player Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <select
            value={team}
            onChange={(e) =>
              setTeam(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          >

            {teams.map((t) => (

              <option
                key={t}
                value={t}
              >
                {t}
              </option>

            ))}

          </select>

          <input
            type="number"
            placeholder="Runs"
            value={runs}
            onChange={(e) =>
              setRuns(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Wickets"
            value={wickets}
            onChange={(e) =>
              setWickets(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Matches"
            value={matches}
            onChange={(e) =>
              setMatches(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

        </div>

        <button
          onClick={addPlayer}
          className="mt-5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all"
        >

          Add Player

        </button>

      </div>

      {/* LEADERBOARDS */}

      <Link to="/awards">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 cursor-pointer">

          {/* ORANGE CAP */}

          <div className="rounded-2xl border border-orange-500/30 bg-slate-900/70 p-5 shadow-xl">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-2xl font-bold text-orange-400">
                  Orange Cap
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Top 10 Run Scorers
                </p>

              </div>

              <div className="text-3xl">
                🟠
              </div>

            </div>

            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">

              {orangeCap.length === 0 ? (
                <div className="text-slate-500 text-sm">
                  No batting stats added
                </div>
              ) : (
                orangeCap.map((player, idx) => (

                  <div
                    key={player.id}
                    className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                        #{idx + 1}
                      </div>

                      <div>

                        <h3 className="font-semibold text-white">
                          {player.name}
                        </h3>

                        <p className="text-xs text-slate-400">
                          {player.team} • {player.matches} Matches
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="text-right">

                        <div className="text-xl font-black text-orange-400">
                          {player.runs}
                        </div>

                        <div className="text-xs text-slate-500">
                          Runs
                        </div>

                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deletePlayer(player.id);
                        }}
                        className="text-rose-400 text-xs"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))
              )}

            </div>

          </div>

          {/* PURPLE CAP */}

          <div className="rounded-2xl border border-purple-500/30 bg-slate-900/70 p-5 shadow-xl">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-2xl font-bold text-purple-400">
                  Purple Cap
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Top 10 Wicket Takers
                </p>

              </div>

              <div className="text-3xl">
                🟣
              </div>

            </div>

            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">

              {purpleCap.length === 0 ? (
                <div className="text-slate-500 text-sm">
                  No bowling stats added
                </div>
              ) : (
                purpleCap.map((player, idx) => (

                  <div
                    key={player.id}
                    className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                        #{idx + 1}
                      </div>

                      <div>

                        <h3 className="font-semibold text-white">
                          {player.name}
                        </h3>

                        <p className="text-xs text-slate-400">
                          {player.team} • {player.matches} Matches
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="text-right">

                        <div className="text-xl font-black text-purple-400">
                          {player.wickets}
                        </div>

                        <div className="text-xs text-slate-500">
                          Wickets
                        </div>

                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deletePlayer(player.id);
                        }}
                        className="text-rose-400 text-xs"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))
              )}

            </div>

          </div>

        </div>

      </Link>

    </div>

  );

}