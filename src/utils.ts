import { TeamStats, MatchResult } from './types';
import { TEAMS } from './data';

export function calcNRR(
  forRuns: number,
  forOvers: number,
  againstRuns: number,
  againstOvers: number
): number {

  if (
    forOvers === 0 ||
    againstOvers === 0
  ) {

    return 0;

  }

  return parseFloat(
    (
      forRuns / forOvers -
      againstRuns /
        againstOvers
    ).toFixed(3)
  );

}

export function rebuildStandings(
  matches: MatchResult[],
  selectedTeams?: string[]
): TeamStats[] {

  const stats: Record<
    string,
    TeamStats
  > = {};

  // ONLY TOURNAMENT TEAMS

  const filteredTeams =
    selectedTeams?.length
      ? TEAMS.filter(team =>
          selectedTeams.includes(
            team.id
          )
        )
      : TEAMS;

  filteredTeams.forEach(t => {

    stats[t.id] = {
      ...t,
    };

  });

  // MATCH LOOP

  for (const m of matches) {

    const t1 =
      stats[m.team1];

    const t2 =
      stats[m.team2];

    if (!t1 || !t2)
      continue;

    t1.played++;
    t2.played++;

    if (
      m.winner === 'nr'
    ) {

      t1.noResult++;
      t2.noResult++;

      t1.points++;
      t2.points++;

    } else if (
      m.winner ===
      m.team1
    ) {

      t1.won++;
      t2.lost++;

      t1.points += 2;

      t1.forRuns +=
        m.team1Runs;

      t1.forOvers +=
        m.team1Overs;

      t1.againstRuns +=
        m.team2Runs;

      t1.againstOvers +=
        m.team2Overs;

      t2.forRuns +=
        m.team2Runs;

      t2.forOvers +=
        m.team2Overs;

      t2.againstRuns +=
        m.team1Runs;

      t2.againstOvers +=
        m.team1Overs;

    } else {

      t2.won++;
      t1.lost++;

      t2.points += 2;

      t1.forRuns +=
        m.team1Runs;

      t1.forOvers +=
        m.team1Overs;

      t1.againstRuns +=
        m.team2Runs;

      t1.againstOvers +=
        m.team2Overs;

      t2.forRuns +=
        m.team2Runs;

      t2.forOvers +=
        m.team2Overs;

      t2.againstRuns +=
        m.team1Runs;

      t2.againstOvers +=
        m.team1Overs;

    }

  }

  // FINAL LIST

  const list =
    Object.values(stats).map(
      t => ({

        ...t,

        nrr: calcNRR(
          t.forRuns,
          t.forOvers,
          t.againstRuns,
          t.againstOvers
        ),

      })
    );

  // SORT

  list.sort(
    (a, b) => {

      if (
        b.points !==
        a.points
      ) {

        return (
          b.points -
          a.points
        );

      }

      return (
        b.nrr - a.nrr
      );

    }
  );

  return list;

}

export function parseOvers(
  val: string
): number {

  const n =
    parseFloat(val);

  if (
    isNaN(n) ||
    n < 0
  )
    return -1;

  const balls =
    Math.round(
      (n % 1) * 10
    );

  if (balls > 5)
    return -1;

  return (
    Math.floor(n) +
    balls / 6
  );

}

export function formatNRR(
  nrr: number
): string {

  const sign =
    nrr >= 0 ? '+' : '';

  return `${sign}${nrr.toFixed(
    3
  )}`;

}