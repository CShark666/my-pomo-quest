
type ButtonProp = {
    text: string,
    onClick: () => void
}
type MessageBoxProps = {
    text: string,
    buttons?: Array<ButtonProp>
}

export function MessageBox({ text, buttons }: MessageBoxProps) {
    return (
        <div className="grid justify-center items-center m-1.5 p-1.5">
            <span className="text-2xl font-light">{text}</span>
            {buttons?.map((button, index) => (
                <div className="flex justify-center gap-1.5 m-1.5">
                    <button
                        key={index}
                        className="btn"
                        onClick={button.onClick}
                    >
                        {button.text}
                    </button>
                </div>
            ))}
        </div>)
}