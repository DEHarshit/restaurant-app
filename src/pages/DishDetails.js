import MenuCard from './components/MenuCard'
import Header from './components/Header'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function DishDetails() {
    const router = useRouter();

    const { id } = router.query;

    const { data: session, status } = useSession();

    const [dishes, setDishes] = useState([]);

    const [dish, setDish] = useState(null);
    const [ing, setIng] = useState([]);

    const [recipes, setRecipes] = useState([]);

    const [dishQty, setDishQty] = useState(1);

    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedCart = sessionStorage.getItem('Cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } else {
            return [];
        }
    });

    const [qty, setQty] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedQty = sessionStorage.getItem('Qty');
            return storedQty ? JSON.parse(storedQty) : [];
        } else {
            return [];
        }
    });

    const [price, setPrice] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedPrice = sessionStorage.getItem('Price');
            return storedPrice ? JSON.parse(storedPrice) : [];
        } else {
            return [];
        }
    });

    const [cPrice, setCPrice] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedPrice = sessionStorage.getItem('CPrice');
            return storedPrice ? JSON.parse(storedPrice) : [];
        } else {
            return [];
        }
    });

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

    function handleCart(name) {
        if (!cart.includes(name)) {
            setCart((prevcart) => [...prevcart, name]);
            setQty((prevqty) => [...prevqty, dishQty]);
            setPrice((prevqty) => [...prevqty, special.PRICE]);
            setCPrice((prevqty) => [...prevqty, special.PRICE]);
        } else if (cart.includes(name)) {
            const index = cart.indexOf(name);
            const Qty = [...qty]
            Qty[index] = parseInt(Qty[index]) + parseInt(dishQty);
            setQty(Qty)
            const Price = [...price]
            Price[index] =  Price[index] + special.PRICE;
            setPrice(Price)
        }
    }

    useEffect(() => {
        getDishes();
        getRecipes();
    }, []);

    useEffect(() => {
        const selectedDish = dishes.find((dish) => dish.ID === parseInt(id));
        setDish(selectedDish);
        const recip = recipes.filter((dish) => dish.DID === parseInt(id))
        setIng(recip)
    }, [dishes, recipes]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("Cart", JSON.stringify(cart));
            sessionStorage.setItem("Qty", JSON.stringify(qty));
        }
    }, [cart, qty]);


    if (!dish || ing.length === 0 || status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        router.push('/LogIn')
    }

    return (
        <div>
            <div className="fixed sticky z-20 top-0 bg-zinc-900 bg-opacity-30">
                <Header
                    cart={cart}
                    setCart={setCart}
                    qty={qty}
                    setQty={setQty}
                />
            </div>
            <div
                style={{
                    backgroundImage: "url(/menu-bg-1.png)",
                }}
                className="font-primary flex justify-center items-center h-screen absolute inset-0"
            >
                <div
                    style={{
                        backgroundImage: `url(${dish.IMAGE})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                    className="bg-blue-100 h-[550px] w-[550px] rounded-l-lg"
                ></div>
                <div className="flex flex-col bg-zinc-900 h-[550px] w-[550px] p-10 space-y-10 rounded-r-lg">
                    <div className="flex flex-col space-y-3">
                        <h2 className="text-5xl text-white-100 font-semibold tracking-medium">
                            {dish.NAME}
                        </h2>
                        <hr className="w-[150px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                    </div>
                    <p
                        style={{
                            backgroundImage: 'linear-gradient(to right, white, #BB5656)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                        className="font-primary font-semibold text-3xl"
                    >
                        Elevate Your Palate!!
                    </p>
                    <p className="text-md text-gray-400">
                        {ing.map((ele, index) => (
                            <span key={index}>{ele.INAME}, </span>
                        ))}
                    </p>
                    <div className="flex items-center mb-6 ">
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-md text-zinc-400">Price</h2>
                            <h2 className="font-primary text-3xl text-white-100 mr-4 ">
                                ₹{dish.PRICE}
                            </h2>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-md text-zinc-400">Quantity</h2>
                            <div className="flex space-x-5">
                                <input
                                    type="text"
                                    className="font-primary text-2xl bg-zinc-800 border border-gray-300 rounded-r-lg rounded-l-lg px-3 py-1 w-16 text-center text-white"
                                    min="1"
                                    value={dishQty}
                                />
                                <div className="flex flex-col">
                                    <button type="button" onClick={(e)=>setDishQty(dishQty+1)}>
                                        <div className="  
                                            border-t-[10px] border-t-transparent
                                            border-r-[10px] border-r-white hover:border-r-green-800
                                            border-b-[10px] border-b-transparent rotate-90 transition-all">
                                        </div>
                                    </button>
                                    <button type="button" onClick={(e)=>{dishQty == 1 ? null :setDishQty(dishQty-1)}}>
                                        <div className="  
                                            border-t-[10px] border-t-transparent
                                            border-r-[10px] border-r-white hover:border-r-red-800
                                            border-b-[10px] border-b-transparent -rotate-90 transition-all">
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={(e) => handleCart(dish.NAME)} className="transition-all hover:font-primary font-semibold text-2xl w-[150px] rounded-l-lg rounded-r-lg bg-zinc-700 text-black hover:text-white hover:bg-gradient-to-b from-[#CEA07E] to-[#BB5656] p-2 ">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
