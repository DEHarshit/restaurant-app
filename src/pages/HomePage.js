import Link from 'next/link'

export default function Header(){
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
                        <div className="font-primary font-bold tracking-wider">
                            <h2>RESTAURANT</h2>
                        </div>
                        <div className="flex scale-[0.8]">
                            <div class="  
                            border-t-[15px] border-t-transparent
                            border-r-[15px] border-r-white
                            border-b-[15px] border-b-transparent">
                            </div>
                            <div className="flex w-[80px] text-sm items-center justify-center bg-white text-zinc-600">
                                DMLUASN
                            </div>
                            <div class="
                            border-t-[15px] border-t-transparent
                            border-l-[15px] border-l-white
                            border-b-[15px] border-b-transparent">
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="flex items-center gap-5">
                            <div style={{backgroundImage: `url(/home-image.jpg)`, 
                                        backgroundPosition: "center", 
                                        backgroundSize: "cover"}} 
                                className="w-14 h-14 rounded-full">
                            </div>
                            <span className="font-primary tracking-wider">
                                Username
                            </span>
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
