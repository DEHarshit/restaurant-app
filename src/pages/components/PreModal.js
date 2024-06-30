import { useState, useEffect } from "react";
import Ingredients from "../Ingredients";

export default function PreModal({ isVisible, setModal, id, name, counts, addCount }) {

    const [qty, setQty] = useState(0);
    const [stock, setStock] = useState([]);
    const [ordetails, setOrdetails] = useState([])

    async function getStock() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stock`, postData);
        const response = await res.json();
        setStock(response.stock);
    }

    function handleClose() {
        setModal(false);
    }

    async function handleSave() {
        addCount(id, parseInt(qty), parseInt(counts));
        let copyStock = JSON.parse(JSON.stringify(stock));
        const recipes = await dishRecipes(name);
        recipes.forEach(recipe => {
            let requiredQty = recipe.QTY * qty;
            let index = 0;
            while (requiredQty > 0) {
                let ind = copyStock.findIndex((ingredient, i) => ingredient.INAME === recipe.INAME && i >= index);
                if (ind !== -1) {
                    if (copyStock[ind].QTY >= requiredQty) {
                        copyStock[ind].QTY -= requiredQty;
                        requiredQty = 0;
                    } else {
                        requiredQty -= copyStock[ind].QTY;
                        copyStock[ind].QTY = 0;
                    }
                    index = ind + 1;
                } else {
                    break;
                }
            }
        });
        setStock(copyStock);
        const updateStock = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ stock: copyStock })
        }
        const updateStockRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updateStock`, updateStock);
        const updateStockResponse = await updateStockRes.json();
        handleClose();
    }

    async function dishRecipes(dishName) {
        const postData = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id: dishName }),
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/recipes`, postData);
        const response = await res.json();
        return response.recipes;
    }

    async function getOrders() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, postData);
        const response = await res.json();
        setOrdetails(response.ordetails)
    }

    useEffect(() => {
        getOrders();
        getStock();
    }, [])

    if (!isVisible) return null
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="relative w-[600px] h-[380px] bg-zinc-900 bg-opacity-70 rounded-xl">
                <div className="font-bold text-3xl right-0 absolute p-3 px-6 hover:scale-[1.1] transition-all">
                    <button onClick={handleClose} type="button">
                        X
                    </button>
                </div>
                <div>
                    <div className="py-10 px-10 flex flex-col items-center space-y-10">
                        <div>
                            <h2 className="font-bold tracking-widest leading-4">
                                <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-3xl  text-transparent inline-block bg-clip-text">
                                    ADD<span className="text-white"> SERVINGS</span>
                                </span>
                            </h2>
                        </div>
                        <h2 className="p-1 w-fit h-fit text-2xl rounded-lg font-semibold tracking-wide leading-4">
                            <span className="text-white">
                                {name.toUpperCase()}
                            </span>
                        </h2>
                        <span>
                            <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text">
                                    Quant<span className="text-white">ity</span>
                                </span>
                            </h2>
                            <input value={qty} onChange={(e) => setQty(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                        </span>
                    </div>
                    <div>
                        <div className='flex justify-center items-center space-x-10 py-7 px-7'>
                            <button onClick={() => handleSave()} type="button" className='hover:scale-[1.1] transition-all bg-green-600 text-lg p-1 rounded-full px-2'>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}