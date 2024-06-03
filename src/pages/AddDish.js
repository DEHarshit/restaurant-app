import { useState } from 'react';

export default function AddDish() {
    const [image, setImage] = useState('/placeholder.png')
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
                        <div className="p-10 flex flex-col space-y-5">
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
                                    <div className='transition-all flex items-center justify-center h-[250px] w-[250px] opacity-60 hover:text-white text-transparent hover:bg-black border-4 border-black rounded-lg'>
                                        Add Image
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center justify-center">
                                <h2 className="text-white text-lg font-medium">DISH NAME:</h2>
                                <input type="text" id="name" name="name" className=" p-1 text-black rounded-lg" />
                            </div>
                            <div className="text-white flex flex-col items-center justify-center space-y-2">
                                <h2 className="text-lg font-medium">SELECT DISH TIMINGS:</h2>
                                <div className="flex items-center justify-center inline-block grid grid-cols-2 bg-zinc-800 p-1 rounded-lg">
                                    <input type="checkbox" id="timings" name="timings" value="M" className="h-[20px]" />
                                    <h2 className="-translate-x-3">BREAKFAST</h2>
                                    <input type="checkbox" id="timings" name="timings" value="L" className="h-[20px]" />
                                    <h2 className="-translate-x-3">LUNCH</h2>
                                    <input type="checkbox" id="timings" name="timings" value="E" className="h-[20px]" />
                                    <h2 className="-translate-x-3">SNACK</h2>
                                    <input type="checkbox" id="timings" name="timings" value="N" className="h-[20px]" />
                                    <h2 className="-translate-x-3">DINNER</h2>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center justify-center">
                                <h2 className="text-white text-lg font-medium">DISH PRICE:</h2>
                                <input type="number" id="price" name="price" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 text-black rounded-lg" />
                            </div>


                            <div className="flex flex-col space-y-1 "> {/* Ingredients */}
                                <h2 className="text-white text-lg font-medium">INGREIDENTS: </h2>
                                <div className="flex flex-col space-y-1 bg-zinc-800 rounded-lg">
                                    <div className="flex justify-evenly p-2">  {/* Add & Remove */}
                                        <div className="text-white font-medium">
                                            <h2>Add Ingredient</h2>
                                        </div>
                                        <div className="border">

                                        </div>
                                        <div className="text-white font-medium">
                                            <h2>Remove Ingredient</h2>
                                        </div>
                                    </div>
                                    <div className="border-t">

                                    </div>
                                    <div> {/* Ingredients */}
                                        <div id="ingredient-container">

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center justify-center  space-x-3"> {/* IsVeg */}
                                <h2 className="text-white text-lg font-medium">VEGETARIAN: </h2>
                                <input type="checkbox" id="isveg" name="isveg" value="true" className="h-[20px] w-[20px]" />
                            </div>

                        </div>
                    </div>
                    <div className='flex items-center justify-center space-x-3 rounded-xl -translate-y-1'>
                        <button className='bg-cyan-800 hover:bg-cyan-900 transition-all duration-300 p-2 rounded-lg'>Previous</button>

                        <button className='bg-blue-700 hover:bg-blue-900 transition-all duration-300 p-2 rounded-lg'>Update</button>

                        <button className='bg-lime-700 hover:bg-lime-800 transition-all duration-300 p-2 rounded-lg'>Save</button>

                        <button className='bg-red-700 hover:bg-red-900 transition-all duration-300 p-2 rounded-lg'>Clear</button>

                        <button className='bg-green-700 hover:bg-green-900 transition-all duration-300 p-2 rounded-lg'>Commit</button>

                        <button className='bg-cyan-800 hover:bg-cyan-900 transition-all duration-300 p-2 rounded-lg'>Next</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
/* 
<div>
                    <label for="name">DISH NAME:</label>
                    <input type="text" id="name" name="name" /><br />
                    <br />
                    <label for="time">DISH TIMINGS</label><br />
                    <select name="timings" id="timings" multiple>
                        <option value="M">BREAKFAST</option>
                        <option value="L">LUNCH</option>
                        <option value="E">SNACK</option>
                        <option value="N">DINNER</option>
                    </select>
                </div>
                <br />
                <label for="price">DISH PRICE:</label>
                <input type="text" id="price" name="price" /><br />
                <br />
                <label for="ingredients">INGREDIENTS: </label><br /><br />
                <button class="bnt" type="button" onclick="addIngredient()">Add Ingredient</button>
                <button class="bnt" type="button" onclick="revIngredient()">Remove Ingredient</button>
                <br /><br />
                <div id="ingredient-container">
                </div>
                <br />
                <div class="dtype">
                    <label class="opn" for="type">DISH TYPE</label>
                    <select id="type" name="type">
                        <option class="opn1" value="vegetarian">Vegetarian</option>
                        <option class="opn1" value="non-vegetarian">Non-Vegetarian</option>
                        <option class="opn1" value="vegan">Vegan</option>
                    </select><br /><br />
                </div>

                <div class="dish_image">
                    <label for="image">DISH IMAGE</label>
                    <input type="file" id="image" name="image" accept="image/*" />
                </div>

                <br />
                <div class="btns">
                    <input type="button" class="btn" value="Previous" onclick="previousStep()" />
                    <input type="submit" class="btn" value="Update" />
                    <button type="button" class="btn" onclick="clearForm()">Clear</button>
                    <input type="submit" class="btn" value="Save" />
                    <button type="submit" class="btn" value="Commit" onclick="commitData()">Commit</button>
                    <input type="button" class="btn" value="Next" onclick="nextStep()" />

                </div>
 */