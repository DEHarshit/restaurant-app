import { useState, useEffect } from 'react'

export default function Orders() {

    const [order, setOrder] = useState([])
    const [ordetails, setOrdetails] = useState([])
    const [dropDown, setDropDown] = useState(null);
    const [stock, setStock] = useState([]);
    const [all, setAll] = useState(false);

    function handlefinish(id, name) {
        setOrdetails(Order => Order.map(ord => ord.OID === id && ord.DNAME === name ? { ...ord, FIN: !ord.FIN } : ord))
    }

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

    async function handleCancel(id) {
        const postData = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id })
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, postData);
        const response = await res.json();
        setOrder(response.orders)
    }

    async function handleAccept(id, status, index) {
        const postData = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id, status })
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, postData);
        const response = await res.json();
        setOrder(response.orders);

        if (response && status === 'Pending') {
            let copyStock = JSON.parse(JSON.stringify(stock));
            for (const ele of ordetails) {
                if (ele.OID === id) {
                    const recipes = await dishRecipes(ele.DNAME);
                    if (recipes[0].ISPRE === 0){
                        recipes.forEach(recipe => {
                            let requiredQty = recipe.QTY * ele.QTY; // if there is a problem, its due to this
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
                    } else {
                        console.log(recipes)
                        async function addCount(id, count) {
                            const postData = {
                                method: "POST",
                                headers: {
                                    "Content-type": "application/json",
                                },
                                body: JSON.stringify({ id: id, count: count })
                            };
                            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dynamic`, postData);
                            const response = await res.json();
                            console.log(response)
                        }
                        await addCount(recipes[0].DID,ele.QTY)
                    }
                }
            }
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
        }
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
        setOrder(response.orders)
        setOrdetails(response.ordetails)
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        getOrders();
        getStock();
    }, [])

    const filteredOrders = all ? order : order.filter(ord => ord.STATUS !== 'Cancelled' && ord.STATUS !== 'Finished');

    return (
        <div className="relative flex bg-black justify-center w-screen  ">
            <div className='animate-pulse'>
                <div className='absolute left-0'>
                    <img src="/menu-bg-1.png" className='h-screen' />
                </div>
                <div className='absolute bottom-0 right-0'>
                    <img src="/menu-bg-2.png" />
                </div>
            </div>
            <div className='flex flex-col items-center p-10 space-y-3 z-20'>
                <span>
                    <div className='text-3xl font-semibold tracking-widest leading-8'>
                        <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>ORD</span>ERS
                    </div>
                    <div className="flex items-center space-x-2">
                        <h2 className="text-zinc-600 text-lg font-semibold">All Orders: </h2>
                        <input type="checkbox" id="isveg" name="isveg" className="h-[20px] w-[20px]" checked={all} onChange={(e) => setAll(!all)} />
                    </div>
                </span>
                <table className="bg-zinc-900 rounded-2xl w-[1400px] ">
                    <thead className='border-b border-white'>
                        <tr>
                            <th className='py-2'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Serial No.
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    Order</span>ed By
                            </th>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    Phone</span> Number
                            </th>
                            <th className=''><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                STA</span>TUS
                            </th>
                            <th className=''
                            ><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    DATE
                                </span>
                            </th>
                            <th className=''
                            ><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    ACTI</span>ONS
                            </th>
                        </tr>
                    </thead>
                    {filteredOrders.map((ele, index) => (
                        <tbody key={index} className='border-t border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr className='hover:scale-[1.01]' onClick={() => { dropDown == index ? setDropDown(null) : setDropDown(index) }}>
                                <td className='flex justify-center py-3'>{index + 1}</td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.NAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.ORDPHONE}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center hover:scale-[1.1] transition-all'>
                                        <span className={`${ele.STATUS === 'Pending' ? 'text-red-800' : ele.STATUS === 'Finished' ? 'text-blue-800' : 'text-green-800'} cursor-default font-bold`}>
                                            {ele.STATUS.toUpperCase()}
                                        </span>
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.DATE)}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center space-x-8'>
                                        {ele.STATUS == 'Pending'
                                            ?
                                            <div className='flex justify-center space-x-8'>
                                                <button onClick={() => handleAccept(ele.ID, ele.STATUS, index)} type="button" className='bg-zinc-800 hover:bg-green-700 p-1 rounded-full px-2 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                    Accept Order
                                                </button>
                                                <button onClick={() => handleCancel(ele.ID)} type="button" className='bg-zinc-800 hover:bg-red-700 p-1 rounded-full px-2 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                    Cancel Order
                                                </button>
                                            </div>
                                            : ele.STATUS == 'Accepted' ?
                                                <button onClick={() => handleAccept(ele.ID, ele.STATUS)} type="button" className='bg-zinc-800 hover:bg-blue-700 p-1 rounded-full px-2 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                    Finish Order
                                                </button> : null
                                        }

                                        <button type="button">
                                            <div className={` ${dropDown == index ? 'rotate-90' : '-rotate-90'}
                                        border-t-[7px] border-t-transparent
                                        border-r-[7px] border-r-white hover:border-r-zinc-500
                                        border-b-[7px] border-b-transparent  transition-all duration-300`}>
                                            </div>
                                        </button>

                                    </div>
                                </td>
                            </tr>

                            <tr className=''>
                                <td colSpan="100%" className=''>
                                    {dropDown === index && (
                                        <div className={`border-t border-zinc-700`}>
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
                                                                FINISHED
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
                                                                                <input checked={ord.FIN} type="checkbox" />
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}