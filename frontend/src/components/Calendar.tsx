export type CalendarHistory = {
    date: Date,
    activity: boolean
}

function Calendar({ monthWithHistory }: { monthWithHistory?: Array<CalendarHistory> | null }) {
    const today = new Date;
    const currentMonthName = today.toLocaleString('default', { month: 'long' });

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const daysFromMonday = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - daysFromMonday);

    const month = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const activity = monthWithHistory?.find(q => q.date.getDate() === date.getDate())?.activity;

        return {
            date: new Date(date),
            activity: activity
        }
    })

    return <>
        <div className="w-full bg-[#d7b594] p-2.5 rounded-md outline-8 outline-[#c09473]">
            <div className="text-4xl font-bold">
                <h2>{currentMonthName} {today.getFullYear()}</h2>
            </div>
            <div className="aspect-2/1 grid grid-cols-7 gap-1.5">
                <div>
                    <p>Mon.</p>
                </div>
                <div>
                    <p>Tues.</p>
                </div>
                <div>
                    <p>Wed.</p>
                </div>
                <div>
                    <p>Thurs.</p>
                </div>
                <div>
                    <p>Fri.</p>
                </div>
                <div>
                    <p>Sat.</p>
                </div>
                <div>
                    <p>Sun.</p>
                </div>
                {month.map((day, i) => {
                    const isToday = day.date.getDate() === today.getDate();
                    const isPast = day.date.getDate() < today.getDate();
                    const isCorrectMoth = day.date.getMonth() !== today.getMonth();

                    return (
                        <div key={i}
                            className={`
                            ${isToday && "bg-amber-400"} 
                            ${isCorrectMoth ? "opacity-25" : isPast ? "opacity-75" : ""}
                            ${day.activity && "bg-[#85ff7a86]"}
                            aspect-square outline-2 rounded-md flex justify-center items-center`}
                        >
                            {day.date.getMonth() + 1}/{day.date.getDate()}
                        </div>
                    )
                })}
            </div>
        </div></>
}

export default Calendar;