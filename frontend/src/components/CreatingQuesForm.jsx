import { useState } from "react";
import "../styles/CreatingQuesForm.css";

export function CreatingQuesForm({ setCurrentQuest }) {
  const [input, setInput] = useState({
    category: "",
    title: "",
    totalTime: 0,
    timeInterval: 0,
    amountOfIntervals: 0,
  });

  return (
    <div className="quest-form-container">
      <div className="quest-form">
        <div className="category-selector">
          <p>Category </p>
          <select
            value={input.category}
            onChange={(e) =>
              setInput({
                ...input,
                category: e.target.value,
              })
            }
          >
            <option value="test">test</option>
            <option value="work">work</option>
            <option value="study">study</option>
            <option value="workout">workout</option>
            <option value="hobby">hobby</option>
          </select>
        </div>
        <div>
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
              type="time"
              value={input.totalTime}
              onChange={(e) =>
                setInput({
                  ...input,
                  totalTime: e.target.value,
                })
              }
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
              onChange={(e) =>
                setInput({
                  ...input,
                  timeInterval: e.target.value,
                })
              }
            />
          </div>
          <div className="time-input-box">
            <p>Amount of intervals</p>
            <input
              className="time-input"
              type="number"
              min="1"
              value={input.amountOfIntervals}
              onChange={(e) =>
                setInput({
                  ...input,
                  amountOfIntervals: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button>Cancel</button>
        <button
          onClick={() => {
            setCurrentQuest(input);
          }}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
