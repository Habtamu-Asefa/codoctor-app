import Chat from "../chat/Chat";
import Sidebar from "../history/Sidebar";
import ScrollableSection from "../Speciality/Speciality";
import Header from "./Header";

export default function Landing() {
return (
    <div className="min-h-screen w-full grid grid-cols-4 sticky top-0">
            <div className="col-span-1 bg-slate-100 min-h-screen sticky top-0 bottom-0">
                    <Sidebar/> 
            </div>

            <div className="col-span-3 flex flex-col min-h-screen">
                    <Header/>
                    <ScrollableSection/>
                    <div className="flex-grow p-4 mt-12 border-gray-300">
                            {/* <h2 className="text-2xl font-bold mb-4">Chatbot</h2>       */}
                               <Chat/>             
                            
                    </div>
            </div>
    </div>
);
}