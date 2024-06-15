import Link from 'next/link'
import MenuCard from './components/MenuCard'
import Header from './components/Header'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function MenuPage() {



    const { data: session, status } = useSession();

    const [dishes, setDishes] = useState([]);

    const [recipes, setRecipes] = useState([]);

    const [special, setSpecial] = useState(null);

    async function getRecipes() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/recipes`, postData);
        const response = await res.json();
        setRecipes(response.recipes);
    }

    async function getDishes() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dishes`, postData);
        const response = await res.json();
        setDishes(response.dishes);
    }

    useEffect(() => {
        getDishes();
        getRecipes();
    }, [])

    useEffect(() => {
        if (dishes.length > 0) {
            const specialDish = dishes.find(ele => ele.SPECIAL === 1);
            setSpecial(specialDish);
        }
    }, [dishes]);

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



    return (
        <div>
            <div className="relative z-10">
                <Header />
            </div>
            <div>
                <div className='fixed inset-0 animate-pulse'>
                    <div>
                        <div>
                            <img src="/menu-bg-1.png" className='h-screen' />
                        </div>
                        <div className='absolute bottom-0 right-0'>
                            <img src="/menu-bg-2.png" />
                        </div>
                    </div>
                </div>
                <div className='relative z-10 flex flex-col items-center'>

                    {special &&
                        <div className='p-10 flex'> {/* Special Now */}
                            <div style={{
                                backgroundImage: `URL(${special.IMAGE}),URL(/home-image.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }} className='h-[585px] w-[585px] rounded-l-lg'>

                            </div>
                            <div className='p-24 gap-3 flex bg-zinc-900 h-[585px] w-[585px] rounded-r-lg'>
                                <div>
                                    <img src="/special.png" className='translate-y-3 -translate-x-4' />
                                </div>
                                <div className='flex flex-col space-y-7'>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='font-primary leading-9 tracking-widest text-lg space-x-2'>
                                            <span>
                                                Today's
                                            </span>
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text ">
                                                Special
                                            </span>
                                        </div>
                                        <hr className="w-[100px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <h2 className='text-4xl leading-9 tracking-wide'>{special.NAME ? special.NAME : 'Dish Name'}</h2>
                                        <span className="text-md text-zinc-500">{recipes?recipes.map((ele)=>ele.INAME) :'Avocados with crab meat, red onion, crab salad stuffed bell pepper...'}</span>
                                    </div>
                                    <div className="flex gap-3"> {/* Profile Pic & Name */}
                                        <h2 className="font-primary text-3xl">₹</h2>
                                        <h2 className="font-primary text-3xl">{special.PRICE ? special.PRICE : '00.99'}</h2>
                                    </div>
                                    <div className='translate-y-7'>
                                        <button className="font-primary font-semibold text-2xl rounded-lg bg-gradient-to-r hover:bg-gradient-to-b from-[#CEA07E] to-[#BB5656] p-2">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className='flex flex-col space-y-20 items-center justify-center'>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <div className='font-primary leading-9 tracking-widest text-2xl'>DISHES</div>
                            <hr className="w-[500px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                        </div>
                        <div className='flex grid grid-cols-4 scale-100 gap-4'>
                            {dishes.map((dish, index) => (
                                dish.NAME !== "" ?
                                    (<div key={index}>
                                        <MenuCard
                                            id={dish.ID}
                                            name={dish.NAME}
                                            image={dish.IMAGE !== '/placeholder.png' ? dish.IMAGE : '/home-image.jpg'}
                                            price={dish.PRICE}
                                            special={dish.SPECIAL}
                                            type={dish.TYPE}
                                            isveg={dish.ISVEG}
                                            recipes={recipes.filter(recipe => recipe.DID === dish.ID)}
                                        />
                                    </div>) : null
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}