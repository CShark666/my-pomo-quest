
function Timer({ time, isBreakMode }: { time: number, isBreakMode: boolean }) {
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
      <div className="time flex items-center text-white font-press-start text-8xl">
        <div className="hours">
          <div className={`flex justify-center items-center ${isBreakMode ? "bg-break/50" : "bg-work/50"} pt-8 pb-6 pl-3 pr-1 m-1 mb-1.5 rounded-l-box outline-5 outline-[#4d2b32]`}>
            <p>{format(time).minutes}</p>
          </div>
        </div>
        <div className="seconds">
          <div className={`flex justify-center items-center ${isBreakMode ? "bg-break/50" : "bg-work/50"}  pt-8 pb-6 pl-2 pr-3 m-1 mb-1.5 rounded-r-box outline-5 outline-[#4d2b32]`}>
            <p>{format(time).seconds}</p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Timer;