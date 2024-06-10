import Link from 'next/link'
export default function Header() {
    return (
        <div className="flex items-center justify-between p-5">
            <div className="flex flex-col items-center ">
                <div className="font-primary font-bold tracking-wider bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                    <h2>RESTAURANT</h2>
                </div>
                <Link href='/'>
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
                </Link>

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
    )
}