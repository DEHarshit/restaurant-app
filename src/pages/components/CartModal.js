import { useState, useEffect } from "react";

export default function CartModal({ isVisible, setModal,cart,setCart,qty,setQty }) {

    const [special, setSpecial] = useState(0);
/* 
    const [cart, setCart] = useState([]);
    const [qty, setQty] = useState([]);
 */

    function handleClose() {
        setModal(false);
    }

    function handleSave() {
        handleClose();
    }

    function handleAdd(index) {
        const oldQty = [...qty];
        oldQty[index] = oldQty[index] + 1;
        setQty(oldQty);
    }

    function handleReduce(index) {
        const oldQty = [...qty];
        if (oldQty[index] == 1) {
            setCart((oldCart)=>oldCart.filter((ele,ind)=>ind!==index))
            setQty((oldQty)=>oldQty.filter((ele,ind)=>ind!==index))
        } else {
            oldQty[index] = oldQty[index] - 1;
            setQty(oldQty);
        }
    }

    /* useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("Cart", JSON.stringify(cart));
            sessionStorage.setItem("Qty", JSON.stringify(qty));
        }
    }, [cart, qty]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = sessionStorage.getItem('Cart');
            setCart(storedCart ? JSON.parse(storedCart) : [])
            const storedQty = sessionStorage.getItem('Qty');
            setQty(storedQty ? JSON.parse(storedQty) : [])
        } else {
            setCart([]);
            setQty([]);
        }
    }, [isVisible]) */

    if (!isVisible) return null
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="relative w-[1200px] h-[680px] bg-zinc-900 bg-opacity-70 rounded-xl">
                <div className="font-bold text-3xl right-0 absolute p-3 px-6 hover:scale-[1.1] transition-all">
                    <button onClick={handleClose} type="button">
                        X
                    </button>
                </div>
                <div className="flex flex-col">
                    {cart.map((item, index) => (
                        <div key={index} className="flex space-x-2">
                            <h2>
                                {item}
                            </h2>
                            <h2>
                                {qty[index]}
                            </h2>
                            <button type="button" onClick={(e) => handleAdd(index)} className="text-xl text-green-900">
                                +
                            </button>
                            <button type="button" onClick={(e) => handleReduce(index)} className="text-xl text-red-900">
                                -
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}