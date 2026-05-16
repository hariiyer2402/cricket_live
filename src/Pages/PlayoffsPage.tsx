import Playoffs from '../components/Playoffs';

export default function PlayoffsPage() {

  const tournament =
    JSON.parse(
      localStorage.getItem(
        'current_tournament'
      ) || 'null'
    );

  const standings =
    JSON.parse(
      localStorage.getItem(
        'ipl_standings'
      ) || '[]'
    );

  if (!tournament) {

    return (

      <div className="min-h-screen bg-[#06121E] text-white flex items-center justify-center text-3xl font-black">

        Tournament Not Found

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#06121E] text-white p-6">

      <div className="max-w-7xl mx-auto">

        <Playoffs
          standings={standings}
          fixtures={
            tournament.fixtures || []
          }
        />

      </div>

    </div>

  );

}