import Dashboard from "./Dashboard";
import Dishes from "./Dishes";
import Orders from "./Orders";
import Users from "./Users";
import Ingredients from "./Ingredients";
import PreMade from "./PreMade";
import Stock from './Stock';
import Supplies from './Supplies'
import DigitalClock from "./components/DigitalClock";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function Admin() {
  const { data: session, status } = useSession();
  const [timing, setTiming] = useState('');
  const [currentPage, setCurrentPage] = useState(<Dashboard timing={timing} />);
  const [freeze, setFreeze] = useState(1);

  const router = useRouter();
  const menu = [
    { title: 'Dashboard', id: 1, role: ['Admin', 'Chef', 'Waiter', 'Owner'] },
    { title: 'Orders', id: 2, role: ['Admin', 'Chef', 'Waiter', 'Owner'] },
    { title: 'All Dishes', id: 3, role: ['Admin', 'Chef', 'Waiter', 'Owner'] },
    { title: 'Pre-Made', id: 7, role: ['Admin', 'Chef', 'Owner'] },
    { title: 'Users', id: 4, role: ['Admin', 'Owner'] },
    { title: 'Ingredients', id: 5, role: ['Admin', 'Chef', 'Owner'] },
    { title: 'Stock', id: 6, role: ['Admin', 'Chef', 'Owner'] },
    { title: 'Supplies', id: 8, role: ['Admin', 'Chef', 'Owner'] },
  ]
  function handlePage(id) {
    console.log(id)
    setFreeze(id)
    if (id === 1) {
      setCurrentPage(<Dashboard timing={timing} />)
    } else if (id === 2) {
      setCurrentPage(<Orders />)
    } else if (id === 3) {
      setCurrentPage(<Dishes />)
    } else if (id === 4) {
      setCurrentPage(<Users />)
    } else if (id === 5) {
      setCurrentPage(<Ingredients />)
    } else if (id === 6) {
      setCurrentPage(<Stock />)
    } else if (id === 7) {
      setCurrentPage(<PreMade />)
    }else if (id === 8) {
      setCurrentPage(<Supplies />)
    }
  }

  useEffect(() => {
    if(freeze === 1){
      setCurrentPage(<Dashboard timing={timing} />)
    }
  }, [timing])

  if (status === 'loading') {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!session) {
    router.push("/LogIn");
  }

  if (session?.user?.image === "customer") {
    router.push("/HomePage");
  }

  return (
    <div className="flex flex-col h-dvh font-primary tracking-wider">
      <div className="flex items-center justify-between py-5 px-12 bg-zinc-900 border-b border-zinc-700">
        <div className="flex flex-col items-center">
          <div className="font-primary font-bold tracking-wider bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
            <h2>RESTAURANT</h2>
          </div>
          <div className="flex scale-[0.8]">
            <div
              className="  
                            border-t-[15px] border-t-transparent
                            border-r-[15px] border-r-white
                            border-b-[15px] border-b-transparent"
            ></div>
            <div className="flex w-[80px] text-sm items-center justify-center bg-white text-zinc-600">
              DMLUASN
            </div>
            <div
              className="
                            border-t-[15px] border-t-transparent
                            border-l-[15px] border-l-white
                            border-b-[15px] border-b-transparent"
            ></div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-3xl ">
            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
              Admin
            </span>{" "}
            Panel
          </h2>
        </div>
        <div className="flex space-x-3 items-center">
          <div className="flex items-center gap-5">
            <DigitalClock setTiming={setTiming} />
            <div
              style={{
                backgroundImage: `url(/home-image.jpg)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-14 h-14 rounded-full"
            ></div>
            <div className="flex flex-col">
              <span className="font-primary tracking-wider text-xl">
                {session?.user?.name}
              </span>
              <span className="text-md text-zinc-700">
                {session?.user?.image.toUpperCase()}
              </span>
            </div>
          </div>

          <button onClick={signOut} type="button" className="scale-[0.9] w-fit h-fit bg-zinc-400 hover:text-white text-md text-black p-2 font-semibold transition-all duration-400 rounded-full hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656]">
            Sign Out
          </button>

        </div>
      </div>
      <div className='flex bg-zinc-900 w-screen overflow-hidden'>
        <div className="h-screen flex flex-col border-r border-zinc-700 "> {/* left side */}
          {menu.map((ele, index) => {
            return ele.role.includes(session?.user?.image) ? (
              <div key={index} className={`hover:bg-zinc-700 flex w-[200px] h-[75px] bg-zinb-900 border-b border-zinc-700 transition-all  items-center justify-center`}>
                <button className={`${ele.id === freeze ? 'text-xl font-semibold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text' : 'text-white hover:font-semibold hover:text-lg hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block hover:text-transparent bg-clip-text'} h-full w-full transition-all `} type="button" onClick={() => handlePage(ele.id)}>{ele.title}</button>
              </div>
            ) : null;
          })}
        </div>
        <div className='overflow-auto flex bg-black flex-grow'> {/* page */}
          {currentPage}
        </div>
      </div>
    </div>
  );
}
