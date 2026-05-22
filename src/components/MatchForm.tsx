import { useState } from 'react';
import { MatchResult } from '../types';
import { TEAMS } from '../data';
import { parseOvers } from '../utils';
import { PlusCircle, AlertCircle } from 'lucide-react';

interface Props {
  onAdd: (match: MatchResult) => void;
  fixtureId: string;
}

const FIELD_DEFAULTS = {
  team1: '',
  team2: '',
  winner: '',
  team1Runs: '',
  team1Wickets: '',
  team1Overs: '',
  team2Runs: '',
  team2Wickets: '',
  team2Overs: '',
};

export default function MatchForm({
  onAdd,
  fixtureId,
}: Props){

  const [fields, setFields] =
    useState(FIELD_DEFAULTS);

  const [error, setError] =
    useState('');

  const [noResult, setNoResult] =
    useState(false);

  const set = (
    key: string,
    val: string
  ) => {

    setFields(f => ({
      ...f,
      [key]: val
    }));

    setError('');

  };

  const validate = (): string => {

    if (
      !fields.team1 ||
      !fields.team2
    ) {
      return 'Select both teams.';
    }

    if (
      fields.team1 ===
      fields.team2
    ) {
      return 'Teams must be different.';
    }

    if (!noResult) {

      if (!fields.winner) {
        return 'Select the winning team.';
      }

      const t1r =
        parseInt(fields.team1Runs);

      const t2r =
        parseInt(fields.team2Runs);

      const t1w =
        parseInt(fields.team1Wickets);

      const t2w =
        parseInt(fields.team2Wickets);

      const t1o =
        parseOvers(fields.team1Overs);

      const t2o =
        parseOvers(fields.team2Overs);

      if (
        isNaN(t1r) ||
        t1r < 0
      ) {
        return 'Team 1 runs must be a non-negative number.';
      }

      if (
        isNaN(t2r) ||
        t2r < 0
      ) {
        return 'Team 2 runs must be a non-negative number.';
      }

      if (
        isNaN(t1w) ||
        t1w < 0 ||
        t1w > 10
      ) {
        return 'Team 1 wickets must be between 0 and 10.';
      }

      if (
        isNaN(t2w) ||
        t2w < 0 ||
        t2w > 10
      ) {
        return 'Team 2 wickets must be between 0 and 10.';
      }

      if (t1o < 0) {
        return 'Team 1 overs invalid (max .5 balls).';
      }

      if (t2o < 0) {
        return 'Team 2 overs invalid (max .5 balls).';
      }

      if (
        t1o === 0 &&
        t1r > 0
      ) {
        return 'Team 1 overs must be > 0 if runs > 0.';
      }

      if (
        t2o === 0 &&
        t2r > 0
      ) {
        return 'Team 2 overs must be > 0 if runs > 0.';
      }

    }

    return '';

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const err =
      validate();

    if (err) {

      setError(err);

      return;

    }

    const t1o =
      noResult
        ? 0
        : parseOvers(
            fields.team1Overs
          );

    const t2o =
      noResult
        ? 0
        : parseOvers(
            fields.team2Overs
          );

    const match: MatchResult = {

id:
  fixtureId,

      team1:
        fields.team1,

      team2:
        fields.team2,

      winner:
        noResult
          ? 'nr'
          : fields.winner,

      team1Runs:
        noResult
          ? 0
          : parseInt(
              fields.team1Runs
            ),

      team1Wickets:
        noResult
          ? 0
          : parseInt(
              fields.team1Wickets
            ) || 0,

      team1Overs:
        t1o,

      team2Runs:
        noResult
          ? 0
          : parseInt(
              fields.team2Runs
            ),

      team2Wickets:
        noResult
          ? 0
          : parseInt(
              fields.team2Wickets
            ) || 0,

      team2Overs:
        t2o,

      date:
        new Date()
          .toISOString()
          .split('T')[0],

    };

    onAdd(match);

    setFields(
      FIELD_DEFAULTS
    );

    setNoResult(false);

    setError('');

  };

  const inputCls =
    "w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 transition-colors placeholder-slate-500";

  const selectCls =
    "w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 transition-colors";

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>

          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Team 1
          </label>

          <select
            className={selectCls}
            value={fields.team1}
            onChange={e =>
              set(
                'team1',
                e.target.value
              )
            }
          >

            <option value="">
              Select team
            </option>

            {TEAMS
              .filter(
                t =>
                  t.id !==
                  fields.team2
              )
              .map(t => (

                <option
                  key={t.id}
                  value={t.id}
                >
                  {t.flag} {t.id} — {t.name}
                </option>

              ))}

          </select>

        </div>

        <div>

          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Team 2
          </label>

          <select
            className={selectCls}
            value={fields.team2}
            onChange={e =>
              set(
                'team2',
                e.target.value
              )
            }
          >

            <option value="">
              Select team
            </option>

            {TEAMS
              .filter(
                t =>
                  t.id !==
                  fields.team1
              )
              .map(t => (

                <option
                  key={t.id}
                  value={t.id}
                >
                  {t.flag} {t.id} — {t.name}
                </option>

              ))}

          </select>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={() => {

            setNoResult(v => !v);

            setError('');

          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
            noResult
              ? 'bg-slate-600 border-slate-500 text-white'
              : 'bg-transparent border-slate-600 text-slate-400 hover:border-slate-400'
          }`}
        >

          <span className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center transition-colors ${
            noResult
              ? 'border-white bg-white'
              : 'border-slate-500'
          }`}>

            {noResult && (
              <span className="w-1.5 h-1.5 bg-slate-800 rounded-sm"></span>
            )}

          </span>

          No Result / Abandoned

        </button>

      </div>

      {!noResult && (

        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* TEAM 1 RUNS */}

            <div>

              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                {fields.team1
                  ? `${fields.team1} Runs`
                  : 'Team 1 Runs'}
              </label>

              <input
                type="number"
                min="0"
                className={inputCls}
                placeholder="e.g. 185"
                value={fields.team1Runs}
                onChange={e =>
                  set(
                    'team1Runs',
                    e.target.value
                  )
                }
              />

            </div>

            {/* TEAM 1 WICKETS */}

            <div>

              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                {fields.team1
                  ? `${fields.team1} Wickets`
                  : 'Team 1 Wickets'}
              </label>

              <input
                type="number"
                min="0"
                max="10"
                className={inputCls}
                placeholder="e.g. 6"
                value={fields.team1Wickets}
                onChange={e =>
                  set(
                    'team1Wickets',
                    e.target.value
                  )
                }
              />

            </div>

            {/* TEAM 1 OVERS */}

            <div>

              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                {fields.team1
                  ? `${fields.team1} Overs`
                  : 'Team 1 Overs'}
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                className={inputCls}
                placeholder="e.g. 20.0"
                value={fields.team1Overs}
                onChange={e =>
                  set(
                    'team1Overs',
                    e.target.value
                  )
                }
              />

            </div>

            {/* TEAM 2 RUNS */}

            <div>

              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                {fields.team2
                  ? `${fields.team2} Runs`
                  : 'Team 2 Runs'}
              </label>

              <input
                type="number"
                min="0"
                className={inputCls}
                placeholder="e.g. 172"
                value={fields.team2Runs}
                onChange={e =>
                  set(
                    'team2Runs',
                    e.target.value
                  )
                }
              />

            </div>

            {/* TEAM 2 WICKETS */}

            <div>

              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                {fields.team2
                  ? `${fields.team2} Wickets`
                  : 'Team 2 Wickets'}
              </label>

              <input
                type="number"
                min="0"
                max="10"
                className={inputCls}
                placeholder="e.g. 8"
                value={fields.team2Wickets}
                onChange={e =>
                  set(
                    'team2Wickets',
                    e.target.value
                  )
                }
              />

            </div>

            {/* TEAM 2 OVERS */}

            <div>

              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                {fields.team2
                  ? `${fields.team2} Overs`
                  : 'Team 2 Overs'}
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                className={inputCls}
                placeholder="e.g. 19.3"
                value={fields.team2Overs}
                onChange={e =>
                  set(
                    'team2Overs',
                    e.target.value
                  )
                }
              />

            </div>

          </div>

<div>

  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
    Winner
  </label>

  <div className="flex gap-3">

    {[fields.team1, fields.team2]
      .filter(Boolean)
      .map(tid => {

        const t =
          TEAMS.find(
            x => x.id === tid
          );

        return (

          <button
            key={tid}
            type="button"
            onClick={() =>
              set(
                'winner',
                tid
              )
            }
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-semibold transition-all ${
              fields.winner === tid
                ? 'bg-amber-500 border-amber-400 text-slate-900 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-amber-500/50'
            }`}
          >

            <span>
              {t?.flag}
            </span>

            <span>
              {tid}
            </span>

          </button>

        );

      })}

    {(!fields.team1 ||
      !fields.team2) && (

      <span className="flex-1 text-center text-slate-500 text-sm py-2">

        Select teams first

      </span>

    )}

  </div>

</div>

</>

)}

{error && (

  <div className="flex items-center gap-2 text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-3 py-2 text-sm">

    <AlertCircle size={15} />

    {error}

  </div>

)}

<button
  type="submit"
  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 rounded-lg transition-colors shadow-lg shadow-amber-500/20 active:scale-95"
>

  <PlusCircle size={16} />

  Add Match Result

</button>

</form>

);

}