import "../styles/CreatingQuesForm.css";

export function CreatingQuesForm() {
  return (
    <div>
      <div>
        <p>Category</p>
        <select>
          <option value="test">test</option>
          <option value="work">work</option>
          <option value="study">study</option>
          <option value="workout">workout</option>
          <option value="hobby">hobby</option>
        </select>
      </div>
      <div>
        <input type="text" placeholder="title" />
      </div>
      <div>
        <div>
          <p>Total time</p>
          <input type="time" />
        </div>
        <div>
          <p>Time interval</p>
          <input type="number" min="1" max="60" />
        </div>
        <div>
          <p>Amount of intervals</p>
          <input type="number" min="1" />
        </div>
      </div>
      <button>Cancel</button>
      <button>Get started</button>
    </div>
  );
}
