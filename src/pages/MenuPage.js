import Link from 'next/link'
import MenuCard from './components/MenuCard'
import Header from './components/Header'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function MenuPage() {

    let copyStock = []

    let offset = 0;

    const [ timing, setTiming] = useState('');

    const { data: session, status } = useSession();

    const [dishes, setDishes] = useState([]);

    const [recipes, setRecipes] = useState([]);

    const [special, setSpecial] = useState(null);

    const [search, setSearch] = useState('');

    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedCart = sessionStorage.getItem('Cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } else {
            return [];
        }
    });

    const [cartId, setCartId] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedCartId = sessionStorage.getItem('CartId');
            return storedCartId ? JSON.parse(storedCartId) : [];
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

    const {
        transcript,
        listening,
        resetTranscript
    } = useSpeechRecognition();

    const handleSpeechRecognition = () => {
        SpeechRecognition.startListening({ continuous: true });
    };


    const [totalStock, setTotalStock] = useState([]);
    const [tempStock, setTempStock] = useState([]);
    const [tempDish, setTempDish] = useState([]);
    const [rcount, setrCount] = useState([]);
    const [available, setAvaiable] = useState([]);
    const [acount, setaCount] = useState([]);
    const [ingredients, setIngredients] = useState([])
    const [preDish, setPreDish] = useState([]);
    const [preAvailable, setPreAvailable] = useState([]);
    async function getRecipes() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/recipes`, postData);
        const response = await res.json();
        setRecipes(response.srecipes);
        setrCount(response.rcount);
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
        setTempDish(response.dishes);
    }

    function handleCart() {
        if (!cart.includes(special.NAME)) {
            setCart((prevcart) => [...prevcart, special.NAME]);
            setQty((prevqty) => [...prevqty, 1]);
            setPrice((prevqty) => [...prevqty, special.PRICE]);
            setCPrice((prevqty) => [...prevqty, special.PRICE]);
            setCartId((prevqty) => [...prevqty, special.ID])
        } else if (cart.includes(special.NAME)) {
            const index = cart.indexOf(special.NAME);
            const Qty = [...qty]
            Qty[index] = Qty[index] + 1;
            setQty(Qty)
            const Price = [...price]
            Price[index] = Price[index] + special.PRICE;
            setPrice(Price)
        }
    }

    async function getTotalStock() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dynamic`, postData);
        const response = await res.json();
        setTotalStock(response.stock);
        setTempStock(response.stock)
        setIngredients(response.ingredients)
        setPreDish(response.predish)
    }

    useEffect(() => {
        setAvaiable([]);
        setaCount([]);
        {
            rcount.map((ele, index) => {
                let min = 999;
                let flag = false; // is available
                for (let i = 0; i < ele.COUNT; i++) {
                    let newmin = 0
                    totalStock.map(stck => {
                        if (recipes[offset].INAME === stck.INAME) {
                            if (recipes[offset].QTY > stck.QTY) {
                                flag = true; // not available
                            } else {
                                newmin = Math.floor(stck.QTY / recipes[offset].QTY)
                                if (newmin < min) {
                                    min = newmin
                                }
                            }
                        }
                    });
                    offset = offset + 1;
                }
                if (flag === false) {
                    setAvaiable((pavailable) => [...pavailable, ele.DID])
                    setaCount((pavailable) => [...pavailable, min])
                }
            })
        }
    }, [totalStock, recipes, rcount])


    useEffect(() => {
        getDishes();
        getRecipes();
        getTotalStock();
        getRecipes();
    }, [])

    useEffect(() => {
        if (dishes.length > 0) {
            const specialDish = dishes.find(ele => ele.SPECIAL === 1);
            setSpecial(specialDish);
        }
    }, [dishes]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("Cart", JSON.stringify(cart));
            sessionStorage.setItem("Qty", JSON.stringify(qty));
            sessionStorage.setItem("Price", JSON.stringify(price));
            sessionStorage.setItem("CPrice", JSON.stringify(cPrice));
            sessionStorage.setItem("CartId", JSON.stringify(cartId));
        }
    }, [cart, qty, price]);

    useEffect(() => {
        async function dishRecipes(copyStock, ele, index) {
            const postData = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id: ele })
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/recipes`, postData);
            const response = await res.json();
            const recipe = response.recipes;

            if (recipe) {
                recipe.forEach(ele => {
                    let ind = ingredients.findIndex(ingredient => ingredient.NAME === ele.INAME);
                    if (ind !== -1) {
                        if (copyStock[ind].QTY < (ele.QTY * qty[index])) {
                            copyStock[ind].QTY = 0;
                        } else {
                            copyStock[ind].QTY = copyStock[ind].QTY - (ele.QTY * qty[index]);
                        }
                    }
                });
            }
        };

        async function updateStock() {
            let copyStock = JSON.parse(JSON.stringify(tempStock));
            let copyDishes = JSON.parse(JSON.stringify(tempDish));
            let copyPreAvailable = [...preAvailable];
            if (cartId.length !== 0) {
                for (const [index, dishId] of cartId.entries()) {
                    if (!(preDish.findIndex(dish => dish.ID === dishId) !== -1)) {
                        await dishRecipes(copyStock, dishId, index);
                    } else {
                        let ind = copyDishes.findIndex(dish => dish.ID === dishId);
                        if (ind !== -1) {
                            if (copyDishes[ind].COUNT - qty[index] <= 0) {
                                copyDishes[ind].COUNT = 0
                                copyPreAvailable = copyPreAvailable.filter(id => id !== dishId)
                            } else {
                                copyDishes[ind].COUNT = copyDishes[ind].COUNT - qty[index];
                                if (!copyPreAvailable.includes(dishId)) {
                                    copyPreAvailable.push(dishId);
                                }
                            }
                        }
                    }
                }
            }
            setDishes(copyDishes);
            setTotalStock(copyStock);
            setPreAvailable(copyPreAvailable);
        };

        updateStock();

    }, [qty, tempStock, cartId, ingredients])

    useEffect(() => { transcript ? setSearch(transcript) : '' }, [transcript])

    useEffect(()=>{
        console.log(timing)
    },[timing])

    useEffect(()=>{
        console.log(acount,available)
    },[acount,available])


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
            <div className="fixed sticky z-20 top-0 bg-zinc-900 bg-opacity-30">
                <Header
                    cart={cart}
                    setCart={setCart}
                    qty={qty}
                    setQty={setQty}
                    price={price}
                    setPrice={setPrice}
                    cPrice={cPrice}
                    setCPrice={setCPrice}
                    cartId={cartId}
                    setCartId={setCartId}
                    available={available}
                    preAvailable={preAvailable}
                    setTiming={setTiming}
                />
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
                                <div className="h-[75px] w-[75px]">
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
                                        <span className="text-md text-zinc-500">{recipes ? recipes.map((ele) => (ele.DID === special.ID ? `${ele.INAME}, ` : null)) : 'Avocados with crab meat, red onion, crab salad stuffed bell pepper...'}</span>
                                    </div>
                                    <div className="flex gap-3"> {/* Profile Pic & Name */}
                                        <h2 className="font-primary text-3xl">₹</h2>
                                        <h2 className="font-primary text-3xl">{special.PRICE ? special.PRICE : '00.99'}</h2>
                                    </div>
                                    <div className='translate-y-7'>
                                        <button onClick={handleCart} className="font-primary font-semibold text-2xl rounded-lg bg-gradient-to-r hover:bg-gradient-to-b from-[#CEA07E] to-[#BB5656] p-2">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }



                    <div className='flex flex-col space-y-10 items-center justify-center'>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <div className='font-primary leading-9 tracking-widest text-2xl'>DISHES</div>
                            <hr className="w-[500px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                        </div>
                        <div className="flex flex-col space-y-4 items-center">
                            <h2 className="text-2xl text-zinc-700 font-bold tracking-wider">SEARCH</h2>
                            <div className="flex items-center space-x-3">
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    className="w-[650px] h-[30px] rounded-xl text-zinc-900 text-xl p-1 font-semibold px-2"
                                    type="text"
                                    placeholder="Looking for a specific dish?"
                                />
                                <div>
                                    <button onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening} type="button"
                                        className={`${listening ? 'bg-red-800 animate-pulse' : 'bg-zinc-700'} flex items-center justify-center scale-[1.1] hover:scale-[1.2] h-[35px] w-[35px]  hover:bg-red-800 transition-all rounded-full p-2`}>
                                        <img src="/mic.png" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-1 min-h-[750px] grid grid-cols-4 scale-100 gap-4'>
                            {dishes.filter(dish => dish.NAME.toLowerCase().includes(search.toLowerCase())).map((dish, index) => (
                                dish.TYPE.includes(timing) 
                                ? dish.NAME !== ""
                                ? dish.ISPRE !== 1 ?
                                    available.includes(dish.ID) ? (
                                        <div key={index}>
                                            <MenuCard
                                                id={dish.ID}
                                                name={dish.NAME}
                                                image={dish.IMAGE !== '/placeholder.png' ? dish.IMAGE : '/home-image.jpg'}
                                                price={dish.PRICE}
                                                special={dish.SPECIAL}
                                                type={dish.TYPE}
                                                isveg={dish.ISVEG}
                                                recipes={recipes.filter(recipe => recipe.DID === dish.ID)}
                                                cart={cart}
                                                setCart={setCart}
                                                qty={qty}
                                                setQty={setQty}
                                                setPrice={setPrice}
                                                prices={price}
                                                setCPrice={setCPrice}
                                                cartId={cartId}
                                                setCartId={setCartId}
                                            />
                                            <div className='flex justify-end -translate-y-[425px] text-xl -translate-x-[10px] scale-[0.9]'>
                                                <div className='bg-zinc-800 py-2 px-4 inline-block rounded-2xl'>Availability: {acount[available.findIndex(id => id === dish.ID)]} </div>
                                            </div>
                                        </div>
                                    ) : null

                                    : dish.COUNT !== 0 ?
                                    <div key={index}>
                                        <MenuCard
                                            id={dish.ID}
                                            name={dish.NAME}
                                            image={dish.IMAGE !== '/placeholder.png' ? dish.IMAGE : '/home-image.jpg'}
                                            price={dish.PRICE}
                                            special={dish.SPECIAL}
                                            type={dish.TYPE}
                                            isveg={dish.ISVEG}
                                            recipes={recipes.filter(recipe => recipe.DID === dish.ID)}
                                            cart={cart}
                                            setCart={setCart}
                                            qty={qty}
                                            setQty={setQty}
                                            setPrice={setPrice}
                                            prices={price}
                                            setCPrice={setCPrice}
                                            cartId={cartId}
                                            setCartId={setCartId}
                                            ispre={dish.ISPRE}
                                        />
                                        <div className='flex justify-end -translate-y-[425px] text-xl -translate-x-[10px] scale-[0.9]'>
                                            <div className='bg-zinc-800 py-2 px-4 inline-block rounded-2xl'>Availability: {dish.COUNT} </div>
                                        </div>
                                    </div> : null
                                : null :null
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}