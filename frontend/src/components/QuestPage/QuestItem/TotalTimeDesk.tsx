import timeDesk from '../../../assets/total-time-desk.png'


function TotalTimeDesk({ time }: { time: string }) {
    return (
        <>
            <div className={`flex shrink-0 justify-center items-center w-62.5 aspect-19/11 relative overflow-hidden`}>
                <img
                    src={timeDesk}
                    className="absolute inset-0 h-full w-full object-fill"
                />
                <p className="absolute text-[#e7d5b3] text-xl md:text-3xl lg:text-5xl font-bold">
                    {time}
                </p>
            </div>
        </>
    )
}

export default TotalTimeDesk;