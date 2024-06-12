import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function HomePage(){
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const router = useRouter();

    if (!session) {
        router.push('/LogIn')
    }

    return(
        <div className="relative flex flex-col h-screen">
            <div style={{backgroundImage: `url(/home-image.jpg)`, 
                        backgroundSize: "cover", 
                        backgroundPosition: "center"}} 
                className="absolute inset-0">
            </div>
            <div 
                className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-transparent bg-blend-overlay">
            </div>
            
            <div className="relative flex flex-col h-screen">
                <div className="flex items-center justify-between p-5">
                    <div className="flex flex-col items-center ">
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
                    <div className="flex space-x-3 items-center">
                    <div className="flex items-center gap-5">
                        <div style={{
                            backgroundImage: `url(/home-image.jpg)`,
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                        }}
                            className="w-14 h-14 rounded-full">
                        </div>
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
                </div>
                <div className="flex flex-col items-center justify-center py-32 gap-8">
                    <div className="flex flex-col items-center tracking-widest">
                    <h2 className="text-5xl leading-10">
                        <span className="p-3 font-primary bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                            RESTAURANT! 
                        </span>
                        DMLUASN
                    </h2>
                    </div>
                    <div className="font-primary text-base leading-8 tracking-wider">
                        <p>
                        TAKE ADVANTAGE OF THIS AMAZING EXCLUSIVE OFFER
                        </p>
                        <p>
                        DON'T MISS THIS OPPORTUNITY FOR YOUR BUSINESS
                        </p>
                    </div>
                    <div>
                        <Link href="/MenuPage">
                            <button className="w-52 font-primary tracking-wider bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block p-5 rounded-full font-semibold text-xl hover:scale-105 transition-all">Order Now</button>
                        </Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}
