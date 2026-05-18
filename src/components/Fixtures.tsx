import { Link } from 'react-router-dom';

interface Fixture {
  id: number;
  team1: string;
  team2: string;
  status: string;
  result?: string;
  venue?: string;
  date?: string;
  time?: string;
}

interface Props {
  matches: Fixture[];
}

export default function Fixtures({
  matches,
}: Props) {

  return (

    <div className="relative overflow-hidden rounded-3xl bg-[#081028] border border-[#1E293B] shadow-2xl">

      {/* Background Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 p-6">

        {/* Header */}

        <div className="mb-6">

          <h2 className="text-3xl font-black text-white">

            Upcoming Match List

          </h2>

          <p className="text-slate-400 mt-1">

            Tournament Schedule

          </p>

        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-2xl border border-[#1E293B]">

          <table className="w-full min-w-[900px]">

            {/* Table Head */}

            <thead className="bg-gradient-to-r from-[#F2BE22] to-[#ffcc33] text-[#020B2A]">

              <tr>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">

                  Date

                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">

                  Day

                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">

                  Match

                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">

                  Venue

                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">

                  Time

                </th>

                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">

                  Status

                </th>
                <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">

                  Result

                </th>

              </tr>

            </thead>

            {/* Table Body */}

            <tbody className="divide-y divide-[#1E293B]">

              {matches.map(
                (
                  match,
                  index
                ) => {

                  const date =
                    new Date(
                      2026,
                      4,
                      index + 1
                    );

                  return (

                    <tr
                      key={match.id}
                      className="hover:bg-cyan-500/5 transition-all duration-300"
                    >

                      {/* Date */}

                      <td className="px-5 py-5 text-sm text-slate-300 whitespace-nowrap">

                        {date.toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}

                      </td>

                      {/* Day */}

                      <td className="px-5 py-5 text-sm text-slate-300">

                        {date.toLocaleDateString(
                          'en-US',
                          {
                            weekday:
                              'long',
                          }
                        )}

                      </td>

                      {/* Match */}

                      <td className="px-5 py-5">

                        <Link
                          to={`/match/${match.id}`}
                          className="font-black text-white hover:text-cyan-400 transition"
                        >

                          {match.team1}

                          <span className="text-slate-500 mx-2">

                            vs

                          </span>

                          {match.team2}

                        </Link>

                      </td>

                      {/* Venue */}

                      <td className="px-5 py-5 text-slate-300">

                        {match.venue ||
                          'Ahmedabad'}

                      </td>

                      {/* Time */}

                      <td className="px-5 py-5 text-slate-300">

                        {match.time ||
                          '7:30 PM'}

                      </td>

                      {/* Status */}

                      <td className="px-5 py-5">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            match.status ===
                            'Completed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >

                          {match.status}

                        </span>

                      </td>

                      {/* Result */}

                      <td className="px-5 py-5 text-green-400 font-bold whitespace-nowrap">

                        {match.result || '-'}

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}