import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import { signIn } from 'next-auth/react';

export default function ForgetPass() {

    const [userID, setUserID] = useState(0);


    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [found, setFound] = useState(false);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [prev,setPrev] = useState('');

    const router = useRouter();

    async function handleForget() {
        setError('');
        const postData = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ phone: parseInt(name), prevpass: password })
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getphone`, postData);
        if (res.status === 200) {
            setFound(true);
            setError('');
            setPassword('');
            setName('');
            const response = await res.json();
            setUserID(response.userid[0].NAME)
            setPrev(response.userid[0].PASSWORD)
        } else {
            setError('Incorrect Phone or Previous Password')
        }
    }

    async function handleChange() {
        setError('');
        if (password !== name) {
            setError('Password do not match')
        } else {
            const postData = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({id: userID,password: password,prev:prev})
            };
            console.log(postData)
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getphone`, postData);
            const response = await res.json();
            console.log(response);
            if (res.status === 200) {
                setError('Password has changed')
                setTimeout(() => {
                    router.push('/LogIn')
                }, 1000);
            } else {
                setError('Couldn`t Change Password')
            }
        }
    }

    return (
        <div className="relative h-screen flex justify-center items-center font-primary">
            <div className='fixed inset-0 animate-pulse'>
                <div>
                    <div>
                        <img src="/menu-bg-1.png" className='h-screen' />
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <img src="/menu-bg-2.png" />
                    </div>
                </div>
            </div>
            <div className="relative w-screen flex justify-center font-primary">
                <div className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] rounded-lg flex items-center justify-center p-1">
                    <div className='flex transition-all'>
                        <div style={{
                            backgroundImage: `URL(/home-image.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} className='h-[485px] w-[485px] rounded-l-lg bg-blue-100 border-r border-zinc-600'>
                            <div className="delay-300 duration-200 rounded-l-lg w-full h-full bg-black hover:opacity-0 transition-all opacity-60 flex items-center justify-center text-5xl font-semibold tracking-wider">
                                Forget Password
                            </div>
                        </div>
                        <div className='h-[485px] w-[485px] rounded-r-lg bg-zinc-900'>
                            {!found ?
                                <div className="p-4 flex flex-col items-center space-y-10">
                                    <h2 className="text-3xl font-semibold">FORGET PASSWORD?</h2>
                                    <span className="-translate-x-4">
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Phone Number
                                            </span>
                                        </h2>
                                        <input type="text" value={`${name}`} onChange={(e) => setName(e.target.value)} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                    </span>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Previous Password
                                            </span>
                                        </h2>
                                        <span className="flex">
                                            <input value={`${password}`} onChange={(e) => setPassword(e.target.value)} type={`${visible ? 'text' : 'password'}`} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                            <button type="button" onClick={() => setVisible(!visible)} className="w-[30px] h-[30px] -translate-x-10 translate-y-2">
                                                <img src={`${visible ? '/visible_on.png' : '/visible_off.png'}`} />
                                            </button>
                                        </span>
                                    </span>
                                    <div className="-translate-x-4 flex flex-col space-y-2 justify-center items-center ">
                                        <h2 className="text-red-600">{error}</h2>
                                        <button type="button" onClick={handleForget} className=" w-fit h-fit bg-zinc-400 hover:text-white text-lg text-black p-2 px-10 font-semibold transition-all duration-400 hover:text-xl rounded-full hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656]">Change Password</button>
                                    </div>
                                </div>
                                :
                                <div className="p-4 flex flex-col items-center space-y-10">
                                    <h2 className="text-3xl font-semibold">CHANGE PASSWORD</h2>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                New Password
                                            </span>
                                        </h2>
                                        <span className="flex">
                                            <input value={`${password}`} onChange={(e) => setPassword(e.target.value)} type={`${visible ? 'text' : 'password'}`} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                            <button type="button" onClick={() => setVisible(!visible)} className="w-[30px] h-[30px] -translate-x-10 translate-y-2">
                                                <img src={`${visible ? '/visible_on.png' : '/visible_off.png'}`} />
                                            </button>
                                        </span>
                                    </span>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Confirm New Password
                                            </span>
                                        </h2>
                                        <span className="flex">
                                            <input value={`${name}`} onChange={(e) => setName(e.target.value)} type={`${visible ? 'text' : 'password'}`} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                            <button type="button" onClick={() => setVisible(!visible)} className="w-[30px] h-[30px] -translate-x-10 translate-y-2">
                                                <img src={`${visible ? '/visible_on.png' : '/visible_off.png'}`} />
                                            </button>
                                        </span>
                                    </span>
                                    <div className="-translate-x-4 flex flex-col space-y-2 justify-center items-center ">
                                        <h2 className="text-red-600">{error}</h2>
                                        <button type="button" onClick={handleChange} className=" w-fit h-fit bg-zinc-400 hover:text-white text-lg text-black p-2 px-10 font-semibold transition-all duration-400 hover:text-xl rounded-full hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656]">Change Password</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}