import React from "react";

interface propsInterface {
    currentState: number,
}

export default function Nav(props: propsInterface) {

    const navButtons = () => {
        return (
            <>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div className={`px-4 py-2 border-solid border-2 border-Lightblue rounded-full mx-2 font-bold text-White ${props.currentState === i+1 ? "bg-Lightblue" : "bg-transparent"}`} key={i+1}>
                        <p className={`${props.currentState === i+1 ? "text-Marineblue" : "text-White"}`}>{i+1}</p>
                    </div>
                ))}
            </>
        )
    }
    
    return (
        <nav id="nav--main-container" className="flex justify-center bg-no-repeat bg-cover pb-12 lg:hidden">
            <div className="my-8 flex">
                {navButtons()}
            </div>
        </nav>
    )
}