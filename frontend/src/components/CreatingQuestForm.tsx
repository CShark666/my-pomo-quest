import { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { LoadingSpinnerLabel } from "./Loading.tsx";
import { createQuest } from "../api.ts";
import type { ClientQuest } from "../api.ts";

export function CreatingQuestForm({ setQuest }: { setQuest: (quest: ClientQuest | null) => void }) {
  const [isPendingCreateForm, startCreateFormTransition] = useTransition();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [totalTime, setTotalTimeMs] = useState({ hours: 1, minutes: 20 });
  const [intervalsCount, setIntervalsCount] = useState(4);
  const [breaks, setBreaks] = useState({ disabled: false, short: 5, long: 10 });

  const [disableField, setDisableField] = useState(true);
  const [showBreakSettings, setShowBreakSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTimeUpdate = () => {
      const totalMinutes = totalTime.hours * 60 + totalTime.minutes;
      setDisableField(totalMinutes <= 0);
    };
    handleTimeUpdate();
  }, [totalTime]);

  const saveQuest = () => startCreateFormTransition(async () => {
    const quest = await createQuest({
      category: category,
      title: title,
      totalTimeMs: (totalTime.hours * 60 + totalTime.minutes) * 60 * 1000,
      intervalsCount: intervalsCount,
      breaks: breaks.disabled
        ? null
        : { short: breaks.short * 60 * 1000, long: breaks.long * 60 * 1000 },
    });
    setQuest(quest);
  })

  const updateTime = (field: string, value: number) => {
    setTotalTimeMs((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  return (
    <>
      <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

        {/*title*/}
        <div className="grid gap-1">
          <select
            className="select select-primary text-center"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="Category"
          >
            <option value="Category" disabled>
              Category
            </option>
            <option value="test">test</option>
            <option value="work">work</option>
            <option value="study">study</option>
            <option value="workout">workout</option>
            <option value="hobby">hobby</option>
          </select>
          <input
            className="input input-primary"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPendingCreateForm}
          />
        </div>

        {/*time*/}
        <div className="grid gap-1">
          <div className="flex justify-between items-center">
            <span className="text-lg">Total time</span>
            <div className="flex">
              <input
                className="input validator text-right border-0 rounded-2xl rounded-r-none"
                type="number"
                min="0"
                max="24"
                value={totalTime.hours}
                onChange={(e) => {
                  updateTime("hours", Number(e.target.value));
                }}
                disabled={isPendingCreateForm}
              />
              <input
                className="input validator text-left border-0 rounded-2xl rounded-l-none"
                type="number"
                min="0"
                max="59"
                value={totalTime.minutes}
                onChange={(e) => {
                  updateTime("minutes", Number(e.target.value));
                }}
                disabled={isPendingCreateForm}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Interval duration</span>
            <input
              className="input validator w-26 text-center border-0 rounded-2xl"
              type="number"
              min="1"
              value={
                (totalTime.hours * 60 + totalTime.minutes) / intervalsCount
              }
              onChange={(e) => {
                setIntervalsCount(
                  Number(
                    (totalTime.hours * 60 + totalTime.minutes) / Number(e.target.value),
                  ),
                );
              }}
              disabled={disableField || isPendingCreateForm}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Intervals count</span>
            <input
              className="input validator w-26 text-center border-0 rounded-2xl"
              type="number"
              min="1"
              value={intervalsCount}
              onChange={(e) => {
                setIntervalsCount(Number(e.target.value));
              }}
              disabled={disableField || isPendingCreateForm}
            />
          </div>
        </div>
        <div className="grid">
          <button
            className="btn btn-sm btn-dash"
            onClick={() => {
              setShowBreakSettings(!showBreakSettings);
            }}
          >
            Break settings
          </button>

          {/*break*/}
          {showBreakSettings ? (
            <div className="grid gap-1">
              <div className="flex justify-center m-2">
                <span className="text-md">Disable breaks:</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={breaks.disabled}
                  onChange={(e) =>
                    setBreaks((prev) => ({
                      ...prev,
                      disabled: e.target.checked,
                    }))
                  }
                  disabled={isPendingCreateForm}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base">Short break: </span>
                <input
                  className="input validator w-26 text-center border-0 rounded-2xl"
                  type="number"
                  value={breaks.short}
                  disabled={breaks.disabled || isPendingCreateForm}
                  onChange={(e) =>
                    setBreaks((prev) => ({
                      ...prev,
                      short: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex justify-between">
                <span className="text-base">Long break: </span>
                <input
                  className="input validator w-26 text-center border-0 rounded-2xl"
                  type="number"
                  value={breaks.long}
                  disabled={breaks.disabled || isPendingCreateForm}
                  onChange={(e) =>
                    setBreaks((prev) => ({
                      ...prev,
                      long: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          ) : (
            <div className="text-sm text-accent/60 flex justify-center">
              {breaks.disabled ? (
                "no breaks"
              ) : (
                <span >
                  short: {breaks.short} m. / long: {breaks.long} m.
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-center gap-5">
          <button
            className="btn btn-secondary disabled:btn-secondary/25"
            onClick={() => {
              navigate("/");
            }}
            disabled={isPendingCreateForm}
          >
            Cancel
          </button>
          <button className="btn btn-primary disabled:btn-primary/25" onClick={saveQuest} disabled={isPendingCreateForm}>
            Get started
          </button>
        </div>
        {isPendingCreateForm && (<div> <LoadingSpinnerLabel /> </div>)}
      </div>
    </>
  );
}
