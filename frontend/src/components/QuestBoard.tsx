import board from '../assets/board.png'
import questScroll from '../assets/quest_scroll.png'
import map from '../assets/map.png'
import calendar from '../assets/calendar.png'
import grid from '../assets/log-grid.png'

export function QuestBoard() {
    return (
        <div className="w-full overflow-auto p-4">
            <div className="relative mx-auto aspect-4/3 w-full max-w-250 overflow-hidden">
                <img
                    src={board}
                    className="absolute inset-0 h-full w-full object-fill"
                />

                {/* Content */}
                <img
                    src={questScroll}
                    className="absolute right-[12%] top-[19%] aspect-square w-full max-w-32 object-cover"
                />
                <img
                    src={questScroll}
                    className="absolute right-[25%] top-[23%] aspect-square w-full max-w-32 object-cover"
                />
                <img
                    src={questScroll}
                    className="absolute right-[38%] top-[21%] aspect-square w-full max-w-32 object-cover"
                />
                <img
                    src={map}
                    className="absolute right-[15%] bottom-[15%] aspect-square w-full max-w-72 object-cover"
                />

                <img
                    src={calendar}
                    className="absolute left-[15%] top-[16%] aspect-square w-full max-w-62.5 object-cover"
                />

                <img
                    src={grid}
                    className="absolute left-[15%] bottom-[15%] aspect-square w-full max-w-62.5 object-cover"
                />

            </div>
        </div>
    );
}