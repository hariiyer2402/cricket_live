import { useEffect, useState } from 'react';
import { playerDatabase } from '../playerDatabase';


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

const [team1Squad, setTeam1Squad] =
  useState(
    playerDatabase[
      team1 as keyof typeof playerDatabase
    ]
  );

const [team2Squad, setTeam2Squad] =
  useState(
    playerDatabase[
      team2 as keyof typeof playerDatabase
    ]
  );

const team1Players =
  team1Squad?.playingXI || [];

const team2Players =
  team2Squad?.playingXI || [];

const [showTeam1Squad, setShowTeam1Squad] =
  useState(false);

const [showTeam2Squad, setShowTeam2Squad] =
  useState(false);

const [selectedPlayer, setSelectedPlayer] =
  useState<string | null>(null);

const [selectedTeam2Player, setSelectedTeam2Player] =
  useState<string | null>(null);

// ------------------------------------------------------------------------------------------------------
  // TEAM 1 BATTERS

const [batters, setBatters] =
  useState<any[]>([]);

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
  useState<any[]>([]);

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

  // ADD TEAM 1 BATTER

const addBatter = () => {

  if (
    !batterName.trim() ||
    !runs ||
    !balls
  ) return;

  const strikeRate = (
    (Number(runs) / Number(balls)) * 100
  ).toFixed(2);

  setBatters(prev => {

    const existingPlayerIndex =
      prev.findIndex(
        player =>
          player.name.trim().toLowerCase() ===
          batterName.trim().toLowerCase()
      );

    // UPDATE EXISTING PLAYER

    if (existingPlayerIndex !== -1) {

      const updatedBatters = [...prev];

      updatedBatters[existingPlayerIndex] = {

        ...updatedBatters[existingPlayerIndex],

        runs: Number(runs),

        balls: Number(balls),

        fours: Number(fours || 0),

        sixes: Number(sixes || 0),

        strikeRate,

      };

      return updatedBatters;

    }

    // ADD NEW PLAYER

    return [

      ...prev,

      {

        name: batterName.trim(),

        runs: Number(runs),

        balls: Number(balls),

        fours: Number(fours || 0),

        sixes: Number(sixes || 0),

        strikeRate,

        howOut: 'not out',

      },

    ];

  });

  // CLEAR FORM

  setBatterName('');
  setRuns('');
  setBalls('');
  setFours('');
  setSixes('');

};
// ------------------------------------------------------------------------------------------------------
  // ADD TEAM 2 BATTER

  // ADD TEAM 2 BATTER

