
export function Timer({ time, isBreakMode }: { time: number, isBreakMode: boolean }) {
  const format = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return { minutes, seconds };
  };

  return (
    <div className="timer flex items-center justify-center">
      <div className="time flex items-center">
        <div className="hours">
          <div className={`time-card flex justify-center items-center bg${isBreakMode ? "-break/50" : "-work/50"} text-white pt-11 pb-12 pl-7 pr-7 m-1.5 font-bold text-8xl rounded-l-box`}>
            <p>{format(time).minutes}</p>
          </div>
        </div>

        <p className="dots text-8xl">:</p>

        <div className="seconds">
          <div className={`time-card flex justify-center items-center bg${isBreakMode ? "-break/50" : "-work/50"} text-white pt-11 pb-12 pl-7 pr-7 m-1.5 font-bold text-8xl rounded-r-box`}>
            <p>{format(time).seconds}</p>
          </div>
        </div>
      </div>
    </div >
  );
}
