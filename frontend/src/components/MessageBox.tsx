
type ButtonProp = {
    text: string,
    onClick: () => void
}
type MessageBoxProps = {
    text: string,
    buttons?: Array<ButtonProp>
}

export function MessageBox({ text, buttons }: MessageBoxProps) {
    return <div className="message-box">
        <span>{text}</span>
        {buttons?.map((button, index) => (
            <div>
                <button
                    key={index}
                    onClick={button.onClick}
                >
                    {button.text}
                </button>
            </div>
        ))}
    </div>
}