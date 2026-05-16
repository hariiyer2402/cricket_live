import { useState } from 'react';

interface Props {
  matchId: string;
  team1: string;
  team2: string;
}

export default function LiveScoringPanel({
  team1,
  team2,
}: Props) {

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

    setBatters(prev => [
      ...prev,
      {
        name: batterName,
        runs,
        balls,
        fours,
        sixes,
        strikeRate,
      },
    ]);

    setBatterName('');
    setRuns('');
    setBalls('');
    setFours('');
    setSixes('');

  };

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

    setTeam2Batters(prev => [
      ...prev,
      {
        name: team2BatterName,
        runs: team2Runs,
        balls: team2Balls,
        fours: team2Fours,
        sixes: team2Sixes,
        strikeRate,
      },
    ]);

    setTeam2BatterName('');
    setTeam2Runs('');
    setTeam2Balls('');
    setTeam2Fours('');
    setTeam2Sixes('');

  };

  // ADD TEAM 1 BOWLER

  const addBowler = () => {

    if (
      !bowlerName ||
      !overs ||
      !runsGiven
    ) return;

    const economy =
      (
        Number(runsGiven) /
        Number(overs)
      ).toFixed(2);

    setBowlers(prev => [
      ...prev,
      {
        name: bowlerName,
        overs,
        runsGiven,
        wickets,
        economy,
      },
    ]);

    setBowlerName('');
    setOvers('');
    setRunsGiven('');
    setWickets('');

  };

  // ADD TEAM 2 BOWLER

  const addTeam2Bowler = () => {

    if (
      !team2BowlerName ||
      !team2Overs ||
      !team2RunsGiven
    ) return;

    const economy =
      (
        Number(team2RunsGiven) /
        Number(team2Overs)
      ).toFixed(2);

    setTeam2Bowlers(prev => [
      ...prev,
      {
        name: team2BowlerName,
        overs: team2Overs,
        runsGiven: team2RunsGiven,
        wickets: team2Wickets,
        economy,
      },
    ]);

    setTeam2BowlerName('');
    setTeam2Overs('');
    setTeam2RunsGiven('');
    setTeam2Wickets('');

  };

  return (

    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}

        <div className="space-y-6">

          {/* TEAM 1 BATTING */}

          <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

            <div className="px-6 py-4 bg-[#16263D] border-b border-[#223554]">

              <h2 className="text-2xl font-black text-white">

                {team1} Batting

              </h2>

            </div>

            {/* KEEP REST OF YOUR EXISTING JSX BELOW */}

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
                className="primary-btn w-full py-3 rounded-xl"
              >

                Add Batter

              </button>

              <div className="overflow-x-auto mt-5">

                <table className="w-full">

                  <thead>

                    <tr className="text-slate-400 text-sm border-b border-[#223554]">

                      <th className="py-3 text-left">
                        Batter
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

                    {batters.map((batter, index) => (

                      <tr
                        key={index}
                        className="border-b border-[#223554]/40 text-center"
                      >

                        <td className="py-3 text-left text-white font-semibold">
                          {batter.name}
                        </td>

                        <td>{batter.runs}</td>

                        <td>{batter.balls}</td>

                        <td>{batter.fours}</td>

                        <td>{batter.sixes}</td>

                        <td className="text-cyan-400 font-bold">
                          {batter.strikeRate}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* TEAM 1 BOWLING */}

          <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

            <div className="px-6 py-4 bg-[#16263D] border-b border-[#223554]">

              <h2 className="text-2xl font-black text-white">

                {team1} Bowling

              </h2>

            </div>

            <div className="p-6 space-y-4">

              <input
                type="text"
                placeholder={`${team1} Bowler Name`}
                value={bowlerName}
                onChange={(e) =>
                  setBowlerName(
                    e.target.value
                  )
                }
              />

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
                className="secondary-btn w-full py-3 rounded-xl"
              >

                Add Bowler

              </button>

              <div className="overflow-x-auto mt-5">

                <table className="w-full">

                  <thead>

                    <tr className="text-slate-400 text-sm border-b border-[#223554]">

                      <th className="py-3 text-left">
                        Bowler
                      </th>

                      <th>O</th>

                      <th>R</th>

                      <th>W</th>

                      <th>Econ</th>

                    </tr>

                  </thead>

                  <tbody>

                    {bowlers.map((bowler, index) => (

                      <tr
                        key={index}
                        className="border-b border-[#223554]/40 text-center"
                      >

                        <td className="py-3 text-left text-white font-semibold">
                          {bowler.name}
                        </td>

                        <td>{bowler.overs}</td>

                        <td>{bowler.runsGiven}</td>

                        <td>{bowler.wickets}</td>

                        <td className="text-emerald-400 font-bold">
                          {bowler.economy}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-6">

          {/* TEAM 2 BATTING */}

          <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

            <div className="px-6 py-4 bg-[#16263D] border-b border-[#223554]">

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
                className="primary-btn w-full py-3 rounded-xl"
              >

                Add Batter

              </button>

              <div className="overflow-x-auto mt-5">

                <table className="w-full">

                  <thead>

                    <tr className="text-slate-400 text-sm border-b border-[#223554]">

                      <th className="py-3 text-left">
                        Batter
                      </th>

                      <th>R</th>

                      <th>B</th>

                      <th>4s</th>

                      <th>6s</th>

                      <th>SR</th>

                    </tr>

                  </thead>

                  <tbody>

                    {team2Batters.map((batter, index) => (

                      <tr
                        key={index}
                        className="border-b border-[#223554]/40 text-center"
                      >

                        <td className="py-3 text-left text-white font-semibold">
                          {batter.name}
                        </td>

                        <td>{batter.runs}</td>

                        <td>{batter.balls}</td>

                        <td>{batter.fours}</td>

                        <td>{batter.sixes}</td>

                        <td className="text-cyan-400 font-bold">
                          {batter.strikeRate}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* TEAM 2 BOWLING */}

          <div className="bg-[#111C30] border border-[#223554] rounded-3xl overflow-hidden">

            <div className="px-6 py-4 bg-[#16263D] border-b border-[#223554]">

              <h2 className="text-2xl font-black text-white">

                {team2} Bowling

              </h2>

            </div>

            <div className="p-6 space-y-4">

              <input
                type="text"
                placeholder={`${team2} Bowler Name`}
                value={team2BowlerName}
                onChange={(e) =>
                  setTeam2BowlerName(
                    e.target.value
                  )
                }
              />

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
                className="secondary-btn w-full py-3 rounded-xl"
              >

                Add Bowler

              </button>

              <div className="overflow-x-auto mt-5">

                <table className="w-full">

                  <thead>

                    <tr className="text-slate-400 text-sm border-b border-[#223554]">

                      <th className="py-3 text-left">
                        Bowler
                      </th>

                      <th>O</th>

                      <th>R</th>

                      <th>W</th>

                      <th>Econ</th>

                    </tr>

                  </thead>

                  <tbody>

                    {team2Bowlers.map((bowler, index) => (

                      <tr
                        key={index}
                        className="border-b border-[#223554]/40 text-center"
                      >

                        <td className="py-3 text-left text-white font-semibold">
                          {bowler.name}
                        </td>

                        <td>{bowler.overs}</td>

                        <td>{bowler.runsGiven}</td>

                        <td>{bowler.wickets}</td>

                        <td className="text-emerald-400 font-bold">
                          {bowler.economy}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}