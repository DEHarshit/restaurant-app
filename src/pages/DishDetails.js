export default function DishDetails() {
  return (
      <div
          style={{
              backgroundImage: "url(/menu-bg-1.png)",
          }}
          className="font-primary flex justify-center items-center h-screen"
      >
          <div
              style={{
                  backgroundImage: "url(/dishes/pasta.jpg)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
              }}
              className="bg-blue-100 h-[550px] w-[550px] rounded-l-lg"
          ></div>
          <div className="flex flex-col bg-zinc-800 h-[550px] w-[550px] p-10 space-y-10 rounded-r-lg">
              <h2 className="text-5xl text-white-100 font-semibold tracking-medium">
                  Pasta
                  <hr className="w-[150px] h-0.5 border-0 bg-gradient-to-r from-[#CEA07E] to-[#BB5656]"></hr>
              </h2>
              <p style={{
                    backgroundImage: 'linear-gradient(to right, white, #BB5656)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    
              }} className="font-primary font-semibold text-3xl"  >
                          Elevate Your Palate!!
                      </p>

                <p className="text-md text-gray-400">
                   Pasta,Olive oil, Garlic,Onion,Tomatoes,Basil,
                   Parmesan Cheese,Salt and Pepper
                </p>
                <div className="flex items-center mb-6 ">
                    <h2 className="font-primary text-3xl text-white-100 mr-4 ">₹170</h2>
                    <input
                      type="number"
                      className="font-primary text-2xl bg-zinc-800 border border-gray-300 rounded-r-lg rounded-l-lg px-3 py-1 w-16 text-center text-white"
                    />
                </div>

              <button className="font-primary font-semibold text-2xl w-[150px] rounded-l-lg rounded-r-lg bg-gradient-to-r hover:bg-gradient-to-b from-[#CEA07E] to-[#BB5656] p-2 ">
                                            Add to Cart
              </button>


          </div>
      </div>
  );
}
