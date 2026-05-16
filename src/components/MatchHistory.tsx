import { MatchResult } from '../types';

interface Props {
  matches: MatchResult[];
}

export default function MatchHistory({
  matches,
}: Props) {

  return (

    <div className="bg-[#0F172A] border border-[#1E293B] rounded-3xl p-5 shadow-2xl">

      <h2 className="text-3xl font-black text-white mb-5">

        Match History

      </h2>

      <div className="space-y-4">

        {matches.length ===
        0 ? (

          <div className="text-slate-400">

            No matches played

          </div>

        ) : (

          matches.map(match => (

            <div
              key={match.id}
              className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4"
            >

              <div className="flex items-center justify-between">

                <div className="font-bold text-white">

                  {match.team1}

                  <span className="mx-2 text-slate-500">

                    vs

                  </span>

                  {match.team2}

                </div>

                <div className="text-emerald-400 font-semibold">

                  {match.winner}

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}