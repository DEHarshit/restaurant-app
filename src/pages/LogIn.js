import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import { signIn } from 'next-auth/react';

export default function LogIn() {

    const [log, setLog] = useState(true);
    const [visible, setVisible] = useState(false);
    const [transition, setTransition] = useState(false);
    const [users, setUsers] = useState([]);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [cpassword, setCpassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogIn = async (e) => {
        e.preventDefault();
        const user = users.find(e => e.NAME === name);
        if (!user) {
            setError("User not found");
        } else {
            if (user.PASSWORD === password) {
                const result = signIn('credentials', { redirect: false, username: name, password: password, image: user.ROLE, email: user.EMAIL })
                if (result.error) {
                    setError(result.error)
                } else {
                    if (user.ROLE === 'Customer') {
                        setTimeout(() => router.push('/HomePage'), 200);
                    } else {
                        setTimeout(() => router.push('/Admin'), 200);
                    }
                }
            } else {
                setError("Incorrect Password");
            }
        }
    };

    async function handleSignUp(e) {
        e.preventDefault();
        const user = users.find(e => e.NAME === name);
        if ( name === '' || password === '' || email === '' || phone === ''){
            setError("Fill every field");
        } else {
            if (!user) {
                const user = users.find(e => e.PHONE === phone);
                if (!user) {
                    if (password === cpassword) {
                        await signUp();
                        setError("Account successfully created");
                        setTimeout(() => router.reload(), 700);
                    } else {
                        setError("Passwords do not match");
                    }
                } else {
                    setError("Phone number already in use");
                }
            } else {
                setError("Username already exists");
            }
        }

        async function signUp() {
            const postData = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ name: name, password: password, email: email, phone: phone })
            };
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, postData);
            console.log(response)
        }

    }

    async function getUsers() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, postData);
        const response = await res.json();
        setUsers(response.users);
        console.log(response.users);
    }

    function handleLog() {
        setTransition(true)
        setTimeout(() => {
            setLog(!log)
            setName('');
            setPassword('');
            setCpassword('');
            setEmail('');
            setPhone('');
        }, 1000);
        setTimeout(() => setTransition(false), 1500);

    }

    useEffect(() => {
        getUsers();
    }, [])


    return (
        <div className="relative h-screen flex justify-center items-center">
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
                    {(log) ? (
                        <div className='flex transition-all'>
                            <div style={{
                                backgroundImage: `URL(/home-image.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }} className='h-[485px] w-[485px] rounded-l-lg bg-blue-100 border-r border-zinc-600'>
                                <div className="delay-300 duration-200 rounded-l-lg w-full h-full bg-black hover:opacity-0 transition-all opacity-60 flex items-center justify-center text-7xl font-semibold tracking-wider">
                                    LOG IN
                                </div>
                            </div>
                            <div className='flex flex-col px-12 py-12 space-y-[50px] bg-zinc-900 h-[485px] w-[485px] rounded-r-lg'>
                                <h2 className="text-3xl font-bold tracking-wider leading-9 space-x-2">
                                    <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text ">
                                        LOG
                                    </span>
                                    <span>IN</span>
                                </h2>
                                <div>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Name
                                            </span>
                                        </h2>
                                        <input type="text" value={`${name}`} onChange={(e) => setName(e.target.value)} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                    </span>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Password
                                            </span>
                                        </h2>
                                        <span className="flex">
                                            <input value={`${password}`} onChange={(e) => setPassword(e.target.value)} type={`${visible ? 'text' : 'password'}`} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                            <button type="button" onClick={() => setVisible(!visible)} className="w-[30px] h-[30px] -translate-x-10 translate-y-2">
                                                <img src={`${visible ? '/visible_on.png' : '/visible_off.png'}`} />
                                            </button>
                                        </span>
                                        <h2 className="px-4 text-sm text-zinc-400 space-x-1">
                                            <span>Forget</span>
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Password?
                                            </span>
                                        </h2>
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-2 justify-center items-center">
                                    <h2 className="text-red-600">{error}</h2>
                                    <button onClick={handleLogIn} type="button" className=" w-fit h-fit bg-zinc-400 hover:text-white text-lg text-black p-2 px-10 font-semibold transition-all duration-400 hover:text-xl rounded-full hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656]">Log In</button>
                                    <button type="button" className="text-zinc-400 hover:text-[20px] transition-all" onClick={handleLog}>Sign up?</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex transition-all'>
                            <div className='flex flex-col px-10 py-5 space-y-[8px] h-[485px] w-[485px] rounded-l-lg bg-zinc-900'>
                                <h2 className="text-3xl font-bold tracking-wider leading-9 space-x-2">
                                    <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                        SIGN
                                    </span>
                                    <span>UP</span>
                                </h2>
                                <div >
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Name
                                            </span>
                                        </h2>
                                        <input value={`${name}`} onChange={(e) => setName(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[200px] rounded-lg" />
                                    </span>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Email
                                            </span>
                                        </h2>
                                        <input value={`${email}`} onChange={(e) => setEmail(e.target.value)} type="email" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[200px] rounded-lg" />
                                    </span>
                                </div>
                                <div className="flex">
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Password
                                            </span>
                                        </h2>
                                        <span className="flex">
                                            <input value={`${password}`} onChange={(e) => setPassword(e.target.value)} type={`${visible ? 'text' : 'password'}`} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[200px] rounded-lg" />
                                            <button type="button" onClick={() => setVisible(!visible)} className="w-[30px] h-[30px] -translate-x-10 translate-y-2">
                                                <img src={`${visible ? '/visible_on.png' : '/visible_off.png'}`} />
                                            </button>
                                        </span>
                                    </span>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Confirm Password
                                            </span>
                                        </h2>
                                        <span value={`${cpassword}`} onChange={(e) => setCpassword(e.target.value)} className="flex">
                                            <input type={`${visible ? 'text' : 'password'}`} className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[200px] rounded-lg" />
                                            <button type="button" onClick={() => setVisible(!visible)} className="w-[30px] h-[30px] -translate-x-10 translate-y-2">
                                                <img src={`${visible ? '/visible_on.png' : '/visible_off.png'}`} />
                                            </button>
                                        </span>
                                    </span>
                                </div>
                                <span>
                                    <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                            Phone Number
                                        </span>
                                    </h2>
                                    <input value={`${phone}`} onChange={(e) => setPhone(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[200px] rounded-lg" />
                                </span>
                                <div className="flex flex-col translate-y-4 space-y-2 justify-center items-center">
                                    <h2 className="text-red-600">{error}</h2>
                                    <button onClick={handleSignUp} type="button" className=" w-fit h-fit bg-zinc-400 text-lg text-black hover:text-white p-2 px-10 font-semibold transition-all duration-400 hover:text-xl rounded-full hover:bg-gradient-to-r from-[#CEA07E] to-[#BB5656]">Sign Up</button>
                                    <button type="button" className="text-zinc-400 hover:text-[20px] transition-all" onClick={handleLog}>Log in?</button>
                                </div>
                            </div>
                            <div style={{
                                backgroundImage: `URL(/home-image.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }} className='h-[485px] w-[485px] rounded-r-lg bg-blue-100  border-l border-zinc-600'>
                                <div className="delay-300 duration-200 rounded-r-lg w-full h-full bg-black hover:opacity-0 transition-all opacity-60 flex items-center justify-center text-7xl font-semibold tracking-wider">
                                    SIGN UP
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`${transition ? 'h-[490px]' : 'opacity-0 h-[1px]'} transition-all duration-1000 absolute flex bg-gradient-to-r from-[#CEA07E] to-[#BB5656] w-[970px] rounded-lg `}>
                </div>
            </div>
        </div>
    )
}