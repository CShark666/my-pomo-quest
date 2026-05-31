import { useState } from "react";

type ButtonProp = {
    text: string,
    onClick: () => void
}
type PopupWindowProps = {
    title: string,
    description: string,
    buttons?: Array<ButtonProp>
}

export function PopupWindow({ title, description, buttons }: PopupWindowProps) {
    const [isOpen, setIsOpen] = useState(false);

    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    return (
        <>
            <button className="btn" onClick={open}>{title}</button>

            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={close}
                        >✕
                        </button>

                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="py-4">{description}</p>

                        {buttons?.map((button, index) => (
                            <button
                                key={index}
                                className="btn"
                                onClick={() => {
                                    button.onClick();
                                    close();
                                }}
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}