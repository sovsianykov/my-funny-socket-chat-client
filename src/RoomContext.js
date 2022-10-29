import {createContext, useState} from "react";


export const RoomContext = createContext({})


export  function RoomContextProvider({children}) {
    const [talkingRoom, setTalkingRoom] = useState('')

    return (
        <RoomContext.Provider value={{talkingRoom,setTalkingRoom}}>
            {children}
        </RoomContext.Provider>
    )
}
