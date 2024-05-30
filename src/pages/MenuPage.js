import Link from 'next/link'
import MenuCard from './components/MenuCard'
import Header from './components/Header'

export default function MenuPage(){
    return(
        <div>
            <div className="relative z-10">
                <Header/>
            </div>
            <div>
            <div className='fixed inset-0 animate-pulse'>
                <div>
                    <div>
                        <img src="/menu-bg-1.png" className='h-screen'/>
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <img src="/menu-bg-2.png"/>
                    </div>
                </div>
            </div>
            <div className='relative z-10 flex flex-col items-center'>
                <div className='p-10 flex'> {/* Special Now */}
                    <div style={{
                        backgroundImage: `URL(/home-image.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}className='h-[585px] w-[585px] rounded-l-lg'>

                    </div>
                    <div className='p-24 gap-3 flex bg-zinc-900 h-[585px] w-[585px] rounded-r-lg'>
                        <div>
                            <img src="/special.png" className='translate-y-3 -translate-x-4'/>
                        </div>
                        <div className='flex flex-col space-y-7'>
                            <div className='flex flex-col space-y-2'>
                                <div className='font-primary leading-9 tracking-widest text-lg'>Today's Special</div>
                                <hr className="w-[100px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-4xl leading-9 tracking-wide'>Dish Name</h2>
                                <span className="text-md text-zinc-500">Avocados with crab meat, red onion, crab salad stuffed bell pepper...</span>
                            </div>
                            <div className="flex gap-3"> {/* Profile Pic & Name */}
                                <h2 className="font-primary text-3xl">$</h2>
                                <h2 className="font-primary text-3xl">00.99</h2>
                            </div>
                            <div className='translate-y-7'>
                                <button className="font-primary font-semibold text-2xl rounded-lg bg-gradient-to-r hover:bg-gradient-to-b from-[#CEA07E] to-[#BB5656] duration-400 transition-colors p-2">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col -space-y-20 items-center justify-center'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className='font-primary leading-9 tracking-widest text-2xl'>DISHES</div>
                    <hr className="w-[500px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                </div>
                <div className='flex grid grid-cols-4 scale-75 gap-8'>
                    <MenuCard/>
                    <MenuCard/> 
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/>
                    <MenuCard/> 
                    <MenuCard/>
                    <MenuCard/>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}