const addTeam2Batter = () => {

  if (
    !team2BatterName.trim() ||
    !team2Runs ||
    !team2Balls
  ) return;

  const strikeRate = (
    (Number(team2Runs) / Number(team2Balls)) * 100
  ).toFixed(2);

  setTeam2Batters(prev => {

    const existingPlayerIndex =
      prev.findIndex(
        player =>
          player.name.trim().toLowerCase() ===
          team2BatterName.trim().toLowerCase()
      );

    // UPDATE EXISTING PLAYER

    if (existingPlayerIndex !== -1) {

      const updatedBatters = [...prev];

      updatedBatters[existingPlayerIndex] = {

        ...updatedBatters[existingPlayerIndex],

        runs: Number(team2Runs),

        balls: Number(team2Balls),

        fours: Number(team2Fours || 0),

        sixes: Number(team2Sixes || 0),

        strikeRate,

      };

      return updatedBatters;

    }

    // ADD NEW PLAYER

    return [

      ...prev,

      {

        name: team2BatterName.trim(),

        runs: Number(team2Runs),

        balls: Number(team2Balls),

        fours: Number(team2Fours || 0),

        sixes: Number(team2Sixes || 0),

        strikeRate,

        howOut: 'not out',

      },

    ];

  });

  // CLEAR FORM

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


  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
{/* ------------------------------------------------------------------------------------------------------------ */}


      
{/* ------------------------------------------------------------------------------------------------------ */}
      {/* TEAM 1 BATTING */}

      <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-x-auto">

        <div className="p-6 border-b border-[#223554]">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-black text-white">
            {team1} Batting
          </h2>

          <button
            onClick={() =>
              setShowTeam1Squad(
                !showTeam1Squad
              )
            }
            className="
              bg-cyan-500
              text-white
              px-4
              py-2
              rounded-xl
              text-sm
              font-bold
            "
          >
            Manage Squad
          </button>
          
        </div>
      {showTeam1Squad && (

  <div className="p-6 border-b border-[#223554]">

    <h3 className="text-white font-bold mb-4">
      Playing XI
    </h3>

    <div className="space-y-2">

      {team1Squad?.playingXI.map(
        (player: string) => (

<div
  key={player}
onClick={() =>
  setSelectedPlayer(player)
}
  className={`
    font-medium
    cursor-pointer
    p-2
    rounded-lg
    ${
      selectedPlayer === player
        ? 'bg-cyan-500 text-white'
        : 'text-green-400'
    }
  `}
>
  ✓ {player}
</div>

        )
      )}

    </div>

    <h3 className="text-white font-bold mt-6 mb-4">
      Bench
    </h3>

    <div className="space-y-2">

      {team1Squad?.bench.map(
        (player: string) => (

<div
  key={player}
  onClick={() => {

    if (!selectedPlayer) return;

    setTeam1Squad((prev: any) => {

      const newPlayingXI =
        prev.playingXI.map(
          (p: string) =>
            p === selectedPlayer
              ? player
              : p
        );

      const newBench =
        prev.bench.map(
          (p: string) =>
            p === player
              ? selectedPlayer
              : p
        );

      return {
        ...prev,
        playingXI: newPlayingXI,
        bench: newBench,
      };

    });

    setSelectedPlayer(null);

  }}

  className="
    text-yellow-400
    font-medium
    cursor-pointer
    hover:bg-[#16263D]
    p-2
    rounded-lg
  "
>
  ○ {player}
</div>

        )
      )}

    </div>

  </div>

)}
        </div>

        <div className="p-6 space-y-4">
<>
  <input
    list="team1-players"
    type="text"
    placeholder={`${team1} Batter Name`}
    value={batterName}
    onChange={(e) =>
      setBatterName(e.target.value)
    }
  />

  <datalist id="team1-players">
    {team1Players.map((player) => (
      <option
        key={player}
        value={player}
      />
    ))}
  </datalist>
</>

          <div className="grid grid-cols-2 gap-3">

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

          <div className="grid grid-cols-2 gap-3">

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
            className="w-full bg-cyan-500 text-white py-3 rounded-2xl font-bold"
          >
            Add Batter
          </button>

          <div className="w-full overflow-x-auto">

          <table className="w-full min-w-full text-white">

            <thead>

              <tr className="bg-[#0F4CFF] text-white uppercase text-[11px] sm:text-sm">

                <th className="text-left px-4 py-3">
                    Batter
                  </th>

                  <th>
                      <span className="hidden sm:inline">
                          How Out
                        </span>
                                  
                        <span className="sm:hidden">
                          Out
                        </span>
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
                    key={`${batter.name}-${index}`}
                    className="hover:bg-[#16263D] transition-all"
                  >

                    <td className="font-bold py-3 px-2 sm:px-4">

                      {batter.name}

                  {(!batter.howOut ||
                    batter.howOut === 'not out') && (
                    <span className="text-cyan-400 ml-1">
                      *
                    </span>
                  )}

                    </td>
                    
                    <td className="py-3 px-2 text-slate-300">

  {batter.howOut &&
  batter.howOut !== 'not out' ? (

    <span className="text-slate-300 text-sm">
      {batter.howOut}
    </span>

  ) : (

    <select

      value={batter.howOut || 'not out'}

      onChange={(e) => {

        const updated = [...batters];

        updated[index].howOut =
          e.target.value;

        setBatters(updated);

      }}

      className="
        bg-[#16263D]
        border border-[#223554]
        rounded-lg
        px-2
        py-1
        text-xs
        sm:text-sm
        text-white
        w-full
        min-w-[90px]
      "
    >

      <option value="not out">
  Not Out
</option>

<option value="Bowled">
  Bowled
</option>

<option value="Caught">
  Caught
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

<option value="Hit Wicket">
  Hit Wicket
</option>

<option value="Retired Hurt">
  Retired Hurt
</option>

<option value="Retired Out">
  Retired Out
</option>

<option value="Obstructing the Field">
  Obstructing the Field
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

      </div>
{/* ------------------------------------------------------------------------------------------------------ */}
{/* TEAM 2 BATTING */}

<div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-x-auto">

  <div className="p-6 border-b border-[#223554]">

<div className="flex justify-between items-center">

  <h2 className="text-2xl font-black text-white">
    {team2} Batting
  </h2>

  <button
    onClick={() =>
      setShowTeam2Squad(
        !showTeam2Squad
      )
    }
    className="
      bg-cyan-500
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      font-bold
    "
  >
    Manage Squad
  </button>

</div>

  </div>

  <div className="p-3 sm:p-6 space-y-4">

  {showTeam2Squad && (

  <div className="p-6 border-b border-[#223554]">

    <h3 className="text-white font-bold mb-4">
      Playing XI
    </h3>

    <div className="space-y-2">

      {team2Squad?.playingXI.map(
        (player: string) => (

          <div
            key={player}
            onClick={() =>
              setSelectedTeam2Player(player)
            }
            className={`
              font-medium
              cursor-pointer
              p-2
              rounded-lg
              ${
                selectedTeam2Player === player
                  ? 'bg-cyan-500 text-white'
                  : 'text-green-400'
              }
            `}
          >
            ✓ {player}
          </div>

        )
      )}

    </div>

    <h3 className="text-white font-bold mt-6 mb-4">
      Bench
    </h3>

    <div className="space-y-2">

      {team2Squad?.bench.map(
        (player: string) => (

          <div
            key={player}
            onClick={() => {

              if (!selectedTeam2Player) return;

              setTeam2Squad((prev: any) => {

                const newPlayingXI =
                  prev.playingXI.map(
                    (p: string) =>
                      p === selectedTeam2Player
                        ? player
                        : p
                  );

                const newBench =
                  prev.bench.map(
                    (p: string) =>
                      p === player
                        ? selectedTeam2Player
                        : p
                  );

                return {
                  ...prev,
                  playingXI: newPlayingXI,
                  bench: newBench,
                };

              });

              setSelectedTeam2Player(null);

            }}

            className="
              text-yellow-400
              font-medium
              cursor-pointer
              hover:bg-[#16263D]
              p-2
              rounded-lg
            "
          >
            ○ {player}
          </div>

        )
      )}

    </div>

  </div>

)}

<>
  <input
    list="team2-players"
    type="text"
    placeholder={`${team2} Batter Name`}
    value={team2BatterName}
    onChange={(e) =>
      setTeam2BatterName(
        e.target.value
      )
    }
  />

  <datalist id="team2-players">
    {team2Players.map((player) => (
      <option
        key={player}
        value={player}
      />
    ))}
  </datalist>
</>

    <div className="grid grid-cols-2 gap-3">

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

    <div className="grid grid-cols-2 gap-3">

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
      className="w-full bg-cyan-500 text-white py-3 rounded-2xl font-bold"
    >
      Add Batter
    </button>

    <div className="w-full overflow-x-auto">

      <table className="w-full min-w-full text-white">

        <thead>

          <tr className="bg-[#0F4CFF] text-white uppercase text-[11px] sm:text-sm">

                <th className="text-left px-4 py-3">
                    Batter
                  </th>

                  <th>
                      <span className="hidden sm:inline">
                          How Out
                        </span>
                                  
                        <span className="sm:hidden">
                          Out
                        </span>
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

          {team2Batters.map(
            (batter, index) => (

              <tr
                key={`${batter.name}-${index}`}
                className="hover:bg-[#16263D] transition-all"
              >

                <td className="font-bold py-3 px-2 sm:px-4 whitespace-nowrap">

                  {batter.name}

                  {(!batter.howOut ||
                    batter.howOut === 'not out') && (
                    <span className="text-cyan-400 ml-1">
                      *
                    </span>
                  )}

                </td>

                <td className="py-3 px-2 text-slate-300 whitespace-nowrap">

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
                          [...team2Batters];

                        updated[index].howOut =
                          e.target.value;

                        setTeam2Batters(updated);

                      }}

                      className="
                        bg-[#16263D]
                        border border-[#223554]
                        rounded-lg
                        px-2
                        py-1
                        text-xs
                        sm:text-sm
                        text-white
                        w-full
                        min-w-[80px]
                      "
                    >

<option value="not out">
  Not Out
</option>

<option value="Bowled">
  Bowled
</option>

<option value="Caught">
  Caught
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

<option value="Hit Wicket">
  Hit Wicket
</option>

<option value="Retired Hurt">
  Retired Hurt
</option>

<option value="Retired Out">
  Retired Out
</option>

<option value="Obstructing the Field">
  Obstructing the Field
</option>

                    </select>

                  )}

                </td>

                <td className="py-2 px-1 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                  {batter.runs}
                </td>

                <td className="py-2 px-1 text-xs sm:text-sm text-slate-300 whitespace-nowrap">
                  {batter.balls}
                </td>

                <td className="py-2 px-1 text-xs sm:text-sm text-slate-300 whitespace-nowrap">
                  {batter.fours}
                </td>

                <td className="py-2 px-1 text-xs sm:text-sm text-slate-300 whitespace-nowrap">
                  {batter.sixes}
                </td>

                <td className="py-2 px-1 text-xs sm:text-sm text-cyan-400 font-semibold whitespace-nowrap">
                  {batter.strikeRate}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

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

<>
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
    {team1Players.map((player) => (
      <option
        key={player}
        value={player}
      />
    ))}
  </datalist>
</>

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
<>
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
    {team2Players.map((player) => (
      <option
        key={player}
        value={player}
      />
    ))}
  </datalist>
</>

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