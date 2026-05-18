import {
  useParams,
  Link,
} from 'react-router-dom';

import LiveScoringPanel from '../components/LiveScoringPanel';

export default function LiveScore() {

  const { id } =
    useParams();

  const tournament =
    JSON.parse(
      localStorage.getItem(
        'current_tournament'
      ) || 'null'
    );

  const match =
    tournament?.fixtures?.find(
      (m: any) =>
        String(m.id) === id
    );

  if (!match) {

    return (

      <div className="min-h-screen bg-[#06121E] flex items-center justify-center px-4">

        <h1 className="text-3xl md:text-5xl font-black text-white text-center">

          Match Not Found

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-transparent overflow-x-hidden">

      {/* TOP NAV */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#111C30] border border-[#223554] hover:border-cyan-400 text-white px-5 py-3 rounded-2xl transition-all duration-300 shadow-lg"
        >

          ← Back To Dashboard

        </Link>

      </div>

      {/* PAGE CONTENT */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* MATCH HEADER */}

        <div className="bg-[#111C30] border border-[#223554] rounded-3xl p-6 shadow-2xl mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-none">

                {match.team1}

                <span className="text-[#00C2FF] mx-3">
                  VS
                </span>

                {match.team2}

              </h1>

              <p className="text-[#94A3B8] text-lg mt-3">

                Live Match Center

              </p>

            </div>

            <div className="flex items-center">

              <span className="px-5 py-2 rounded-full bg-cyan-500/15 text-cyan-400 font-bold text-lg border border-cyan-500/20 animate-pulse">

                Live

              </span>

            </div>

          </div>

        </div>

        {/* LIVE SCORING PANEL */}

        <LiveScoringPanel
          key={match.id}
          matchId={String(match.id)}
          team1={match.team1}
          team2={match.team2}
        />
      </div>

    </div>

  );

}