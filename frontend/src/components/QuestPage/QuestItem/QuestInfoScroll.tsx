import questScroll from '../../../assets/quest_scroll.png'


function QuestInfoScroll({ title, status, progress }: { title: string, status: string, progress: string }) {
    return (
        <div className="flex justify-center">
            <div className={`flex shrink-0 justify-center items-center w-[75%] aspect-square relative overflow-hidden`}>
                <img
                    src={questScroll}
                    className="absolute inset-0 h-full w-full object-fill"
                />
                <div className="absolute shrink-0 w-[50%] aspect-3/4 left-[18%]
                    text-[#917056]  text-[14px] font-bold truncate">
                    <ul className="list-disc list-outside pl-5">
                        <li>
                            <p>
                                Quest:
                            </p>
                            <p>
                                {title}
                            </p>
                        </li>
                        <li>
                            <p>
                                Status:
                            </p>
                            <p>
                                {status}
                            </p>
                        </li>
                        <li>
                            <p>
                                Progress:
                            </p>
                            <p>
                                {progress}
                            </p>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default QuestInfoScroll;