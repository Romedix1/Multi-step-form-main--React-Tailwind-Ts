import React from "react";

interface propsInterface {
    currentState: number,
}

export default function DesktopNav(props: propsInterface) {
    const steps: string[] = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"]

    const navButtons = () => {
        return (
            <>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div className="flex my-5 ml-4">
                        <div className={`px-3 py-1 h-fit border-solid border-2 border-Lightblue rounded-full mx-2 font-bold text-White ${props.currentState === i+1 ? "bg-Lightblue" : "bg-transparent"}`} key={i+1}>
                            <p className={`${props.currentState === i+1 ? "text-Marineblue" : "text-White"}`}>{i+1}</p>
                        </div>
                        <div>
                            <p className="text-Lightgray text-sm">STEP {i+1}</p>
                            <h3 className="font-bold text-sm text-Alabaster">{steps[i]}</h3>
                        </div>
                    </div>
                ))}
            </>
        )
    }
    
    return (
        <nav id="nav-desktop--main-container" className="bg-no-repeat bg-cover pb-12 hidden lg:block rounded-lg">
            <div className="my-8 mb-56 mr-16">
                {navButtons()}
            </div>
        </nav>
    )
}