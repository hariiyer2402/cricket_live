import { TeamStats } from '../types';

interface Props {
standings: TeamStats[];
}

export default function Pointstable({
standings,
}: Props) {

const sortedStandings =
[...standings].sort(
(a, b) => {


    if (
      b.points !== a.points
    ) {

      return (
        b.points - a.points
      );

    }

    return (
      b.nrr - a.nrr
    );

  }
);


// SHOW QUALIFICATION ONLY FOR 8+ TEAM TOURNAMENTS

const showQualification =
standings.length >= 8;

// HIDE TABLE FOR 2 TEAM SERIES

if (standings.length <= 2) {
return null;
}

return (

<div className="bg-[#111C30] border border-[#223554] rounded-2xl overflow-hidden shadow-2xl">

  {/* HEADER */}

  <div className="px-5 py-4 border-b border-[#223554]">

    <h2 className="text-2xl font-black text-white">

      Points Table

    </h2>

    <p className="text-[#94A3B8] text-sm mt-1">

      League Standings

    </p>

  </div>

  {/* TABLE */}

  <div className="overflow-x-auto">

    <table className="w-full min-w-[900px]">

      <thead className="bg-[#16263D]">

        <tr className="text-[#CBD5E1] text-sm">

          <th className="p-4 text-left">
            #
          </th>

          <th className="p-4 text-left">
            TEAM
          </th>

          <th className="p-4 text-center">
            M
          </th>

          <th className="p-4 text-center">
            W
          </th>

          <th className="p-4 text-center">
            L
          </th>

          <th className="p-4 text-center">
            NR
          </th>

          <th className="p-4 text-center text-[#00C2FF]">
            PTS
          </th>

          <th className="p-4 text-center">
            NRR
          </th>

          {showQualification && (

            <th className="p-4 text-center">
              STATUS
            </th>

          )}

        </tr>

      </thead>

      <tbody>

        {sortedStandings.map(
          (
            team,
            index
          ) => {

            const status =
              index <= 3
                ? 'Q'
                : 'E';

            return (

              <tr
                key={team.id}
                className="border-t border-[#223554] hover:bg-[#16263D]/40 transition-all"
              >

                {/* POSITION */}

                <td className="p-4 text-white font-semibold">
                  {index + 1}
                </td>

                {/* TEAM */}

                <td className="p-4 font-bold text-white text-lg">
                  {team.id}
                </td>

                {/* MATCHES */}

                <td className="p-4 text-center text-white">
                  {team.played}
                </td>

                {/* WON */}

                <td className="p-4 text-center text-[#4ADE80] font-bold">
                  {team.won}
                </td>

                {/* LOST */}

                <td className="p-4 text-center text-red-400 font-bold">
                  {team.lost}
                </td>

                {/* NO RESULT */}

                <td className="p-4 text-center text-slate-300">
                  {team.noResult}
                </td>

                {/* POINTS */}

                <td className="p-4 text-center text-[#00C2FF] font-black text-lg">
                  {team.points}
                </td>

                {/* NRR */}

                <td className="p-4 text-center text-slate-300 font-semibold">
                  {team.nrr.toFixed(
                    3
                  )}
                </td>

                {/* STATUS */}

                {showQualification && (

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black ${
                        status === 'Q'
                          ? 'bg-[#4ADE80]/20 text-[#4ADE80]'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >

                      {status}

                    </span>

                  </td>

                )}

              </tr>

            );

          }
        )}

      </tbody>

    </table>

  </div>

  {/* FOOTER */}

  {showQualification && (

    <div className="px-5 py-4 bg-[#16263D]/40 flex items-center gap-6 text-sm border-t border-[#223554]">

      <div className="flex items-center gap-2">

        <span className="w-3 h-3 rounded-full bg-[#4ADE80]"></span>

        <span className="text-[#94A3B8]">
          Q = Qualified
        </span>

      </div>

      <div className="flex items-center gap-2">

        <span className="w-3 h-3 rounded-full bg-red-400"></span>

        <span className="text-[#94A3B8]">
          E = Eliminated
        </span>

      </div>

    </div>

  )}

</div>

);

}
