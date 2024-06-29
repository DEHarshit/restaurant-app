import { useState, useEffect } from 'react'

export default function Users() {

    const [index, setIndex] = useState(0);
    const [formData, setFormData] = useState([]);

    const [id, setId] = useState(0);
    const [price, setPrice] = useState([]);
    const [stock, setStock] = useState([]);
    const [stockQty, setStockQty] = useState([]);
    const [exp, setExp] = useState([]);


    const [ingredients, setIngredients] = useState([]);
    const [groceries, setGroceries] = useState([]);

    const [error, setError] = useState('');
    const [color, setColor] = useState('text-red-800');

    async function getIngredients() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ingredients`, postData);
        const response = await res.json();
        setIngredients(response.ingredients);
        setGroceries(response.groceries);
    }

    async function getFormData() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tsupply`, postData);
        const response = await res.json();
        setFormData(response);
        if (response){
            setIndex(response.length)
        }
    }

    function handleNext() {
        let nextIndex = index + 1;
        while (nextIndex < formData.length && formData[nextIndex].name === "") {
            nextIndex++;
        }
        if (nextIndex <= formData.length) {
            setIndex(nextIndex);
            setError('');
        } else {
            setError('You are at the end!')
            setColor('text-red-800')
        }
    }

    function handlePrev() {
        let prevIndex = index - 1;
        while (prevIndex >= 0 && formData[prevIndex].name === "") {
            prevIndex--;
        }
        if (prevIndex >= 0) {
            setIndex(prevIndex);
            setError('');
        } else {
            setError('You are at the start!')
            setColor('text-red-800')
        }
    }

    function clearForm() {
        setError('')
        setId('-');
        setStock([]);
        setStockQty([]);
        setPrice([]);
        setExp([]);
    }

    function handleSave() {

        const Data = {
            index: index,
            price: price,
            stock: stock,
            stockQty: stockQty,
            exp: exp.map(date => date || null)
        }
        return new Promise(async (resolve, reject) => {
            if (index == formData.length) {
                setFormData(oldData => [...oldData, Data]);
                try {
                    await saveData();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
        async function saveData() {
            const postData = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(Data)
            };
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tsupply`, postData);
            console.log(response)
            if (response.status == 200) {
                setError('Data Created Successfully')
                setColor('text-green-600');
            } else {
                setError('There was an error')
                setColor('text-red-800');
            }
        }
    }

    function handleUpdate() {
        const Data = {
            index: index,
            price: price,
            stock: stock,
            stockQty: stockQty,
            exp: exp.map(date => date || null)
        }
        return new Promise(async (resolve, reject) => {
            if (index <= formData.length) {
                setFormData(oldData => [...oldData.slice(0, index), Data, ...oldData.slice(index + 1)]);
                try {
                    await updateData();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
        async function updateData() {
            const postData = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(Data)
            };
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tsupply`, postData);
            console.log(response)
            if (response.status == 201) {
                setError('Data Updated Successfully')
                setColor('text-green-600');
            } else {
                setError('There was an error')
                setColor('text-red-800');
            }
        }
    }

    async function handleCommit() {
        if (index <= formData.length) {
            await handleUpdate();
        }
        if (index == formData.length) {
            await handleSave();
        }
        await commitData();
    }

    async function commitData() {
        const postData = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ index: index })
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tsupply`, postData);
        console.log(response)
        if (response.status == 200) {
            setError('Data Committed Successfully')
            setColor('text-green-600');
        } else {
            setError('There was an error')
            setColor('text-red-800');
        }
    }


    function addStock() {
        setStock(oldIng => [...oldIng, "Chicken"]);
        setStockQty(oldQty => [...oldQty, ""]);
        setPrice(oldQty => [...oldQty, ""]);
        setExp(oldQty => [...oldQty, null]);
    }

    function removeStock() {
        setStock(stock.slice(0, -1));
        setStockQty(stockQty.slice(0, -1))
        setPrice(price.slice(0, -1))
        setExp(exp.slice(0, -1))
    }

    const updateStock = key => e => {
        let newIng = [...stock];
        newIng[key] = e.target.value;
        setStock(newIng);
    }

    const updateQuantity = key => e => {
        let newQty = [...stockQty];
        newQty[key] = e.target.value;
        setStockQty(newQty);
    }

    const updatePrice = key => e => {
        let newQty = [...price];
        newQty[key] = e.target.value;
        setPrice(newQty);
    }

    const updateDate = key => e => {
        let newQty = [...exp];
        newQty[key] = e.target.value;
        setExp(newQty);
    }


    useEffect(() => {
        getIngredients();
        getFormData();
    }, []);

    useEffect(() => {
        console.log(groceries)
    }, [groceries])

    useEffect(() => {
        console.log(stock)
    }, [stock])

    useEffect(() => {
        console.log(index + 1)
        if (index + 1 <= formData.length) {
            if (ingredients && formData && formData[index]) {
                setStock(formData[index].stock);
                setStockQty(formData[index].stockQty);
                setPrice(formData[index].price);
                setExp(formData[index].exp);
                setId(formData[index].id)
            }
        } else {
            clearForm();
        }
    }, [formData, index]);

    return (
        <div className="flex bg-black justify-center w-screen items-center">
            <div className="flex flex-col space-y-5 items-center">
                <div className="w-full flex justify-between">
                    <div className="flex space-x-2 items-center px-4 translate-y-4">
                        <h2 className="text-3xl font-semibold tracking-widest">Supplies</h2>
                        <h2>{index + 1}/{formData.length + 1}</h2>
                    </div>
                </div>
                <div className="flex">
                    <div className="overflow-auto bg-zinc-900 h-[500px] w-[850px] rounded-xl flex flex-col items-center py-12 space-y-10">
                        <div className='flex flex-col items-center space-y-2'>
                            {index === formData.length
                                ?
                                <h2 className='text-green-700 text-md font-medium tracking-wider leading-6'>Add New Supply</h2>
                                : null
                            }
                            <div className="flex w-fit items-center space-x-4 bg-zinc-800 p-2 rounded-xl">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                    BATCH ID
                                </h2>
                                <h2 className="text-xl font-semibold">
                                    {id}
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div onClick={() => addStock()} className="transition-all hover:scale-[1.05] cursor-pointer flex bg-zinc-800 p-3 items-center space-x-4 rounded-lg">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                    ADD <span className='text-white'> NEW STOCK</span> +
                                </h2>
                            </div>
                            <div onClick={() => removeStock()} className="transition-all hover:scale-[1.05] cursor-pointer flex bg-zinc-800 p-3 items-center space-x-4 rounded-lg">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                    REMOVE <span className='text-white'> NEW STOCK</span> +
                                </h2>
                            </div>
                        </div>
                        <div className='flex flex-1 min-w-full p-3'>
                            <div className='bg-zinc-800 rounded-lg min-w-full'>
                                <div id="ingredient-container" className='flex flex-col'>
                                    {(Array.isArray(stock)) ? stock.map((ingredient, index) => (
                                        <div key={index} className='py-2 px-4 flex justify-start space-x-5 items-center'>
                                            <h2>{index + 1}.</h2>
                                            <select value={stock[index]} onChange={updateStock(index)} id='ing' name='ing' className='text-white bg-zinc-700 rounded-full p-1 text-primary font-medium'>
                                                {(Array.isArray(ingredients)) ?
                                                    ingredients.map((opts, i) => <option className='text-white rounded-3xl font-medium text-primary bg-zinc-700' key={i}>{opts.NAME}</option>) : null
                                                }
                                            </select>
                                            <div className='flex items-center space-x-2'>
                                                <input value={stockQty[index]} onChange={updateQuantity(index)} type='number' placeholder='Enter Quantity' className='w-[120px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 text-black rounded-lg' />
                                                <label>g/ml</label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <label>₹</label>
                                                <input value={price[index]} onChange={updatePrice(index)} type='number' placeholder='Enter Price' className='w-[120px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 text-black rounded-lg' />
                                            </div>
                                            {
                                                groceries.findIndex(dish => dish.NAME === stock[index]) !== -1 ? (
                                                    <div className='flex items-center space-x-2'>
                                                        <label>Expiry Date:</label>
                                                        <input
                                                            value={exp[index]}
                                                            onChange={updateDate(index)}
                                                            type='date'
                                                            className='w-[145px] appearance-textfield appearance-none p-1 text-black rounded-lg'
                                                        />
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                    )) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={`${error !== '' ? 'text-lg opacity-100' : 'text-2xl opacity-0'} transition-all font-semibold ${color}`}>
                        {error !== '' ? `${error}` : null}
                    </h2>
                </div>
                <div className='flex items-center justify-center space-x-3 rounded-xl -translate-y-1'>
                    <button type="button" className='bg-cyan-800 hover:bg-cyan-900 transition-all duration-300 p-2 rounded-lg' onClick={() => handlePrev()}>Previous</button>

                    <button type="button" className='bg-blue-700 hover:bg-blue-900 transition-all duration-300 p-2 rounded-lg' onClick={() => handleUpdate()}>Update</button>

                    <button type="button" className='bg-lime-700 hover:bg-lime-800 transition-all duration-300 p-2 rounded-lg' onClick={() => handleSave()}>Save</button>

                    <button type="button" className='bg-red-700 hover:bg-red-900 transition-all duration-300 p-2 rounded-lg' onClick={() => clearForm()}>Clear</button>

                    <button type="button" className='bg-green-700 hover:bg-green-900 transition-all duration-300 p-2 rounded-lg' onClick={() => handleCommit()}>Commit</button>

                    <button type="button" className='bg-cyan-800 hover:bg-cyan-900 transition-all duration-300 p-2 rounded-lg' onClick={() => handleNext()}>Next</button>
                </div>
            </div>
        </div>
    )
}