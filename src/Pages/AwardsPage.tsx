import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Player {
  id: number;
  name: string;
  team: string;
  runs: number;
  wickets: number;
  matches: number;
  lastUpdated: number;
}

const LS_KEY = 'player_stats_data';

export default function AwardsPage() {

  const [players, setPlayers] =
  useState<Player[]>([]);

useEffect(() => {

  const loadPlayers = () => {

    const savedPlayers =
      JSON.parse(
        localStorage.getItem(
          LS_KEY
        ) || '[]'
      );

    setPlayers(savedPlayers);

  };

  // INITIAL LOAD
  loadPlayers();

  // REAL TIME UPDATE
  const interval =
    setInterval(loadPlayers, 1000);

  return () =>
    clearInterval(interval);

}, []);

  // ORANGE CAP

  const orangeCapWinner =
  [...players]
    .filter(
      player => player.runs > 0
    )
    .sort((a, b) => {

      if (b.runs !== a.runs) {
        return b.runs - a.runs;
      }

      return a.matches - b.matches;

    })[0];

  // PURPLE CAP

  const purpleCapWinner =
  [...players]
    .filter(
      player => player.wickets > 0
    )
    .sort((a, b) => {

      if (
        b.wickets !== a.wickets
      ) {
        return (
          b.wickets -
          a.wickets
        );
      }

      return a.matches - b.matches;

    })[0];

  return (

    <div className="min-h-screen bg-[#06121E] text-white p-6 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#111C30] border border-[#223554] hover:border-cyan-400 text-white px-5 py-3 rounded-2xl transition-all duration-300 shadow-lg mb-8"
        >

          ← Back To Dashboard

        </Link>

        {/* HEADER */}

        <div className="text-center mb-14">

          <h1 className="text-5xl md:text-7xl font-black text-white">

            🏆 AWARDS NIGHT

          </h1>

          <p className="text-slate-300 mt-4 text-xl">

            Congratulations To The Tournament Stars

          </p>

        </div>

        {/* WINNERS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* ORANGE CAP */}

          <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-[#111827] p-8 shadow-2xl relative overflow-hidden">

            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl"></div>

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-4xl font-black text-orange-400">

                    🟠 ORANGE CAP

                  </h2>

                  <p className="text-slate-300 mt-2">

                    Highest Run Scorer

                  </p>

                </div>

                <div className="text-7xl">
                  🧢
                </div>

              </div>

              {

                orangeCapWinner ? (

                  <div className="mt-10">

                    <h1 className="text-5xl font-black text-white">

                      {orangeCapWinner.name}

                    </h1>

                    <p className="text-orange-300 text-2xl mt-3">

                      {orangeCapWinner.team}

                    </p>

                    <div className="mt-8 space-y-4">

                      <div className="flex justify-between text-xl">

                        <span className="text-slate-400">
                          Runs
                        </span>

                        <span className="font-black text-white">
                          {orangeCapWinner.runs}
                        </span>

                      </div>

                      <div className="flex justify-between text-xl">

                        <span className="text-slate-400">
                          Matches
                        </span>

                        <span className="font-black text-white">
                          {orangeCapWinner.matches}
                        </span>

                      </div>

                    </div>

                    <div className="mt-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 p-5 text-center">

                      <h3 className="text-3xl font-black text-orange-300">

                        ₹10,00,000 CASH PRIZE

                      </h3>

                    </div>

                  </div>

                ) : (

                  <div className="mt-10 text-slate-500">

                    No Orange Cap Winner Yet

                  </div>

                )

              }

            </div>

          </div>

          {/* PURPLE CAP */}

          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-[#111827] p-8 shadow-2xl relative overflow-hidden">

            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl"></div>

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-4xl font-black text-purple-400">

                    🟣 PURPLE CAP

                  </h2>

                  <p className="text-slate-300 mt-2">

                    Highest Wicket Taker

                  </p>

                </div>

                <div className="text-7xl">
                  🎯
                </div>

              </div>

              {

                purpleCapWinner ? (

                  <div className="mt-10">

                    <h1 className="text-5xl font-black text-white">

                      {purpleCapWinner.name}

                    </h1>

                    <p className="text-purple-300 text-2xl mt-3">

                      {purpleCapWinner.team}

                    </p>

                    <div className="mt-8 space-y-4">

                      <div className="flex justify-between text-xl">

                        <span className="text-slate-400">
                          Wickets
                        </span>

                        <span className="font-black text-white">
                          {purpleCapWinner.wickets}
                        </span>

                      </div>

                      <div className="flex justify-between text-xl">

                        <span className="text-slate-400">
                          Matches
                        </span>

                        <span className="font-black text-white">
                          {purpleCapWinner.matches}
                        </span>

                      </div>

                    </div>

                    <div className="mt-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 p-5 text-center">

                      <h3 className="text-3xl font-black text-purple-300">

                        ₹10,00,000 CASH PRIZE

                      </h3>

                    </div>

                  </div>

                ) : (

                  <div className="mt-10 text-slate-500">

                    No Purple Cap Winner Yet

                  </div>

                )

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}