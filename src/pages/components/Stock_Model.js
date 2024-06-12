export default function StockModal({isVisible}){
    if (!isVisible) return null
    return(
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="w-[600px] h-[600px] bg-zinc-900 rounded-lg">
                <div>

                </div>
            </div>
        </div>
    )
}