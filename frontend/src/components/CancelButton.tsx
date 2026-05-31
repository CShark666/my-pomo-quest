import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { cancelQuest } from "../api";
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
      <button className="x-btn px-1 bg-error/55"
        onClick={() => {
          setShowWindow(!showWindow);
        }}
      >
        X
      </button>
      {showWindow && (
        <div className="overlay fixed to-0% left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="dialog-window bg-gray-700 p-6 w-96 text-center">
            <span>
              Are you sure you want to cancel the task?{" "}
              <b>All progress will be irretrievably lost!</b>
            </span>
            <div>
              <button className="btn m-1.5 btn-secondary disabled:bg-secondary/65" onClick={cancel} disabled={isPending}>Yes! Cancel!</button>
              <button
                className="btn m-1.5 btn-primary disabled:bg-primary/65"
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
