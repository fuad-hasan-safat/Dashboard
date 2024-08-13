import { createContext, useState } from "react";

export const AudioDetailsTabContext = createContext({
    audioTabToggleState: 1,
    setAudioTabToggleState: () => { }
})

export default function AudioDetailsTabContextProvider({ children }) {
    const [audioTabState, setAudioTabState] = useState({
        audioTabToggleState: 1,
    });

    function setAudioPlayerToggleState(state) {
        setAudioTabState((prevState) => ({
            audioTabToggleState: state
        }))
    }

    const cntxTValue = {
        audioTabToggleState: audioTabState.audioTabToggleState,
        setAudioTabToggleState: setAudioPlayerToggleState,
    }

    return (
        <AudioDetailsTabContext.Provider value={cntxTValue}>
            {children}
        </AudioDetailsTabContext.Provider>
    )
}