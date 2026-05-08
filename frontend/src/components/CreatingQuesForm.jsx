import { useState } from "react";
import { useNavigate } from "react-router";
import { createQuest } from "../api";
import "../styles/CreatingQuesForm.css";

export function CreatingQuesForm({ setCurrentQuest }) {
  const [input, setInput] = useState({
    category: "",
    title: "",
    totalTime: 0,
    timeInterval: 0,
    amountOfIntervals: 0,
  });
  const [disableField, setDisableField] = useState(true);
  const navigate = useNavigate();

  const saveQuest = async () => {
    await createQuest(input);
    setCurrentQuest(input);
  };

  const handleTotalTimeInput = (e) => {
    setInput({
      ...input,
      totalTime: e.target.value,
    });
    e.target.value > 0 ? setDisableField(false) : setDisableField(true);
  };

  const handleTimeIntervalInput = (e) => {
    const value = e.target.value;
    const minutes = input.totalTime * 60;

    setInput({
      ...input,
      timeInterval: value,
      amountOfIntervals: minutes / value,
    });
  };

  const handleAmountIntervalInput = (e) => {
    const value = e.target.value;
    const minutes = input.totalTime * 60;

    setInput({
      ...input,
      amountOfIntervals: value,
      timeInterval: minutes / value,
    });
  };

  return (
    <div className="quest-form-container">
      <div className="quest-form">
        <div className="info-box">
          <select
            className="category-selector"
            onChange={(e) =>
              setInput({
                ...input,
                category: e.target.value,
              })
            }
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
            value={input.title}
            onChange={(e) =>
              setInput({
                ...input,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="time-settings">
          <div className="time-input-box">
            <p>Total time</p>
            <input
              className="time-input"
              type="number"
              min="0"
              value={input.totalTime}
              onChange={handleTotalTimeInput}
            />
          </div>
          <div className="time-input-box">
            <p>Time interval</p>
            <input
              className="time-input"
              type="number"
              min="1"
              max="60"
              value={input.timeInterval}
              onChange={handleTimeIntervalInput}
              disabled={disableField}
            />
          </div>
          <div className="time-input-box">
            <p>Amount of intervals</p>
            <input
              className="time-input"
              type="number"
              min="1"
              value={input.amountOfIntervals}
              onChange={handleAmountIntervalInput}
              disabled={disableField}
            />
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
