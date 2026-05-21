import { useEffect, useState } from 'react';

interface Props {
  matchId: string;
  team1: string;
  team2: string;
}

export default function LiveScoringPanel({
  matchId,
  team1,
  team2,
}: Props) {
// ------------------------------------------------------------------------------------------------------
  // TEAM 1 BATTERS

  const [batters, setBatters] =
    useState<any[]>(Array.from(
      { length: 11 },

      (_, i) => ({

        name:
          `${team1} Player ${i + 1}`,

        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,

        strikeRate: '0.00',

        out: false,

      })

    )

  );

  const [batterName, setBatterName] =
    useState('');

  const [runs, setRuns] =
    useState('');

  const [balls, setBalls] =
    useState('');

  const [fours, setFours] =
    useState('');

  const [sixes, setSixes] =
    useState('');

  // TEAM 2 BATTERS

  const [team2Batters, setTeam2Batters] =
    useState<any[]>( Array.from(
      { length: 11 },

      (_, i) => ({

        name:
          `${team2} Player ${i + 1}`,

        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,

        strikeRate: '0.00',

        out: false,

      })

    )

  );

  const [team2BatterName, setTeam2BatterName] =
    useState('');

  const [team2Runs, setTeam2Runs] =
    useState('');

  const [team2Balls, setTeam2Balls] =
    useState('');

  const [team2Fours, setTeam2Fours] =
    useState('');

  const [team2Sixes, setTeam2Sixes] =
    useState('');
// ------------------------------------------------------------------------------------------------------
  // TEAM 1 BOWLERS

  const [bowlers, setBowlers] =
    useState<any[]>([]);

  const [bowlerName, setBowlerName] =
    useState('');

  const [overs, setOvers] =
    useState('');

  const [runsGiven, setRunsGiven] =
    useState('');

  const [wickets, setWickets] =
    useState('');
// ------------------------------------------------------------------------------------------------------
  // TEAM 2 BOWLERS

  const [team2Bowlers, setTeam2Bowlers] =
    useState<any[]>([]);

  const [team2BowlerName, setTeam2BowlerName] =
    useState('');

  const [team2Overs, setTeam2Overs] =
    useState('');

  const [team2RunsGiven, setTeam2RunsGiven] =
    useState('');

  const [team2Wickets, setTeam2Wickets] =
    useState('');
// ------------------------------------------------------------------------------------------------------
  // MATCH STATUS

  const [matchCompleted, setMatchCompleted] =
    useState(false);

  const [loaded, setLoaded] =
  useState(false);

  const [statsSaved, setStatsSaved] =
  useState(false);
// ------------------------------------------------------------------------------------------------------
  // LOAD SAVED MATCH

  useEffect(() => {
// ------------------------------------------------------------------------------------------------------
  // RESET OLD MATCH STATE

  setBatters([]);
  setBowlers([]);

  setTeam2Batters([]);
  setTeam2Bowlers([]);

  setMatchCompleted(false);

  setStatsSaved(false);

  setLoaded(false);

  // LOAD CURRENT MATCH
// ------------------------------------------------------------------------------------------------------
  const savedMatch =
    localStorage.getItem(
      `match_${matchId}`
    );

  if (savedMatch) {

    const parsed =
      JSON.parse(savedMatch);

    setBatters(
      parsed.batters || []
    );

    setBowlers(
      parsed.bowlers || []
    );

    setTeam2Batters(
      parsed.team2Batters || []
    );

    setTeam2Bowlers(
      parsed.team2Bowlers || []
    );

    setMatchCompleted(
      parsed.matchCompleted || false
    );

    setStatsSaved(
      parsed.statsSaved || false
    );

  }

  setLoaded(true);

}, [matchId]);
// ------------------------------------------------------------------------------------------------------
  // SAVE MATCH

  useEffect(() => {

  if (!loaded) return;

  localStorage.setItem(

    `match_${matchId}`,

    JSON.stringify({

      batters,
      bowlers,
      team2Batters,
      team2Bowlers,
      matchCompleted,
      statsSaved,

    })

  );

}, [

  loaded,
  batters,
  bowlers,
  team2Batters,
  team2Bowlers,
  matchCompleted,
  matchId,

]);
// ------------------------------------------------------------------------------------------------------
  // ADD TEAM 1 BATTER

  const addBatter = () => {

    if (
      !batterName ||
      !runs ||
      !balls
    ) return;

    const strikeRate =
      (
        (Number(runs) /
          Number(balls)) *
        100
      ).toFixed(2);

setBatters(prev => {

  const existingPlayerIndex =
    prev.findIndex(
      player =>
        player.name
          .trim()
          .toLowerCase() ===
        batterName
          .trim()
          .toLowerCase()
    );

  if (existingPlayerIndex !== -1) {

    const updatedBatters =
      [...prev];

    updatedBatters[
      existingPlayerIndex
    ] = {

      ...updatedBatters[
        existingPlayerIndex
      ],

      runs,
      balls,
      fours,
      sixes,
      strikeRate,

    };

    return updatedBatters;

  }

  return [

    ...prev,

    {
      name: batterName,
      runs,
      balls,
      fours,
      sixes,
      strikeRate,
      out: false,
    },

  ];

});

    setBatterName('');
    setRuns('');
    setBalls('');
    setFours('');
    setSixes('');

  };
// ------------------------------------------------------------------------------------------------------
  // ADD TEAM 2 BATTER

  const addTeam2Batter = () => {

    if (
      !team2BatterName ||
      !team2Runs ||
      !team2Balls
    ) return;

    const strikeRate =
      (
        (Number(team2Runs) /
          Number(team2Balls)) *
        100
      ).toFixed(2);

setBatters(prev => {

  const existingPlayerIndex =
    prev.findIndex(
      player =>
        player.name
          .trim()
          .toLowerCase() ===
        batterName
          .trim()
          .toLowerCase()
    );

  if (existingPlayerIndex !== -1) {

    const updatedBatters =
      [...prev];

    updatedBatters[
      existingPlayerIndex
    ] = {

      ...updatedBatters[
        existingPlayerIndex
      ],

      runs,
      balls,
      fours,
      sixes,
      strikeRate,

    };

    return updatedBatters;

  }

  return [

    ...prev,

    {
      name: batterName,
      runs,
      balls,
      fours,
      sixes,
      strikeRate,
      out: false,
    },

  ];

});

    setTeam2BatterName('');
    setTeam2Runs('');
    setTeam2Balls('');
    setTeam2Fours('');
    setTeam2Sixes('');

  };
// ------------------------------------------------------------------------------------------------------
  // ADD TEAM 1 BOWLER

  const addBowler = () => {

    if (
      !bowlerName ||
      !overs ||
      !runsGiven
    ) return;

    setBowlers(prev => {

      const existingBowlerIndex =
        prev.findIndex(
          bowler =>
            bowler.name
              .trim()
              .toLowerCase() ===
            bowlerName
              .trim()
              .toLowerCase()
        );

      if (
        existingBowlerIndex !== -1
      ) {

        const updatedBowlers =
          [...prev];

        const existingBowler =
          updatedBowlers[
            existingBowlerIndex
          ];

        const updatedOvers =
          Number(
            existingBowler.overs
          ) + Number(overs);

        const updatedRuns =
          Number(
            existingBowler.runsGiven
          ) + Number(runsGiven);

        const updatedWickets =
          Number(
            existingBowler.wickets
          ) + Number(wickets);

        updatedBowlers[
          existingBowlerIndex
        ] = {

          ...existingBowler,

          overs: updatedOvers,

          runsGiven: updatedRuns,

          wickets: updatedWickets,

          economy:
            (
              updatedRuns /
              updatedOvers
            ).toFixed(2),

        };

        return updatedBowlers;

      }

      return [

        ...prev,

        {
          name:
            bowlerName.trim(),

          overs:
            Number(overs),

          runsGiven:
            Number(runsGiven),

          wickets:
            Number(wickets),

          economy:
            (
              Number(runsGiven) /
              Number(overs)
            ).toFixed(2),

        },

      ];

    });

    setBowlerName('');
    setOvers('');
    setRunsGiven('');
    setWickets('');

  };
// ------------------------------------------------------------------------------------------------------
  // ADD TEAM 2 BOWLER

  const addTeam2Bowler = () => {

    if (
      !team2BowlerName ||
      !team2Overs ||
      !team2RunsGiven
    ) return;

    setTeam2Bowlers(prev => {

      const existingBowlerIndex =
        prev.findIndex(
          bowler =>
            bowler.name
              .trim()
              .toLowerCase() ===
            team2BowlerName
              .trim()
              .toLowerCase()
        );

      if (
        existingBowlerIndex !== -1
      ) {

        const updatedBowlers =
          [...prev];

        const existingBowler =
          updatedBowlers[
            existingBowlerIndex
          ];

        const updatedOvers =
          Number(
            existingBowler.overs
          ) + Number(team2Overs);

        const updatedRuns =
          Number(
            existingBowler.runsGiven
          ) + Number(team2RunsGiven);

        const updatedWickets =
          Number(
            existingBowler.wickets
          ) + Number(team2Wickets);

        updatedBowlers[
          existingBowlerIndex
        ] = {

          ...existingBowler,

          overs: updatedOvers,

          runsGiven: updatedRuns,

          wickets: updatedWickets,

          economy:
            (
              updatedRuns /
              updatedOvers
            ).toFixed(2),

        };

        return updatedBowlers;

      }

      return [

        ...prev,

        {
          name:
            team2BowlerName.trim(),

          overs:
            Number(team2Overs),

          runsGiven:
            Number(team2RunsGiven),

          wickets:
            Number(team2Wickets),

          economy:
            (
              Number(team2RunsGiven) /
              Number(team2Overs)
            ).toFixed(2),

        },

      ];

    });

    setTeam2BowlerName('');
    setTeam2Overs('');
    setTeam2RunsGiven('');
    setTeam2Wickets('');

  };
// ---------------------------------------------------------------------------------------------
  // TEAM 1 TOTAL SCORE

const team1TotalRuns =
  batters.reduce(
    (acc, batter) =>
      acc + Number(batter.runs || 0),
    0
  );

const team1WicketsLost =
  batters.filter(
    batter =>
      batter.howOut &&
      batter.howOut !== 'not out'
  ).length;

const team1TotalBalls =
  batters.reduce(
    (acc, batter) =>
      acc + Number(batter.balls || 0),
    0
  );

const team1OversPlayed =
  (
    team1TotalBalls / 6
  ).toFixed(1);

const team1CRR =
  (
    team1TotalRuns /
    Number(team1OversPlayed || 1)
  ).toFixed(2);

// TEAM 2 TOTAL SCORE

const team2TotalRuns =
  team2Batters.reduce(
    (acc, batter) =>
      acc + Number(batter.runs || 0),
    0
  );

const team2WicketsLost =
  team2Batters.filter(
    batter =>
      batter.howOut &&
      batter.howOut !== 'not out'
  ).length;

const team2TotalBalls =
  team2Batters.reduce(
    (acc, batter) =>
      acc + Number(batter.balls || 0),
    0
  );

const team2OversPlayed =
  (
    team2TotalBalls / 6
  ).toFixed(1);

const team2CRR =
  (
    team2TotalRuns /
    Number(team2OversPlayed || 1)
  ).toFixed(2);

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
{/* ------------------------------------------------------------------------------------------------------------ */}


      
{/* ------------------------------------------------------------------------------------------------------ */}
      {/* TEAM 1 BATTING */}

      <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

        <div className="p-6 border-b border-[#223554]">

          <h2 className="text-2xl font-black text-white">
            {team1} Batting
          </h2>

        </div>

        <div className="p-6 space-y-4">

          <input
            type="text"
            placeholder={`${team1} Batter Name`}
            value={batterName}
            onChange={(e) =>
              setBatterName(
                e.target.value
              )
            }
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Runs"
              value={runs}
              onChange={(e) =>
                setRuns(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Balls"
              value={balls}
              onChange={(e) =>
                setBalls(
                  e.target.value
                )
              }
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="4s"
              value={fours}
              onChange={(e) =>
                setFours(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="6s"
              value={sixes}
              onChange={(e) =>
                setSixes(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={addBatter}
            className="w-full bg-cyan-500 text-white py-4 rounded-2xl font-bold"
          >
            Add Batter
          </button>

          <table className="w-full text-white">

            <thead>

              <tr className="bg-[#0F4CFF] text-white uppercase text-sm">

                <th className="text-left px-4 py-3">
                    Batter
                  </th>

                  <th>
                    How Out
                  </th>

                  <th>
                    R
                  </th>

                  <th>
                    B
                  </th>

                  <th>
                    4s
                  </th>

                  <th>
                    6s
                  </th>

                  <th>
                    SR
                  </th>

              </tr>

            </thead>

            <tbody>

              {batters.map(
                (batter, index) => (

                  <tr 
                    key={index}
                    className="hover:bg-[#16263D] transition-all"
                  >

                    <td className="font-bold py-3 px-4">

                      {batter.name}

                      {(batter.howOut === 'not out' ||
                        !batter.howOut) && (
                        <span className="text-cyan-400">
                          *
                        </span>
                      )}

                    </td>
                    
                    <td className="text-slate-300">

          {batter.howOut &&
batter.howOut !== 'not out' ? (

  <span className="text-slate-300 text-sm">

    {batter.howOut}

  </span>

) : (

  <select

    value={batter.howOut || 'not out'}

    onChange={(e) => {

      const updated =
        [...batters];

      updated[index].howOut =
        e.target.value;

      setBatters(updated);

    }}

    className="
      bg-[#16263D]
      border border-[#223554]
      rounded-xl
      px-3
      py-2
      text-sm
      text-white
    "
  >

    <option value="not out">
      Not Out
    </option>

    <option value="Bowled">
      Bowled
    </option>

    <option value="Catch">
      Catch
    </option>

    <option value="Run Out">
      Run Out
    </option>

    <option value="LBW">
      LBW
    </option>

    <option value="Stumped">
      Stumped
    </option>

  </select>

)}

            </td>

                    <td className="py-3">{batter.runs}</td>
                    <td className="py-3 text-slate-300">
                      {batter.balls}
                    </td>
                    <td className="py-3 text-slate-300">
                      {batter.fours}
                    </td>
                    <td className="py-3 text-slate-300">
                      {batter.sixes}
                    </td>
                    <td className="py-3 text-cyan-400 font-semibold">
                      {batter.strikeRate}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>
{/* ------------------------------------------------------------------------------------------------------ */}
      {/* TEAM 2 BATTING */}

      <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

        <div className="p-6 border-b border-[#223554]">

          <h2 className="text-2xl font-black text-white">
            {team2} Batting
          </h2>

        </div>

        <div className="p-6 space-y-4">

          <input
            type="text"
            placeholder={`${team2} Batter Name`}
            value={team2BatterName}
            onChange={(e) =>
              setTeam2BatterName(
                e.target.value
              )
            }
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Runs"
              value={team2Runs}
              onChange={(e) =>
                setTeam2Runs(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Balls"
              value={team2Balls}
              onChange={(e) =>
                setTeam2Balls(
                  e.target.value
                )
              }
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="4s"
              value={team2Fours}
              onChange={(e) =>
                setTeam2Fours(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="6s"
              value={team2Sixes}
              onChange={(e) =>
                setTeam2Sixes(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={addTeam2Batter}
            className="w-full bg-cyan-500 text-white py-4 rounded-2xl font-bold"
          >
            Add Batter
          </button>

          <table className="w-full text-white">

            <thead>

              <tr className="bg-[#0F4CFF] text-white uppercase text-sm">

                <th>Batter</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>

              </tr>

            </thead>

            <tbody className="divide-y divide-[#223554]">

              {team2Batters.map(
                (batter, index) => (

                  <tr 
                    key={index}
                    className="hover:bg-[#16263D] transition-all"
                  >

                    <td className="font-bold py-3 px-4">

                      {batter.name}

                      {!batter.out && (
                        <span className="text-cyan-400">
                          *
                        </span>
                      )}

                    </td>
                    
                    <td className="text-slate-300">

                      <select

    value={batter.howOut || 'not out'}

    onChange={(e) => {

      const updated =
        [...batters];

      updated[index].howOut =
        e.target.value;

      setBatters(updated);

    }}

    className="
      bg-transparent
      border-none
      text-sm
      text-slate-300
      w-[130px]
      p-0
      focus:ring-0
    "
  >

    <option value="not out">
      Not Out
    </option>

    <option value="Bowled">
      Bowled
    </option>

    <option value="Catch">
      Catch
    </option>

    <option value="Run Out">
      Run Out
    </option>

    <option value="LBW">
      LBW
    </option>

    <option value="Stumped">
      Stumped
    </option>

  </select>

                    </td>


                    <td className="py-3 font-bold text-white">
                      {batter.runs}
                    </td>
                    <td className="py-3 text-slate-300">
                      {batter.balls}
                    </td>
                    <td className="py-3 text-slate-300">
                      {batter.fours}
                    </td>
                    <td className="py-3 text-slate-300">
                      {batter.sixes}
                    </td>
                    <td className="py-3 text-cyan-400 font-semibold">
                      {batter.strikeRate}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>
{/* ------------------------------------------------------------------------------------------------------ */}
      {/* TEAM 1 BOWLING */}

      <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

        <div className="p-6 border-b border-[#223554]">

          <h2 className="text-2xl font-black text-white">
            {team1} Bowling
          </h2>

        </div>

        <div className="p-6 space-y-4">

          <input
            list="team1-bowlers"
              type="text"
              placeholder={`${team1} Bowler Name`}
              value={bowlerName}
              onChange={(e) =>
                setBowlerName(
                  e.target.value
                )
              }
          />

<datalist id="team1-bowlers">

  {batters.map(
    (player, index) => (

      <option
        key={index}
        value={player.name}
      />

    )
  )}

</datalist>


          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Overs"
              value={overs}
              onChange={(e) =>
                setOvers(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Runs"
              value={runsGiven}
              onChange={(e) =>
                setRunsGiven(
                  e.target.value
                )
              }
            />

          </div>

          <input
            type="number"
            placeholder="Wickets"
            value={wickets}
            onChange={(e) =>
              setWickets(
                e.target.value
              )
            }
          />

          <button
            onClick={addBowler}
            className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold"
          >
            Add Bowler
          </button>

          <table className="w-full text-white">

            <thead>

              <tr className="text-left border-b border-[#223554]">

                <th>Bowler</th>
                <th>O</th>
                <th>R</th>
                <th>W</th>
                <th>Econ</th>

              </tr>

            </thead>

            <tbody>

              {bowlers.map(
                (bowler, index) => (

                  <tr key={index}>

                    <td>{bowler.name}</td>
                    <td>{bowler.overs}</td>
                    <td>{bowler.runsGiven}</td>
                    <td>{bowler.wickets}</td>
                    <td>{bowler.economy}</td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>
{/* ------------------------------------------------------------------------------------------------------ */}
      {/* TEAM 2 BOWLING */}

      <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

        <div className="p-6 border-b border-[#223554]">

          <h2 className="text-2xl font-black text-white">
            {team2} Bowling
          </h2>

        </div>

        <div className="p-6 space-y-4">

        <input
            list="team2-bowlers"
            type="text"
            placeholder={`${team2} Bowler Name`}
            value={team2BowlerName}
            onChange={(e) =>
              setTeam2BowlerName(
                e.target.value
              )
            }
        />   

        <datalist id="team2-bowlers">
        
          {team2Batters.map(
            (player, index) => (
            
              <option
                key={index}
                value={player.name}
              />
            
            )
          )}

        </datalist>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Overs"
              value={team2Overs}
              onChange={(e) =>
                setTeam2Overs(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Runs"
              value={team2RunsGiven}
              onChange={(e) =>
                setTeam2RunsGiven(
                  e.target.value
                )
              }
            />

          </div>

          <input
            type="number"
            placeholder="Wickets"
            value={team2Wickets}
            onChange={(e) =>
              setTeam2Wickets(
                e.target.value
              )
            }
          />

          <button
            onClick={addTeam2Bowler}
            className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold"
          >
            Add Bowler
          </button>

          <table className="w-full text-white">

            <thead>

              <tr className="text-left border-b border-[#223554]">

                <th>Bowler</th>
                <th>O</th>
                <th>R</th>
                <th>W</th>
                <th>Econ</th>

              </tr>

            </thead>

            <tbody>

              {team2Bowlers.map(
                (bowler, index) => (

                  <tr key={index}>

                    <td>{bowler.name}</td>
                    <td>{bowler.overs}</td>
                    <td>{bowler.runsGiven}</td>
                    <td>{bowler.wickets}</td>
                    <td>{bowler.economy}</td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

<div className="xl:col-span-2 flex justify-center pt-4">

  <button

    onClick={() => {

      if (statsSaved) return;
 let existingPlayers =
    JSON.parse(
      localStorage.getItem(
        'player_stats_data'
      ) || '[]'
    );
// ------------------------------------------------------------------------------------------------------
  // TRACK MATCH PARTICIPATION
  const updatedThisMatch =
    new Set<string>();
// ------------------------------------------------------------------------------------------------------
  // UNIVERSAL PLAYER UPDATE

  const updatePlayerStats = (

    playerName: string,
    playerTeam: string,
    runsToAdd: number,
    wicketsToAdd: number

  ) => {

    const playerKey =
      `${playerName.trim().toLowerCase()}_${playerTeam}`;

    const existingPlayer =
      existingPlayers.find(
        (p: any) =>

          p.name
            .trim()
            .toLowerCase() ===
          playerName
            .trim()
            .toLowerCase()

          &&

          p.team === playerTeam
      );

    if (existingPlayer) {

      existingPlayer.runs =
        Number(existingPlayer.runs || 0)
        + runsToAdd;

      existingPlayer.wickets =
        Number(existingPlayer.wickets || 0)
        + wicketsToAdd;

      // ONLY COUNT MATCH ONCE
// ------------------------------------------------------------------------------------------------------
      if (
        !updatedThisMatch.has(
          playerKey
        )
      ) {

        existingPlayer.matches =
          Number(
            existingPlayer.matches || 0
          ) + 1;

        updatedThisMatch.add(
          playerKey
        );

      }

      existingPlayer.lastUpdated =
        Date.now();

    }

    else {

      existingPlayers.push({

        id:
          Date.now() +
          Math.random(),

        name:
          playerName.trim(),

        team:
          playerTeam,

        runs:
          runsToAdd,

        wickets:
          wicketsToAdd,

        matches: 1,

        lastUpdated:
          Date.now(),

      });

      updatedThisMatch.add(
        playerKey
      );

    }

  };

  // TEAM 1 BATTERS
// ------------------------------------------------------------------------------------------------------
  batters.forEach((batter: any) => {

    updatePlayerStats(

      batter.name,
      team1,

      Number(batter.runs || 0),

      0

    );

  });
// ------------------------------------------------------------------------------------------------------
  // TEAM 2 BATTERS

  team2Batters.forEach((batter: any) => {

    updatePlayerStats(

      batter.name,
      team2,

      Number(batter.runs || 0),

      0

    );

  });
// ------------------------------------------------------------------------------------------------------
  // TEAM 1 BOWLERS

  bowlers.forEach((bowler: any) => {

    updatePlayerStats(

      bowler.name,
      team1,

      0,

      Number(bowler.wickets || 0)

    );

  });
// ------------------------------------------------------------------------------------------------------
  // TEAM 2 BOWLERS

  team2Bowlers.forEach((bowler: any) => {

    updatePlayerStats(

      bowler.name,
      team2,

      0,

      Number(bowler.wickets || 0)

    );

  });
// ------------------------------------------------------------------------------------------------------
  // REMOVE DUPLICATES

  existingPlayers =
    existingPlayers.filter(

      (
        player: any,
        index: number,
        self: any[]
      ) =>

        index ===
        self.findIndex(

          (p: any) =>

            p.name
              .trim()
              .toLowerCase() ===
            player.name
              .trim()
              .toLowerCase()

            &&

            p.team ===
            player.team
        )
    );
// ------------------------------------------------------------------------------------------------------
  // AUTO SORT

  existingPlayers.sort(

    (a: any, b: any) => {

      if (
        b.runs !== a.runs
      ) {
        return (
          b.runs - a.runs
        );
      }

      return (
        b.wickets -
        a.wickets
      );

    }
  );
// ------------------------------------------------------------------------------------------------------
  // SAVE

  localStorage.setItem(

    'player_stats_data',

    JSON.stringify(
      existingPlayers
    )

  );
// ------------------------------------------------------------------------------------------------------
  // FORCE LIVE UPDATE

  window.dispatchEvent(
    new Event('storage')
  );

  setMatchCompleted(true);

  setStatsSaved(true);

}}
    disabled={matchCompleted}

    className={`px-10 py-4 rounded-2xl text-xl font-black

    ${matchCompleted

      ? 'bg-emerald-600 text-white'

      : 'bg-red-500 hover:bg-red-400 text-white'

    }`}
  >

    {matchCompleted
      ? 'Match Completed'
      : 'Complete Match'}

  </button>

</div>

</div>

);

}
// ------------------------------------------------------------------------------------------------------