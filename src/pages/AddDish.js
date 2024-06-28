import { useState, useEffect } from 'react';

export default function AddDish() {


    const [index, setIndex] = useState(0);
    const [formData, setFormData] = useState([]);

    const [image, setImage] = useState('/placeholder.png');
    const [dishName, setDishName] = useState('');
    const [dishTimings, setDishTimings] = useState([]);
    const [dishPrice, setDishPrice] = useState(0);
    const [isVeg, setIsVeg] = useState(false);
    const [isPre, setIsPre] = useState(false);
    const [dishIngredients, setDishIngredients] = useState([]);
    const [dishQty, setDishQty] = useState([]);

    const [ingredients, setIngredients] = useState([]);

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
    }

    async function getFormData() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tdishes`, postData);
        const response = await res.json();
        setFormData(response);
    }

    function clearForm() {
        setImage('/placeholder.png');
        setDishName('');
        setDishTimings([]);
        setDishPrice(0);
        setIsVeg(false);
        setIsPre(false);
        setDishIngredients([]);
        setDishQty([]);
        setError('');
    }

    function addIngredient() {
        setDishIngredients(oldIng => [...oldIng, "Chicken"]);
        setDishQty(oldQty => [...oldQty, ""]);
    }

    function revIngredient() {
        setDishIngredients(dishIngredients.slice(0, -1));
        setDishQty(dishQty.slice(0, -1))
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

    function handleImageChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function handleCheckboxChange(e) {
        const value = e.target.value;
        setDishTimings(prevState =>
            prevState.includes(value)
                ? prevState.filter(timing => timing !== value)
                : [...prevState, value]
        );
    }

    function handleSave() {
        if (dishName === '') {
            const Data = {
                index: index,
                image: image,
                name: dishName,
                type: dishTimings,
                price: dishPrice,
                ing: dishIngredients,
                qty: dishQty,
                isveg: isVeg,
                ispre: isPre
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tdishes`, postData);
                console.log(response)
                if (response.status == 200) {
                    setError('Data Created Successfully')
                    setColor('text-green-600');
                } else {
                    setError('There was an error')
                    setColor('text-red-800');
                }
            }
        } else if (dishName !== '') {
            if (image === '' || dishTimings === '' || dishPrice === '' || dishIngredients === '' || dishQty == '') {
                setError('Fill All the Possible Fields')
                setColor('text-red-800');
            } else {
                const Data = {
                    index: index,
                    image: image,
                    name: dishName,
                    type: dishTimings,
                    price: dishPrice,
                    ing: dishIngredients,
                    qty: dishQty,
                    isveg: isVeg,
                    ispre: isPre
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
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tdishes`, postData);
                    console.log(response)
                    if (response.status == 201) {
                        setError('Data Created Successfully')
                        setColor('text-green-600');
                    } else {
                        setError('There was an error')
                        setColor('text-red-800');
                    }
                }
            }
        }


    }

    function handleUpdate() {
        if (dishName === '') {
            const Data = {
                image: image,
                name: dishName,
                type: dishTimings,
                price: dishPrice,
                ing: dishIngredients,
                qty: dishQty,
                isveg: isVeg,
                ispre: isPre,
                index: index
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tdishes`, postData);
                console.log(response)
                if (response.status == 201) {
                    setError('Data Updated Successfully')
                    setColor('text-green-600');
                } else {
                    setError('There was an error')
                    setColor('text-red-800');
                }
            }
        } else if (dishName !== '') {
            if (image === '' || dishTimings === '' || dishPrice === '' || dishIngredients === '' || dishQty == '') {
                setError('Fill All the Possible Fields')
                setColor('text-red-800');
            } else {
                const Data = {
                    image: image,
                    name: dishName,
                    type: dishTimings,
                    price: dishPrice,
                    ing: dishIngredients,
                    qty: dishQty,
                    isveg: isVeg,
                    ispre: isPre,
                    index: index
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
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tdishes`, postData);
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


        }
    }

    async function handleCommit() {
        if (dishName === '') {
            if (index <= formData.length) {
                await handleUpdate();
            }
            if (index == formData.length) {
                await handleSave();
            }
            await commitData();
        } else if (dishName !== '') {
            if (image === '' || dishTimings === '' || dishPrice === '' || dishIngredients === '' || dishQty == '') {
                setError('Fill All the Possible Fields')
                setColor('text-red-800');
            } else {
                if (index <= formData.length) {
                    await handleUpdate();
                }
                if (index == formData.length) {
                    await handleSave();
                }
                await commitData();
            }

        }

    }

    async function commitData() {
        const postData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ index: index })
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dishes`, postData);
        console.log(response)
        if (response.status == 200) {
            setError('Data Committed Successfully')
            setColor('text-green-600');
        } else {
            setError('There was an error')
            setColor('text-red-800');
        }
    }

    const updateIngredients = key => e => {
        let newIng = [...dishIngredients];
        newIng[key] = e.target.value;
        setDishIngredients(newIng);
    }

    const updateQuantity = key => e => {
        let newQty = [...dishQty];
        newQty[key] = e.target.value;
        setDishQty(newQty);
    }

    useEffect(() => {
        getIngredients();
        getFormData();
    }, [])

    useEffect(() => {
        console.log(index + 1)
        if (index + 1 <= formData.length) {
            if (ingredients && formData && formData[index]) {
                (formData[index].image === "")
                    ? setImage('/placeholder.png')
                    : setImage(formData[index].image)
                setDishName(formData[index].name);
                setDishTimings(formData[index].type);
                setDishPrice(formData[index].price);
                setIsVeg(formData[index].isveg);
                setIsPre(formData[index].ispre);
                setDishIngredients(formData[index].ing)
                setDishQty(formData[index].qty)
            }
        } else {
            clearForm();
        }
    }, [formData, index]);

    return (
        <div className="bg-black font-primary flex justify-center items-center  h-screen">
            <div className='fixed inset-0 animate-pulse'> {/* background div */}
                <div>
                    <div>
                        <img src="/menu-bg-1.png" className='h-screen' />
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <img src="/menu-bg-2.png" />
                    </div>
                </div>
            </div> {/* form div */}
            <form action="/" method="post" id="dishForm">
                <div className='flex flex-col overflow-hidden -translate-y-3'>
                    <div className="flex justify-center z-10 bg-zinc-900 rounded-xl overflow-auto h-[780px] w-[500px] scale-[0.95]">
                        <div className="-translate-y-5 p-10 flex flex-col space-y-5">
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <h2 className="p-1 flex items-center justify-center text-3xl tracking-wider leading-9 font-semibold text-primary"> ADD A NEW DISH </h2>
                                <hr className="w-[300px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
                            </div>
                            <div className="flex items-center justify-center">
                                <div style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundPosition: `center`,
                                    backgroundSize: `cover`
                                }} className=" h-[250px] w-[250px] text-black text-2xl font-semibold rounded-lg border-black bg-blue-100">
                                    <div className='relative transition-all flex items-center justify-center h-[250px] w-[250px] opacity-60 hover:text-white text-transparent hover:bg-blue-900 border-4 border-black rounded-lg'>
                                        <label className='inset-0'>Add Image</label>
                                        <input type="file" accept="image/*" className='opacity-0 absolute inset-0' onChange={handleImageChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center justify-center">
                                <h2 className="text-white text-lg font-medium" >DISH NAME:</h2>
                                <input type="text" id="name" name="name" className=" p-1 text-black rounded-lg" value={`${dishName}`} onChange={(e) => setDishName(e.target.value)} />
                            </div>
                            <div className="text-white flex flex-col items-center justify-center space-y-2">
                                <h2 className="text-lg font-medium">SELECT DISH TIMINGS:</h2>
                                <div className="flex items-center justify-center inline-block grid grid-cols-2 bg-zinc-800 p-1 rounded-lg">
                                    <input type="checkbox" id="timings" name="timings" value="M" checked={dishTimings.includes('M')} onChange={handleCheckboxChange} className="h-[20px]" />
                                    <h2 className="-translate-x-3">BREAKFAST</h2>
                                    <input type="checkbox" id="timings" name="timings" value="A" checked={dishTimings.includes('A')} onChange={handleCheckboxChange} className="h-[20px]" />
                                    <h2 className="-translate-x-3">LUNCH</h2>
                                    <input type="checkbox" id="timings" name="timings" value="E" checked={dishTimings.includes('E')} onChange={handleCheckboxChange} className="h-[20px]" />
                                    <h2 className="-translate-x-3">SNACK</h2>
                                    <input type="checkbox" id="timings" name="timings" value="N" checked={dishTimings.includes('N')} onChange={handleCheckboxChange} className="h-[20px]" />
                                    <h2 className="-translate-x-3">DINNER</h2>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center justify-center">
                                <h2 className="text-white text-lg font-medium">DISH PRICE:</h2>
                                <input value={`${dishPrice}`} onChange={(e) => setDishPrice(e.target.value)} type="number" id="price" name="price" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 text-black rounded-lg" />
                            </div>


                            <div className="flex flex-col space-y-1 "> {/* Ingredients */}
                                <h2 className="text-white text-lg font-medium">INGREIDENTS: </h2>
                                <div className="flex flex-col space-y-1 bg-zinc-800 rounded-lg">
                                    <div className="flex justify-evenly w-[420px] p-2">  {/* Add & Remove */}
                                        <div className="text-white font-medium hover:bg-zinc-300 p-1 transition-all rounded-lg hover:text-black" onClick={() => addIngredient()}>
                                            <button type="button">Add Ingredient</button>
                                        </div>
                                        <div className="border">

                                        </div>
                                        <div className="text-white font-medium hover:bg-zinc-300 p-1 transition-all rounded-lg hover:text-black" onClick={() => revIngredient()}>
                                            <button type="button">Remove Ingredient</button>
                                        </div>
                                    </div>
                                    <div className="border-t">

                                    </div>
                                    <div> {/* Ingredients */}
                                        <div id="ingredient-container" className='flex flex-col'>
                                            {(Array.isArray(dishIngredients)) ? dishIngredients.map((ingredient, index) => (
                                                <div key={index} className='flex p-2 gap-2'>
                                                    <select value={dishIngredients[index]} onChange={updateIngredients(index)} id='ing' name='ing' className='text-white bg-zinc-700 rounded-full p-1 text-primary font-medium'>
                                                        {(Array.isArray(ingredients)) ?
                                                            ingredients.map((opts, i) => <option className='text-white rounded-3xl font-medium text-primary bg-zinc-700' key={i}>{opts.NAME}</option>) : null
                                                        }
                                                    </select>
                                                    <input value={`${dishQty[index]}`} onChange={updateQuantity(index)} type='number' placeholder='Enter Quantity' className='w-[120px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 text-black rounded-lg' />
                                                    <label>g/ml</label>
                                                </div>
                                            )) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='flex items-center justify-center space-x-10'>
                                <div className="flex items-center justify-center  space-x-3"> {/* IsVeg */}
                                    <h2 className="text-white text-lg font-medium">VEGETARIAN: </h2>
                                    <input type="checkbox" id="isveg" name="isveg" className="h-[20px] w-[20px]" checked={isVeg} onChange={(e) => setIsVeg(!isVeg)} />
                                </div>
                                <div className="flex items-center justify-center  space-x-3"> {/* IsPre */}
                                    <h2 className="text-white text-lg font-medium">Pre-Made: </h2>
                                    <input type="checkbox" id="ispre" name="ispre" className="h-[20px] w-[20px]" checked={isPre} onChange={(e) => setIsPre(!isPre)} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex items-center justify-center -translate-y-3'>
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
            </form>
        </div>
    )
}