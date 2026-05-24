import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createQuest } from "../api.ts";
import "../styles/CreatingQuesForm.css";

export function CreatingQuestForm() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [totalTime, setTotalTimeMs] = useState({ hours: 0, minutes: 0 });
  const [intervalsCount, setIntervalsCount] = useState(1);
  const [breaks, setBreaks] = useState({ disabled: false, short: 5, long: 10 });

  const [disableField, setDisableField] = useState(true);
  const [showBreakSettings, setShowBreakSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTimeUpdate = () => {
      const totalMinutes = totalTime.hours * 60 + totalTime.minutes;
      totalMinutes > 0 ? setDisableField(false) : setDisableField(true);
    };
    handleTimeUpdate();
  }, [totalTime]);

  const saveQuest = async () => {
    await createQuest({
      category: category,
      title: title,
      totalTimeMs: (totalTime.hours * 60 + totalTime.minutes) * 60 * 1000,
      intervalsCount: intervalsCount,
      breaks: breaks.disabled
        ? null
        : { short: breaks.short * 60 * 1000, long: breaks.long * 60 * 1000 },
    });
  };

  const updateTime = (field, value) => {
    setTotalTimeMs((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  return (
    <div className="quest-form-container">
      <div className="quest-form">
        <div className="info-box">
          <select
            className="category-selector"
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
            type="text"
            placeholder="title"
            value={title.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="time-settings">
          <div className="time-input-box">
            <p>Total time</p>
            <div>
              <input
                className="time-input"
                type="number"
                min="0"
                value={totalTime.hours}
                onChange={(e) => {
                  updateTime("hours", e.target.value);
                }}
              />
              <input
                className="time-input"
                type="number"
                min="0"
                max="59"
                value={totalTime.minutes}
                onChange={(e) => {
                  updateTime("minutes", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="time-input-box">
            <p>Time interval</p>
            <input
              className="time-input"
              type="number"
              min="1"
              value={
                (totalTime.hours * 60 + totalTime.minutes) / intervalsCount
              }
              onChange={(e) => {
                setIntervalsCount(
                  Number(
                    (totalTime.hours * 60 + totalTime.minutes) / e.target.value,
                  ),
                );
              }}
              disabled={disableField}
            />
          </div>
          <div className="time-input-box">
            <p>Amount of intervals</p>
            <input
              className="time-input"
              type="number"
              min="1"
              value={intervalsCount}
              onChange={(e) => {
                setIntervalsCount(Number(e.target.value));
              }}
              disabled={disableField}
            />
          </div>
        </div>
        <div className="break-settings">
          <button
            onClick={() => {
              setShowBreakSettings(!showBreakSettings);
            }}
          >
            Break settings
          </button>
          <div className="break-settings__content">
            {showBreakSettings ? (
              <div className="break-settings__form">
                <div className="break-settings__row">
                  <span>Disable breaks:</span>
                  <input
                    type="checkbox"
                    checked={breaks.disabled}
                    onChange={(e) =>
                      setBreaks((prev) => ({
                        ...prev,
                        disabled: e.target.checked,
                      }))
                    }
                  />
                </div>
                <div className="break-settings__row">
                  <span>Short break: </span>
                  <input
                    className="break-settings__input"
                    type="number"
                    className="time-input"
                    value={breaks.short}
                    disabled={breaks.disabled}
                    onChange={(e) =>
                      setBreaks((prev) => ({
                        ...prev,
                        short: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="break-settings__row">
                  <span>Long break: </span>
                  <input
                    className="break-settings__input"
                    type="number"
                    className="time-input"
                    value={breaks.long}
                    disabled={breaks.disabled}
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
              <div className="break-settings__summary">
                {breaks.disabled ? (
                  "no breaks"
                ) : (
                  <span>
                    short: {breaks.short} m. / long: {breaks.long} m.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="buttons">
          <button
            className="cancel"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button className="start" onClick={saveQuest}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
