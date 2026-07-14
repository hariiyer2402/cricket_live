import { TeamStats } from '../types';

interface Props {
  standings: TeamStats[];
  fixtures?: any[];
  onSelectPlayoff?: (match: any) => void;
}

export default function Playoffs({
  standings,
  fixtures = [],
  onSelectPlayoff,
}: Props) {

// SHOW PLAYOFFS ONLY FOR 8+ TEAM TOURNAMENTS

if (standings.length < 8) {
return null;
}

// CHECK IF LEAGUE MATCHES COMPLETED

const leagueFixtures =
  fixtures.filter(
    (match: any) =>
      !match.stage
  );

const allCompleted =
  leagueFixtures.length > 0 &&
  leagueFixtures.every(
    (match: any) =>
      match.status === 'Completed'
  );
// SORT TEAMS

const sortedTeams =
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


// TOP 4

const top4 =
sortedTeams.slice(0, 4);

// PLAYOFFS NOT STARTED

if (!allCompleted) {

return (

  <div className="bg-[#111C30] border border-[#223554] rounded-3xl p-8 shadow-2xl">

    <h2 className="text-4xl font-black text-white">
      Road To The Final
    </h2>

    <p className="text-slate-400 mt-2">
      IPL Playoffs
    </p>

    <div className="mt-8 bg-[#16263D] border border-[#223554] rounded-3xl p-10 text-center">

      <h3 className="text-2xl font-black text-white">
        Playoffs Not Started
      </h3>

      <p className="text-slate-400 mt-4 text-lg">
        Complete all league matches
        to generate playoffs.
      </p>

    </div>

  </div>

);


}

return (

<div className="bg-[#111C30] border border-[#223554] rounded-3xl p-8 shadow-2xl">

  {/* HEADER */}

  <div className="mb-10">

    <h2 className="text-4xl font-black text-white">
      Road To The Final
    </h2>

    <p className="text-slate-400 mt-2">
      IPL Playoffs
    </p>

  </div>

  {/* GRID */}

  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

    {/* LEFT */}

    <div className="space-y-8">

      {/* QUALIFIER 1 */}

      <div
         onClick={() =>
          onSelectPlayoff?.({
      id: 'Q1',
      stage: 'Qualifier 1',
      team1: top4[0]?.id,
      team2: top4[1]?.id,
      status: 'Upcoming',
    })
  }
  className="bg-[#16263D] border border-[#223554] rounded-3xl p-6 cursor-pointer hover:border-cyan-400 transition-all"
>

        <h3 className="text-cyan-400 text-lg font-black mb-6">
          QUALIFIER 1
        </h3>

        <div className="space-y-4">

          <div className="bg-[#111C30] rounded-2xl p-5 flex items-center justify-between">

            <span className="text-white font-black text-xl">
              1. {top4[0]?.id}
            </span>

          </div>

          <div className="text-center text-slate-400 font-black text-xl">
            VS
          </div>

          <div className="bg-[#111C30] rounded-2xl p-5 flex items-center justify-between">

            <span className="text-white font-black text-xl">
              2. {top4[1]?.id}
            </span>

          </div>

        </div>

      </div>

      {/* ELIMINATOR */}

      <div
  onClick={() =>
    onSelectPlayoff?.({
      id: 'EL',
      stage: 'Eliminator',
      team1: top4[2]?.id,
      team2: top4[3]?.id,
      status: 'Upcoming',
    })
  }
  className="bg-[#16263D] border border-[#223554] rounded-3xl p-6 cursor-pointer hover:border-red-400 transition-all"
>

        <h3 className="text-red-400 text-lg font-black mb-6">
          ELIMINATOR
        </h3>

        <div className="space-y-4">

          <div className="bg-[#111C30] rounded-2xl p-5 flex items-center justify-between">

            <span className="text-white font-black text-xl">
              3. {top4[2]?.id}
            </span>

          </div>

          <div className="text-center text-slate-400 font-black text-xl">
            VS
          </div>

          <div className="bg-[#111C30] rounded-2xl p-5 flex items-center justify-between">

            <span className="text-white font-black text-xl">
              4. {top4[3]?.id}
            </span>

          </div>

        </div>

      </div>

    </div>

    {/* CENTER */}

    <div className="flex items-center">

      <div className="bg-[#16263D] border border-[#223554] rounded-3xl p-8 w-full">

        <h3 className="text-cyan-400 text-lg font-black mb-6 text-center">
          QUALIFIER 2
        </h3>

        <div className="space-y-6">

          <div className="bg-[#111C30] rounded-2xl p-5 text-center">

            <span className="text-white font-black text-lg">
              {fixtures.find((m: any) => m.id === 'Q2')?.team1 || 'Loser Q1'}
            </span>

          </div>

          <div className="text-center text-slate-400 font-black text-xl">
            VS
          </div>

          <div className="bg-[#111C30] rounded-2xl p-5 text-center">

            <span className="text-white font-black text-lg">
              {fixtures.find((m: any) => m.id === 'Q2')?.team2 || 'Winner Eliminator'}
            </span>

          </div>

        </div>

      </div>

    </div>

    {/* FINAL */}

    <div className="flex items-center">

      <div className="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 rounded-3xl p-8 w-full shadow-2xl">

        <h3 className="text-cyan-400 text-lg font-black mb-6 text-center">
          FINAL
        </h3>

        <div className="space-y-6">

          <div className="bg-[#111C30] rounded-2xl p-5 text-center">

            <span className="text-white font-black text-lg">
              Winner Q1
            </span>

          </div>

          <div className="text-center text-slate-400 font-black text-xl">
            VS
          </div>

          <div className="bg-[#111C30] rounded-2xl p-5 text-center">

            <span className="text-white font-black text-lg">
              Winner Q2
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>


);

}
