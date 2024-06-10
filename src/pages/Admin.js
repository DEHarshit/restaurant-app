import Dashboard from "./Dashboard";
import Dishes from "./Dishes";
import Orders from "./Orders";
import Users from "./Users";
import Inventory from "./Inventory";
import {useState,useEffect} from 'react';

export default function Admin() {
    const [currentPage,setCurrentPage] = useState(<Dashboard/>);
    const [freeze, setFreeze] = useState(1);
    const menu = [
        {title:'Dashboard',id:1},
        {title:'Orders',id:2},
        {title:'Dishes',id:3},
        {title:'Users',id:4},
        {title:'Inventory',id:5},
    ]
    function handlePage(id){
        console.log(id)
        setFreeze(id)
        if (id===1){
            setCurrentPage(<Dashboard/>)
        } else if (id===2){
            setCurrentPage(<Orders/>)
        }else if (id===3){
            setCurrentPage(<Dishes/>)
        }else if (id===4){
            setCurrentPage(<Users/>)
        }else if (id===5){
            setCurrentPage(<Inventory/>)
        }
    }
    return (
        <div className='flex flex-col h-dvh font-primary tracking-wider'>
            <div className="flex items-center justify-between py-5 px-12 bg-zinc-900 border-b border-zinc-700">
                <div className="flex flex-col items-center">
                    <div className="font-primary font-bold tracking-wider bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                        <h2>RESTAURANT</h2>
                    </div>
                    <div className="flex scale-[0.8]">
                        <div className="  
                            border-t-[15px] border-t-transparent
                            border-r-[15px] border-r-white
                            border-b-[15px] border-b-transparent">
                        </div>
                        <div className="flex w-[80px] text-sm items-center justify-center bg-white text-zinc-600">
                            DMLUASN
                        </div>
                        <div className="
                            border-t-[15px] border-t-transparent
                            border-l-[15px] border-l-white
                            border-b-[15px] border-b-transparent">
                        </div>
                    </div>

                </div>
                <div>
                    <h2 className="font-semibold text-3xl ">
                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                        Admin
                        </span> Panel</h2>
                </div>
                <div>
                    <div className="flex items-center gap-5">
                        <div style={{
                            backgroundImage: `url(/home-image.jpg)`,
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                        }}
                            className="w-14 h-14 rounded-full">
                        </div>
                        <span className="font-primary tracking-wider">
                            Username
                        </span>
                    </div>
                </div>
            </div>
            <div className='flex bg-zinc-900 w-screen overflow-hidden'>
                <div className="h-screen flex flex-col border-r border-zinc-700 "> {/* left side */}
                    {menu.map((ele, index) => (
                        <div className={`hover:bg-zinc-700 flex w-[200px] h-[75px] bg-zinb-900 border-b border-zinc-700 transition-all  items-center justify-center`}>
                            <button className={`${ele.id===freeze ?'text-xl font-semibold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text':'text-white hover:font-semibold hover:text-lg hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block hover:text-transparent bg-clip-text'} h-full w-full transition-all `} type="button" onClick={()=>handlePage(ele.id)}>{ele.title}</button>
                        </div>
                    ))}
                </div>
                <div className='overflow-auto w-screen flex flex-grow'> {/* page */}
                    {currentPage}
                </div>
            </div>
        </div>
    );
}