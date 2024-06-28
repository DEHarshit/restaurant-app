import Link from 'next/link';
import MenuCard from './components/MenuCard'
import SpecialModal from './components/SpecialModal'
import { useState, useEffect } from 'react'


export default function Dishes() {

    const [dishes, setDishes] = useState([])

    const [recipes, setRecipes] = useState([]);

    const [modal, setModal] = useState(false);

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

    /* bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text */

    return (
        <div className="flex bg-black justify-center w-screen ">
            <div className='flex flex-col items-center space-y-5 py-6'>
                <div className='flex items-center justify-between w-full'>

                    <div className='flex flex-col space-y-3'>
                        <h2 className="px-10 font-semibold text-3xl ">
                            <span className="text-white">
                                Dishes
                            </span>
                        </h2>
                        <hr className="w-[500px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                    </div>
                    <div className='flex space-x-5 px-10'>
                        <button onClick={()=>setModal(true)} type="button" className='bg-zinc-400 hover:text-white text-lg text-black p-2 px-10 font-semibold transition-all duration-400 hover:text-xl rounded-full hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656]'>
                            Change Today's Special
                        </button>
                        <Link href='/AddDish'>
                            <button type="button" className='bg-zinc-400 hover:text-white text-lg text-black p-2 px-10 font-semibold transition-all duration-400 hover:text-xl rounded-full hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656]'>
                                Add New Dish
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='flex grid grid-cols-4'>
                    {dishes.map((dish, index) => (
                        <div className='scale-[0.9]' key={index}>
                            <MenuCard
                                id={dish.ID}
                                name={dish.NAME}
                                image={dish.IMAGE !== '/placeholder.png' ? dish.IMAGE : '/home-image.jpg'}
                                price={dish.PRICE}
                                special={dish.SPECIAL}
                                type={dish.TYPE}
                                isveg={dish.ISVEG}
                                recipes={recipes.filter(recipe => recipe.DID === dish.ID)}
                                mode='admin'
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <SpecialModal
                isVisible={modal}
                setModal={setModal}
                dishes={dishes}
                />
            </div>
        </div>
    )
}