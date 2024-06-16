import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function CartModal({ isVisible, setModal, cart, setCart, qty, setQty }) {

    const { data: session } = useSession();

    const [phone, setPhone] = useState('');

    function handleClose() {
        setModal(false);
    }

    function handleAdd(index) {
        const newQty = [...qty];
        newQty[index] += 1;
        setQty(newQty);
    }

    function handleCancel() {
        setCart([])
        setQty([])
    }

    function handleReduce(index) {
        if (qty[index] === 1) {
            setCart((prevCart) => prevCart.filter((ele, ind) => ind !== index));
            setQty((prevQty) => prevQty.filter((ele, ind) => ind !== index));
        } else {
            const newQty = [...qty];
            newQty[index] -= 1;
            setQty(newQty);
        }
    }

    async function getPhone() {
        const postData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name: session?.user?.name })
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getphone`, postData);
        const response = await res.json();
        if (res) {
            setPhone(response[0].PHONE);
        }
    }

    async function handlePlaceOrder() {
        const postData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name: session?.user?.name, cart: cart, qty: qty, phone: phone })
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, postData);
        handleCancel();
    }

    useEffect(() => {
        getPhone();
    }, [])

    useEffect(() => console.log(phone), [phone])

    if (!isVisible) return null;

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="relative w-[1000px] h-[600px] bg-zinc-900 bg-opacity-70 rounded-xl p-6 overflow-auto">
                <div className="flex justify-between items-center mb-4"><div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text text-3xl font-primary font-bold text-center">
                    SHOPPING CART
                </div>

                    <button onClick={handleClose} className="text-2xl text-white hover:text-gray-300">
                        X
                    </button>
                </div>
                <div className="overflow-y-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text py-2 px-4 text-left text-2xl">
                                    DISH
                                </th>
                                <th className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text py-2 px-4 text-left text-2xl">
                                    QUANTITY
                                </th>
                                <th className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text py-2 px-4 text-left text-2xl">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="border-b border-zinc-700">
                                    <td className="py-2 px-4 text-lg ">{item}</td>
                                    <td className="py-2 px-4 text-lg ">{qty[index]}</td>
                                    <td className="py-2 px-4 space-x-4">
                                        <button onClick={() => handleAdd(index)} className="text-2xl text-green-800 hover:text-green-600 hover:scale-[1.1] transition-all mr-2">
                                            + <span className='text-2xl text-lg text-white'>ADD</span>
                                        </button>
                                        <button onClick={() => handleReduce(index)} className="text-2xl text-red-800 hover:scale-[1.1] transition-all hover:text-red-600">
                                            - <span className='text-2xl text-lg text-white'>REMOVE</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div>
                        {cart.length !== 0
                            ?
                            <div className="flex justify-end mt-4">
                                <button onClick={handlePlaceOrder} className="text-white text-lg font-semibold px-4 py-2 rounded-md mr-4 bg-gradient-to-t from-[#CEA07E] to-[#BB5656] hover:from-[#BB5656] hover:to-[#CEA07E] hover:text-white hover:bg-gradient-to-t hover:bg-gradient-to-b">
                                    Place Order
                                </button>

                                <button onClick={() => handleCancel()} className="text-white font-semibold transition-all text-lg px-4 py-2 rounded-md mr-4 bg-gradient-to-t from-[#CEA07E] to-[#BB5656] hover:from-[#BB5656] hover:to-[#CEA07E] hover:text-white hover:bg-gradient-to-t hover:bg-gradient-to-b">
                                    Cancel Order
                                </button>
                            </div>
                            : null
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}
