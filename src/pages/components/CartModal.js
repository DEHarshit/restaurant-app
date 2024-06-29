import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartModal({ isVisible, setModal, cart, setCart, qty, setQty, price, setPrice, cPrice, setCPrice, cartId, setCartId, available, preAvailable }) {

    const { data: session } = useSession();

    const [phone, setPhone] = useState('');

    const [mode, setMode] = useState('cart');

    const [order, setOrder] = useState([])
    const [ordetails, setOrdetails] = useState([])
    const [dropDown, setDropDown] = useState(null);

    const [isCanceling, setIsCanceling] = useState(false);

    function handleClose() {
        setModal(false);
    }

    function handleAdd(index) {
        const newQty = [...qty];
        newQty[index] += 1;
        setQty(newQty);
        const Price = [...price];
        Price[index] = Price[index] + cPrice[index]
        setPrice(Price)
    }

    function handleCancel() {
        setIsCanceling(true); // have to change this later
    }

    useEffect(() => {
        if (isCanceling) {
            setQty([]);
            setCart([]);
            setPrice([]);
            setCPrice([]);
            setCartId([]);
            setIsCanceling(false);
        }
    }, [isCanceling]);

    function handleReduce(index) {
        if (qty[index] === 1) {
            setCart((prevCart) => prevCart.filter((ele, ind) => ind !== index));
            setCartId((prevCart) => prevCart.filter((ele, ind) => ind !== index));
            setQty((prevQty) => prevQty.filter((ele, ind) => ind !== index));
            setPrice((prevQty) => prevQty.filter((ele, ind) => ind !== index));
            setCPrice((prevQty) => prevQty.filter((ele, ind) => ind !== index));
        } else {
            const newQty = [...qty];
            newQty[index] -= 1;
            setQty(newQty);
            const Price = [...price];
            Price[index] = Price[index] - cPrice[index]
            setPrice(Price)
        }
    }

    async function getOrders() {
        const postData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name: session?.user?.name })
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userorders`, postData);
        const response = await res.json();
        setOrder(response.orders)
        setOrdetails(response.ordetails)
    }

    async function getPhone() {
        if (session) {
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
                setPhone(response.phone[0].PHONE);
            }
        }
    }

    async function handleOrdCancel(id) {
        const postData = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id, name: session?.user?.name })
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userorders`, postData);
        const response = await res.json();
        setOrder(response.orders)
        setOrdetails(response.ordetails)
    }

    async function handlePlaceOrder() {
        const postData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name: session?.user?.name, cart: cart, qty: qty, phone: phone, price: price })
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, postData);
        handleCancel();
    }

    useEffect(() => {
        getPhone();
    }, [])

    useEffect(() => {
        getOrders()
    }, [mode])

    useEffect(() => console.log(phone), [phone])

    if (!isVisible) return null;

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="relative w-[1000px] h-[600px] bg-zinc-900 bg-opacity-70 rounded-xl p-6 overflow-auto space-y-3">
                <div className='flex items-center justify-between p-2 border-b border-zinc-700'>
                    <div className='flex space-x-10'>
                        <button type="button" onClick={() => setMode("cart")} className={`${mode === 'cart' ? 'bg-gradient-to-r from-[#CEA07E] to-[#BB5656]' : 'bg-zinc-500'} transition-all bg-zinc-500 w-[150px] rounded-lg font-primary text-2xl font-bold py-1 bg-opacity-40 hover:bg-opacity-70`}>
                            Cart
                        </button>
                        <button type="button" onClick={() => setMode("orders")} className={`${mode === 'orders' ? 'bg-gradient-to-r from-[#CEA07E] to-[#BB5656]' : 'bg-zinc-500'} transition-all bg-zinc-500 w-[150px] rounded-lg font-primary text-2xl font-bold py-1 bg-opacity-40 hover:bg-opacity-70`}>
                            Orders
                        </button>
                    </div>
                    <button onClick={handleClose} className="text-2xl text-white hover:text-gray-300">
                        X
                    </button>
                </div>
                {mode === "orders"

                    ?
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text text-3xl font-primary font-bold text-center">
                                CURRENT <span className='text-white'>
                                    ORDERS
                                </span>
                            </div>
                        </div>
                        <div className="p-2 flex flex-col space-y-5">
                            {order.map((ele, index) => {
                                if (order.STATUS !== 'Cancelled') {
                                    return (
                                        <div key={index} className='max-w-div bg-black rounded-3xl'>
                                            <div onClick={() => { dropDown == index ? setDropDown(null) : setDropDown(index) }} className=' bg-zinc-800 hover:translate-y-2 hover:translate-x-2 transition-all duration-400 rounded-3xl'>
                                                <div className='flex items-center justify-between px-5 h-[100px]'>
                                                    <div className='flex space-x-10'>
                                                        <div className='flex flex-col items-center p-2'>
                                                            <h2 className='text-lg font-semibold tracking-wide leading-9'>
                                                                <div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text">
                                                                    Order <span className='text-white'>
                                                                        ID
                                                                    </span>
                                                                </div>
                                                            </h2>
                                                            <h2>
                                                                {ele.ID}
                                                            </h2>
                                                        </div>
                                                        <div className='flex flex-col items-center p-2'>
                                                            <h2 className='text-lg font-semibold tracking-wide leading-9'>
                                                                <div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text">
                                                                    Order <span className='text-white'>
                                                                        Status
                                                                    </span>
                                                                </div>
                                                            </h2>
                                                            <h2>
                                                                <span className={`${ele.STATUS === 'Pending' ? 'text-red-800' : ele.STATUS === 'Finished' ? 'text-blue-800' : 'text-green-800'} cursor-default font-bold`}>
                                                                    {ele.STATUS.toUpperCase()}
                                                                </span>
                                                            </h2>
                                                        </div>
                                                        <div className='flex flex-col items-center p-2'>
                                                            <h2 className='text-lg font-semibold tracking-wide leading-9'>
                                                                <div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text">
                                                                    Payment <span className='text-white'>
                                                                        Status
                                                                    </span>
                                                                </div>
                                                            </h2>
                                                            <h2>
                                                                {ele.PSTATUS}
                                                            </h2>
                                                        </div>
                                                        <div className='flex flex-col items-center p-2'>
                                                            <h2 className='text-lg font-semibold tracking-wide leading-9 text-white'>
                                                                <div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text">
                                                                    Total <span className='text-white'>
                                                                        Cost
                                                                    </span>
                                                                </div>
                                                            </h2>
                                                            <h2 className='text-lg text-red-600'>
                                                                {ele.PRICE}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <div className='flex space-x-5 items-center'>
                                                        <Link href={`/Bill?id=${ele.ID}`}>
                                                            <button type="button" className='bg-zinc-700 hover:bg-blue-700 p-2 rounded-full px-5 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                                Pay
                                                            </button>
                                                        </Link>
                                                        <button type="button" onClick={() => handleOrdCancel(ele.ID)} className='bg-zinc-700 hover:bg-red-700 p-2 rounded-full px-3 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                            Cancel Order
                                                        </button>
                                                        <button type="button">
                                                            <div className={`${dropDown == index ? 'rotate-90' : '-rotate-90'}
                                                        border-t-[7px] border-t-transparent
                                                        border-r-[7px] border-r-white hover:border-r-zinc-400
                                                        border-b-[7px] border-b-transparent  transition-all duration-300`}>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                {dropDown === index && (
                                                    <div className=''>
                                                        <table className="w-full">
                                                            <thead className='bg-zinc-900 '>
                                                                <tr className="text-[#C27165] border-b border-zinc-700 text-zinc-400">
                                                                    <th className="py-1">
                                                                        DISH
                                                                    </th>
                                                                    <th className="">
                                                                        QUANTITY
                                                                    </th>
                                                                    <th className="">
                                                                        COST
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className='font-primary text-md text-zinc-400'>
                                                                {ordetails.map((ord, ind) => {
                                                                    if (ord.OID === ele.ID)
                                                                        return (
                                                                            <tr key={ind} onClick={(e) => handlefinish(ord.OID, ord.DNAME)} className='border-b hover:scale-[1.01] border-zinc-800 bg-zinc-900 hover:text-white hover:bg-zinc-800'>
                                                                                <td className='py-1'>
                                                                                    <span className='flex justify-center'>
                                                                                        {ord.DNAME}
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span className='flex justify-center'>
                                                                                        {ord.QTY}
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span className='flex justify-center'>
                                                                                        ₹ {ord.PRICE}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )
                                }
                            })}

                        </div>
                    </div>

                    :
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text text-3xl font-primary font-bold text-center">
                                SHOPPING <span className='text-white'>
                                    CART
                                </span>
                            </div>
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
                                            PRICE
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
                                            <td className="py-2 px-4 text-lg ">{price[index]}</td>
                                            <td className="py-2 px-4 space-x-4">
                                                {
                                                    available.includes(cartId[index]) || preAvailable.includes(cartId[index])
                                                        ? <button onClick={() => handleAdd(index)} className="text-2xl text-green-800 hover:text-green-600 hover:scale-[1.1] transition-all mr-2">
                                                            + <span className='text-2xl text-lg text-white'>ADD</span>
                                                        </button>
                                                        : null
                                                }

                                                <button onClick={() => handleReduce(index)} className="text-2xl text-red-800 hover:scale-[1.1] transition-all hover:text-red-600">
                                                    - <span className='text-2xl text-lg text-white'>REMOVE</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {cart.length !== 0 ?
                                        <tr >
                                            <td>
                                            </td>
                                            <td className="">
                                                <h2 className="flex justify-end px-3 text-xl py-2">
                                                    Total Price:
                                                </h2>
                                            </td>
                                            <td className="">
                                                <h2 className="flex justify-start px-3 text-xl py-2">
                                                    {price.reduce((acc, price) => acc + price, 0)}
                                                </h2>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        : <tr>
                                            <td colSpan="100%" className="">
                                                <div className='flex items-center p-5 text-2xl'>
                                                    <h2>
                                                        Your Cart is Empty . . .
                                                    </h2>
                                                </div>
                                            </td>
                                        </tr>
                                    }
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
                }



            </div>
        </div >
    );
}
