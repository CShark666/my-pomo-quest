import { useContext, useTransition } from "react";
import { useNavigate } from "react-router";
import { cancelQuest } from "../api";
import { LoadingSpinnerLabel } from "./Loading";
import { QuestContext } from "../contexts/QuestContext";

export function CancelButton() {
  const [isPending, startTransition] = useTransition();
  const setQuest = useContext(QuestContext).setQuest;
  const navigate = useNavigate();

  const cancel = () => startTransition(async () => {
    await cancelQuest();
    setQuest(null);
    navigate("/");
  })

  return (
    <>
      <button className="btn"
        onClick={() =>
          (document.getElementById('my_modal_1') as HTMLDialogElement | null)?.showModal()}>
        Cancel quest
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">

          <h3 className="font-bold text-lg">Cancel quest?</h3>

          <span>
            Are you sure you want to cancel the task?{" "}
            <b>All progress will be irretrievably lost!</b>
          </span>

          <div className="flex justify-center">

            <button className="btn m-1.5 btn-secondary disabled:bg-secondary/65" onClick={cancel} disabled={isPending}>
              Yes! Cancel!
            </button>

            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn m-1.5 btn-primary disabled:bg-primary/65">No! Continue the quest!</button>
            </form>
          </div>

          <div className="flex justify-center">
            <p className="font-light opacity-35">Press ESC key or click the button below to close</p>
          </div>

          {isPending && (<LoadingSpinnerLabel />)}
        </div>
      </dialog>
    </>
  );
}
