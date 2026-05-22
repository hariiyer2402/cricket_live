import { useState, useEffect } from 'react';

import { MatchResult, TeamStats } from '../types';
import { rebuildStandings } from '../utils';

import Fixtures from '../components/Fixtures';
import MatchForm from '../components/MatchForm';
import MatchHistory from '../components/MatchHistory';
import Pointstable from '../components/Pointstable';
import PlayerStats from '../components/PlayerStats';
import TournamentCreator from '../components/TournamentCreator';
import Playoffs from '../components/Playoffs';

import {
  RotateCcw,
  Trophy,
  ClipboardList,
} from 'lucide-react';

const LS_MATCHES =
  'ipl_cricket_matches_v1';

function loadMatches(): MatchResult[] {

  try {

    const raw =
      localStorage.getItem(
        LS_MATCHES
      );

    return raw
      ? JSON.parse(raw)
      : [];

  } catch {

    return [];

  }

}

export default function Dashboard() {

  // TOURNAMENT

  const [tournament, setTournament] =
    useState<any>(() => {

      const saved =
        localStorage.getItem(
          'current_tournament'
        );

      return saved
        ? JSON.parse(saved)
        : null;

    });

  // MATCHES

  const [matches, setMatches] =
    useState<MatchResult[]>(
      loadMatches
    );

  // STANDINGS

  const [standings, setStandings] =
    useState<TeamStats[]>([]);

  // RESET BUTTON

  const [confirmReset, setConfirmReset] =
    useState(false);

  // TABS

  const [activeTab, setActiveTab] =
    useState<
      'points' | 'history'
    >('points');

  // SAVE + UPDATE STANDINGS

  useEffect(() => {

    localStorage.setItem(
      LS_MATCHES,
      JSON.stringify(matches)
    );

    localStorage.setItem(
      'current_tournament',
      JSON.stringify(tournament)
    );

    if (tournament) {

      setStandings(
        rebuildStandings(
          matches,
          tournament?.teams
        )
      );

    }

  }, [
    matches,
    tournament,
  ]);

  // ADD MATCH RESULT

  const addMatch = (
    m: MatchResult
  ) => {

    setMatches(prev => [
      ...prev,
      m,
    ]);

    setTournament((prev: any) => {

      if (!prev) return prev;

      let updated = false;

      return {

        ...prev,

        fixtures:
          prev.fixtures.map(
            (fixture: any) => {

              if (
                fixture.id === m.id
              ) {

                updated = true;

                const runDifference =
                  Math.abs(
                    m.team1Runs -
                    m.team2Runs
                  );

                const wicketDifference =
                  Math.floor(
                    Math.random() * 9
                  ) + 1;

                const team1Won =
                  m.winner ===
                  m.team1;

                return {

                  ...fixture,

                  status:
                    'Completed',

                  winner:
                    m.winner,

                  result:
                    team1Won
                      ? `${m.winner} won by ${runDifference} runs`
                      : `${m.winner} won by ${wicketDifference} wickets`,

                };

              }

              return fixture;

            }
          ),

      };

    });

  };

  // RESET TOURNAMENT

  const resetTournament = () => {

    if (!confirmReset) {

    setConfirmReset(true);

    return;

  }

  // RESET STATES

  setMatches([]);

  setTournament(null);

  setStandings([]);

  // REMOVE MAIN STORAGE

  localStorage.removeItem(
    LS_MATCHES
  );

  localStorage.removeItem(
    'current_tournament'
  );

  // REMOVE PLAYER STATS

  localStorage.removeItem(
    'player_stats_data'
  );

  // REMOVE ALL SAVED MATCHES

  Object.keys(localStorage)
    .forEach((key) => {

      if (
        key.startsWith('match_')
      ) {

        localStorage.removeItem(
          key
        );

      }

    });

  // FORCE LIVE REFRESH

  window.dispatchEvent(
    new Event('storage')
  );

  setConfirmReset(false);

};

  return (

    <div className="min-h-screen bg-transparent text-white font-sans">

      {/* HEADER */}

      <header className="bg-[#08182A]/90 backdrop-blur-md border-b border-[#223554] sticky top-0 z-30">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="bg-gradient-to-r from-[#00C2FF] to-[#0095C4] rounded-xl p-2 shadow-lg shadow-cyan-500/20">

              <Trophy
                size={20}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-lg font-black text-white tracking-tight leading-none">

                Cricket Tournament Manager

              </h1>

              <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">

                Premium Cricket Dashboard

              </p>

            </div>

          </div>

          {/* RESET */}

          <button
            onClick={
              resetTournament
            }
            onBlur={() =>
              setConfirmReset(false)
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              confirmReset
                ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30 animate-pulse'
                : 'bg-[#111C30] border border-[#223554] text-white hover:border-cyan-400'
            }`}
          >

            <RotateCcw size={13} />

            {confirmReset
              ? 'Confirm Reset?'
              : 'Reset'}

          </button>

        </div>

      </header>

      {/* MAIN */}

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* TOP STATS */}

        {tournament && (

          <div className="grid grid-cols-3 gap-3">

            {[
              {
                label: 'Teams',
                value:
                  tournament?.teams
                    ?.length || 0,
                color:
                  'text-cyan-400',
              },

              {
                label:
                  'Matches Played',

                value:
                  matches.length,

                color:
                  'text-emerald-400',
              },

              {
                label:
                  'Total Points',

                value:
                  standings.reduce(
                    (a, t) =>
                      a + t.points,
                    0
                  ),

                color:
                  'text-cyan-400',
              },

            ].map((s) => (

              <div
                key={s.label}
                className="bg-[#111C30] border border-[#223554] rounded-2xl px-4 py-4 text-center shadow-xl"
              >

                <div className={`text-2xl font-black ${s.color}`}>

                  {s.value}

                </div>

                <div className="text-xs text-slate-400 mt-1">

                  {s.label}

                </div>

              </div>

            ))}

          </div>

        )}

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT SIDE */}

          <div className="lg:col-span-2 space-y-4">

            {/* TOURNAMENT CREATOR */}

            <TournamentCreator
              onCreate={
                setTournament
              }
            />

            {/* MATCH FORM */}

            {tournament && (

              <div className="bg-[#111C30] border border-[#223554] rounded-3xl p-5 shadow-2xl">

                <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">

                  <ClipboardList
                    size={15}
                    className="text-cyan-400"
                  />

                  Enter Match Result

                </h2>

              <MatchForm
                onAdd={addMatch}
                fixtureId={
                  tournament.fixtures[0]?.id || ''
                }
              />

              </div>

            )}

          </div>

          {/* RIGHT SIDE */}

          <div className="lg:col-span-3 space-y-5">

            {/* TABS */}

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  setActiveTab(
                    'points'
                  )
                }
                className={`py-4 rounded-2xl font-bold transition-all ${
                  activeTab ===
                  'points'
                    ? 'bg-[#00C2FF] text-[#06121E]'
                    : 'bg-[#111C30] border border-[#223554] text-slate-300'
                }`}
              >

                Points Table

              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    'history'
                  )
                }
                className={`py-4 rounded-2xl font-bold transition-all ${
                  activeTab ===
                  'history'
                    ? 'bg-[#00C2FF] text-[#06121E]'
                    : 'bg-[#111C30] border border-[#223554] text-slate-300'
                }`}
              >

                Match History

              </button>

            </div>

            {/* POINTS TABLE */}

            {activeTab ===
              'points' && (

              <Pointstable
                standings={
                  standings
                }
              />

            )}

            {/* MATCH HISTORY */}

            {activeTab ===
              'history' && (

              <MatchHistory
                matches={matches}
              />

            )}

            {/* FIXTURES */}

            {tournament && (

              <div className="bg-[#111C30] border border-[#223554] rounded-3xl p-5 shadow-2xl">

              <Fixtures
                matches={
                  tournament.fixtures
                }
                tournamentName={
                  tournament.name
                }
              />

              </div>

            )}

            {/* PLAYOFFS */}

            {tournament && (

              <Playoffs
                standings={
                  standings
                }
                fixtures={
                  tournament.fixtures
                }
              />

            )}

            {/* PLAYER STATS */}

            {tournament && (

              <div className="bg-[#111C30] border border-[#223554] rounded-3xl p-6 shadow-2xl">

                <PlayerStats />

              </div>

            )}

          </div>

        </div>

      </main>

    </div>

  );

}