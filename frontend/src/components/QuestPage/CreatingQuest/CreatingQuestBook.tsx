import type { ReactNode } from "react"
import bookBg from '../../../assets/book-v2.png';

export function CreatingQuestBook({ children }: { children?: ReactNode }) {
    return (
        <div
            className="w-3xl overflow-auto" >
            <div
                className="relative mx-auto aspect-4/3 w-full max-w-250 overflow-hidden">
                <img
                    className="absolute inset-0 h-full w-full object-cover" src={bookBg} alt="book-bg" />
                {children}
            </div>
        </div>
    )
}

export function Page({ children, position }: { children?: ReactNode, position: string }) {
    return (
        <>
            <div className={`absolute w-63.75 h-112.5 ${position} p-1.5`}>
                {children}
            </div>
        </>)
}