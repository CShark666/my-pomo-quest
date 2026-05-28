import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { cancelQuest } from "../api";
import "../styles/CancelButton.css";
import { LoadingSpinnerLabel } from "./Loading";

export function CancelButton() {
  const [isPending, startTransition] = useTransition();
  const [showWindow, setShowWindow] = useState(false);
  const navigate = useNavigate();

  const cancel = () => startTransition(async () => {
    await cancelQuest();
    navigate("/");
  })

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
              <button onClick={cancel} disabled={isPending}>Yes! Cancel!</button>
              <button
                onClick={() => {
                  setShowWindow(false);
                }}
                disabled={isPending}>
                No! Continue the quest!
              </button>
              {isPending && (<LoadingSpinnerLabel />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
