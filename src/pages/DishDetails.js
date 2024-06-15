export default function DishDetails() {
  return (
    <div className="font-primary flex justify-center items-center h-screen">
      <div
        style={{
          backgroundImage: "url(/home-image.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="bg-blue-100 h-[485px] w-[485px] rounded-l-lg"
      ></div>
      <div className="flex flex-col bg-zinc-800 h-[485px] w-[485px] p-10 space-y-10 rounded-r-lg">
        <h2 className="text-5xl text-black font-semibold tracking-wider">
          Pasta
        </h2>
        <h2 className="text-2xl text-green-500">$00.00</h2>
        <h2 className="text-md text-zinc-600">Vegetables, eggs, fish, meat</h2>
        <button
          className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] p-3 rounded-full hover:bg-gradient-to-l transition-all"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
