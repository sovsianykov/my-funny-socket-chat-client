import {createContext, useState} from "react";


export const RoomContext = createContext({})


export  function RoomContextProvider({children}) {
    const [talkingRoom, setTalkingRoom] = useState('')

    console.log(talkingRoom)
    return (
        <RoomContext.Provider value={{talkingRoom,setTalkingRoom}}>
            {children}
        </RoomContext.Provider>
    )
}
