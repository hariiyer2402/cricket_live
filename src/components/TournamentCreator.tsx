import { useState } from 'react';

const teamsList = [
'IND',
'PAK',
'AUS',
'ENG',
'NZ',
'SA',
'SL',
'BAN',
'WI',
'NED',
];

interface Props {
onCreate: (data: any) => void;
}

export default function TournamentCreator({
onCreate,
}: Props) {

const [tournamentName, setTournamentName] =
useState('');

const [format, setFormat] =
useState('ODI');

const [seriesType, setSeriesType] =
useState('World Cup');

const [selectedTeams, setSelectedTeams] =
useState<string[]>([]);

const toggleTeam = (
team: string
) => {


if (
  selectedTeams.includes(team)
) {

  setSelectedTeams(prev =>
    prev.filter(
      t => t !== team
    )
  );

} else {

  setSelectedTeams(prev => [
    ...prev,
    team,
  ]);

}


};

const generateFixtures = () => {


if (
  selectedTeams.length < 2
) {

  alert(
    'Select minimum 2 teams'
  );

  return;

}

const fixtures = [];

let matchId = 1;

if (
  seriesType ===
  '3 Match Series'
) {

  for (
    let i = 1;
    i <= 3;
    i++
  ) {

    fixtures.push({
      id: matchId++,
      team1:
        selectedTeams[0],
      team2:
        selectedTeams[1],
      status:
        'Upcoming',
    });

  }

}

else if (
  seriesType ===
  '5 Match Series'
) {

  for (
    let i = 1;
    i <= 5;
    i++
  ) {

    fixtures.push({
      id: matchId++,
      team1:
        selectedTeams[0],
      team2:
        selectedTeams[1],
      status:
        'Upcoming',
    });

  }

}

else {

  for (
    let i = 0;
    i < selectedTeams.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < selectedTeams.length;
      j++
    ) {

      fixtures.push({
        id: matchId++,
        team1:
          selectedTeams[i],
        team2:
          selectedTeams[j],
        status:
          'Upcoming',
      });

    }

  }

}

onCreate({

  name:
    tournamentName ||
    'Custom Tournament',

  format,

  seriesType,

  teams:
    selectedTeams,

  fixtures,

});

setSelectedTeams([]);
setTournamentName('');
setFormat('ODI');
setSeriesType('World Cup');


};

return (


<div className="bg-[#0B1220] border border-[#1E293B] rounded-3xl p-5 shadow-2xl max-w-5xl mx-auto">

  {/* Header */}

  <div className="mb-5">

    <h2 className="text-3xl font-black text-white">
      Create Tournament
    </h2>

    <p className="text-slate-400 text-sm mt-1">
      Dynamic Cricket Tournament Generator
    </p>

  </div>

  {/* Top Controls */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

    {/* Tournament Name */}

    <div className="md:col-span-3">

      <input
        type="text"
        placeholder="Enter Tournament Name"
        value={tournamentName}
        onChange={(e) =>
          setTournamentName(
            e.target.value
          )
        }
        className="w-full bg-[#111827] border border-[#223554] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition-all"
      />

    </div>

    {/* Format */}

    <div>

      <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 block">
        Match Format
      </label>

      <select
        value={format}
        onChange={(e) =>
          setFormat(
            e.target.value
          )
        }
        className="w-full bg-[#111827] border border-[#223554] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
      >

        <option>
          ODI
        </option>

        <option>
          T20
        </option>

        <option>
          TEST
        </option>

      </select>

    </div>

    {/* Series Type */}

    <div className="md:col-span-2">

      <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 block">
        Series Type
      </label>

      <select
        value={seriesType}
        onChange={(e) =>
          setSeriesType(
            e.target.value
          )
        }
        className="w-full bg-[#111827] border border-[#223554] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
      >

        <option>
          World Cup
        </option>

        <option>
          Round Robin
        </option>

        <option>
          Tri Series
        </option>

        <option>
          Bilateral Series
        </option>

        <option>
          3 Match Series
        </option>

        <option>
          5 Match Series
        </option>

      </select>

    </div>

  </div>

  {/* Teams */}

  <div className="mb-6">

    <div className="flex items-center justify-between mb-4">

      <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
        Select Teams
      </h3>

      <span className="text-xs text-slate-400">
        {selectedTeams.length} Selected
      </span>

    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">

      {teamsList.map(team => {

        const active =
          selectedTeams.includes(
            team
          );

        return (

          <button
            type="button"
            key={team}
            onClick={() =>
              toggleTeam(team)
            }
            className={`py-3 rounded-xl font-bold border transition-all duration-200 ${
              active
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-[#111827] text-slate-300 border-[#223554] hover:border-cyan-500/50 hover:text-white'
            }`}
          >

            {team}

          </button>

        );

      })}

    </div>

  </div>

  {/* Generate Button */}

  <button
    type="button"
    onClick={
      generateFixtures
    }
    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
  >

    Generate Tournament

  </button>

</div>


);

}
