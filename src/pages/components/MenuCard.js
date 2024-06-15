import Link from "next/link";

export default function MenuCard({ id, image, isveg, name, price, special, type, recipes, cart, setCart, qty, setQty }) {
    const ingredients = Array.isArray(recipes) ? recipes.slice(0, 4) : [];

    function handleCart() {
        if (!cart.includes(name)) {
            setCart((prevcart) => [...prevcart, name]);
            setQty((prevqty) => [...prevqty, 1]);
        } else if (cart.includes(name)) {
            const index = cart.indexOf(name);
            const Qty = [...qty]
            Qty[index] = Qty[index] + 1;
            setQty(Qty)
        }
    }

    return (
        <div className="p-1 bg-gradient-to-t bg-gradient-to-r from-[#CEA07E] to-[#BB5656] h-[456px] w-[356px] rounded-lg">
            <div style={{ height: "448px" }} className="flex flex-col p-6 justify-between rounded-lg bg-zinc-900 w-fit hover:scale-[1] scale-[1.03] transition-all duration-300 space-y-2">
                <Link href={`/DishDetails?id=${id}`}>
                    <div style={{
                        width: "300px",
                        height: "300px",
                        backgroundImage: `URL(${image}),URL(/home-image.jpg)`,
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                        className="rounded-lg">
                    </div>
                </Link>
                <div className="flex flex-col gap-3">
                    <Link href="/DishDetails">
                        <div> {/* Title */}
                            <h2 className="font-primary text-xl font-semibold leading-5 tracking-wider antialiased transition-all duration-400 hover:text-[#BB5656]">{name ? name : "Dish Name"}</h2>
                            <span className="flex text-[13px] text-zinc-500">
                                {ingredients.map((ele) => (
                                    <div>
                                        {ele.INAME},
                                    </div>
                                ))}...
                            </span>
                        </div>
                    </Link>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1"> {/* Profile Pic & Name */}
                            <h2 className="font-primary text-lg">₹</h2>
                            <h2 className="font-primary text-lg">{price ? price : "00.00"}</h2>
                        </div>
                        <div>
                            <button onClick={handleCart} className="font-primary font-semibold text-lg rounded-full bg-gradient-to-r hover:bg-gradient-to-b from-[#CEA07E] to-[#BB5656] duration-400 transition-colors p-2">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
