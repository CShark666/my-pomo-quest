import { useState } from "react";
import { useNavigate } from "react-router";
import { cancelQuest } from "../api";
import "../styles/CancelButton.css";

export function CancelButton() {
  const [showWindow, setShowWindow] = useState(false);
  const navigate = useNavigate();

  const cancel = async () => {
    await cancelQuest();
    navigate("/");
  };

  return (
    <>
      <button className="x-btn"
        onClick={() => {
          setShowWindow(!showWindow);
        }}
      >
        X
      </button>
      {showWindow && (
        <div className="overlay">
          <div className="dialog-window">
            <span>
              Are you sure you want to cancel the task?{" "}
              <b>All progress will be irretrievably lost!</b>
            </span>
            <div>
              <button onClick={cancel}>Yes! Cenacle!</button>
              <button
                onClick={() => {
                  setShowWindow(false);
                }}
              >
                No! Continue the quest!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
