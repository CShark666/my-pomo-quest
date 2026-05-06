import { useState } from "react";
import { timeFormatter } from "../util/timeFormatter";
import { Timer } from "./Timer";
import { CancelButton } from "./CancelButton";
import "../styles/QuestItem.css";

export function QuestItem({ quest }) {
  const [timeRemaining, setTimeRemaining] = useState(quest.timeIntervalInMs);

  let intervalPercent = Math.round(
    (timeRemaining / quest.timeIntervalInMs) * 100,
  );

  return (
    <div className="quest-item">
      <div className="cancel-btn">
        <CancelButton />
      </div>
      <div className="quest-progress-bar">
        <div className="total-time">
          <p>{timeFormatter(quest.remainingTotalTimeInMs)}</p>
        </div>
        <div>
          <div className="info">
            <p>
              #{quest.id} {quest.title}
            </p>
            <p>Status: {quest.status}</p>
          </div>
          <div className="interval-points">
            {Array.from({ length: quest.amountOfIntervals }).map((_, i) => (
              <div key={i} className="interval-item">
                  <div
                    className="interval-progress"
                    style={{ width: `${intervalPercent}%` }}
                  >
                    {intervalPercent}%
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
      <Timer
        remaining={timeRemaining}
        setRemaining={setTimeRemaining}
      />
    </div>
  );
}
