import "../styles/LoadingSpinner.css";

export function LoadingSpinner() {
    return <span className="loader"></span>;
}

export function LoadingSpinnerLabel() {
    return <div>
        <LoadingSpinner />
        <p>loading</p>
    </div>;
}