"use client";

import { useState } from "react";
import Chat from "../chat/Chat";
import Sidebar from "../history/Sidebar";
import ScrollableSection from "../Speciality/Speciality";
import Header from "./Header";

export default function Landing() {
        const [isMessageEnterd, setIsMessageEnterd] = useState(false);
        const handleMessageSent = () => {
                setIsMessageEnterd(true);
        }

return (
    <div className="min-h-screen w-full grid grid-cols-4 sticky top-0">
            <div className="col-span-1 bg-slate-100 min-h-screen sticky top-0 bottom-0">
                    <Sidebar/> 
            </div>

            <div className="col-span-3 flex flex-col  min-h-screen">
                    {!isMessageEnterd && <Header/>}
                    {!isMessageEnterd && <ScrollableSection/>}
                    <div className="flex-grow p-4 mt-12 border-gray-300">
                               <Chat onMessageSent = {handleMessageSent}/>             
                            
                    </div>
            </div>
    </div>
);
}