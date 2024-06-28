import { useState, useEffect } from 'react'

export default function Users() {

    const passLength = 8;

    const [visible, setVisible] = useState(false);

    const [users, setUsers] = useState([]);

    const [index, setIndex] = useState(0);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const [error, setError] = useState('');
    const [color, setColor] = useState('text-red-800');

    const [search, setSearch] = useState('');

    async function getUsers() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tempusers`, postData);
        const response = await res.json();
        setUsers(response);
    }

    function randomPass() {
        const charset = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let newPass = "";
        for (let i = 0; i < passLength; i++) {
            newPass += charset.charAt(Math.floor(Math.random() * charset.length));

        }
        return newPass;
    }

    function handleSearch(){
        setError('');
        const user = users.findIndex((user)=>user.phone === search);
        if (user !== -1){
            setIndex(user);
        } else {
            setError('User Not Found');
            setColor('text-red-800')
        }
    }

    function handleNext() {
        let nextIndex = index + 1;
        while (nextIndex < users.length && users[nextIndex].name === "") {
            nextIndex++;
        }
        if (nextIndex <= users.length) {
            setIndex(nextIndex);
            setError('');
        } else {
            setError('You are at the end!')
            setColor('text-red-800')
        }
    }

    function handlePrev() {
        let prevIndex = index - 1;
        while (prevIndex >= 0 && users[prevIndex].name === "") {
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
        setName('');
        setPassword('');
        setEmail('');
        setPhone('');
        setRole('');
    }

    function handleSave() {
        if (name === '' || email === '' || phone === '' || role === '') {
            setError('Fill All the Possible Fields')
            setColor('text-red-800');
        } else {
            const newPass = randomPass();
            const Data = {
                id: index + 1,
                name: name,
                password: newPass,
                prevpass: newPass,
                role: role,
                email: email,
                phone: phone
            }
            return new Promise(async (resolve, reject) => {
                if (index == users.length) {
                    setUsers(oldData => [...oldData, Data]);
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tempusers`, postData);
                console.log(response)
                if (response.status == 201){
                    setError('Data Created Successfully')
                    setColor('text-green-600');
                } else {
                    setError('There was an error')
                    setColor('text-red-800');
                }
            }
        }
    }

    function handleUpdate() {
        if (name === '' || email === '' || phone === '' || role === '') {
            setError('Fill All the Possible Fields')
            setColor('text-red-800');
        } else {
            const Data = {
                id: index + 1,
                name: name,
                password: password,
                prevpass: password,
                role: role,
                email: email,
                phone: phone
            }
            return new Promise(async (resolve, reject) => {
                if (index <= users.length) {
                    setUsers(oldData => [...oldData.slice(0, index), Data, ...oldData.slice(index + 1)]);
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tempusers`, postData);
                console.log(response)
                if (response.status == 201){
                    setError('Data Updated Successfully')
                    setColor('text-green-600');
                } else {
                    setError('There was an error')
                    setColor('text-red-800');
                }
            }
        }
    }

    async function handleCommit() {
        if (name === '' || email === '' || phone === '' || role === '') {
            setError('Fill All the Possible Fields')
            setColor('text-red-800');
        } else {
            if (index <= users.length) {
                await handleUpdate();
            }
            if (index == users.length) {
                await handleSave();
            }
        }
        await commitData();
    }

    async function commitData() {
        const postData = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({index:index})
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, postData);
        console.log(response)
        if (response.status == 200){
            setError('Data Committed Successfully')
            setColor('text-green-600');
        } else {
            setError('There was an error')
            setColor('text-red-800');
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (index + 1 <= users.length) {
            if (users && users && users[index]) {
                setId(users[index].id)
                setName(users[index].name);
                setPassword(users[index].prevpass);
                setEmail(users[index].email);
                setPhone(users[index].phone);
                setRole(users[index].role);
            }
        } else {
            clearForm();
        }
    }, [users, index]);

    return (
        <div className="flex bg-black justify-center w-screen items-center">
            <div className="flex flex-col space-y-5 items-center">
                <div className="w-full flex justify-between">
                    <div className="flex space-x-2 items-center px-4 translate-y-4">
                        <h2 className="text-3xl font-semibold tracking-widest">Users</h2>
                        <h2>{index + 1}/{users.length + 1}</h2>
                    </div>
                    <div className="flex space-x-3 px-4">
                        <div>
                            <h2 className="bg-black p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                    Search by Phone Number
                                </span>
                            </h2>
                            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="p-1 border bg-black border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                        </div>
                        <button type="button" onClick={handleSearch}><img className="w-[40px] h-[40px] translate-y-3 " src="/search.png" /></button>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-zinc-900 h-[500px] w-[500px] border-r border-zinc-700 rounded-l-xl flex flex-col items-center py-12 space-y-10">
                        <div className='flex flex-col items-center space-y-2'>
                            {index === users.length
                                ?
                                <h2 className='text-green-700 text-md font-medium tracking-wider leading-6'>Create New User</h2>
                                : null
                            }
                            <div className="flex w-fit items-center space-x-4 bg-zinc-800 p-2 rounded-xl">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                    ID
                                </h2>
                                <h2 className="text-xl font-semibold">
                                    {id}
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                Name
                            </h2>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="text-xl p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                        </div>
                        <div className='flex flex-col items-center space-y-2'>
                            <div className="flex p-2 rounded-lg font-bold items-center space-x-4">
                                <div className="flex flex-col">
                                    <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent text-2xl inline-block bg-clip-text">
                                        Previous
                                    </span>
                                    <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent text-2xl inline-block bg-clip-text">
                                        Password
                                    </span>
                                </div>
                                <div>
                                    <input readOnly={true} value={password} type={`${visible ? 'text' : 'password'}`} className="p-1 border bg-zinc-900 border-2 border-white text-white text-xl h-[45px] w-[250px] rounded-lg" />
                                    <button type="button" onClick={() => setVisible(!visible)} className="w-[30px] h-[30px] -translate-x-10 translate-y-2">
                                        <img src={`${visible ? '/visible_on.png' : '/visible_off.png'}`} />
                                    </button>
                                </div>
                            </div>{index === users.length
                                ?
                                <h2 className='text-lime-600 text-md font-medium tracking-wider leading-6'>Password will be auto generated</h2>
                                : null
                            }
                        </div>
                    </div>
                    <div className="bg-zinc-900 h-[500px] w-[500px] rounded-r-xl flex flex-col items-center justify-center space-y-10">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                Email
                            </h2>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="text-lg p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                Phone Number
                            </h2>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="text-xl p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                Role
                            </h2>
                            <div className="text-xl font-medium tracking-wider flex items-center justify-center inline-block grid grid-cols-2 bg-zinc-800 p-1 rounded-lg">
                                <input type="radio" id="timings" name="timings" value="Owner" checked={role == 'Owner'} onChange={(e) => setRole(e.target.value)} className="h-[20px]" />
                                <h2 className="-translate-x-3">Owner</h2>
                                <input type="radio" id="timings" name="timings" value="Admin" checked={role == 'Admin'} onChange={(e) => setRole(e.target.value)} className="h-[20px]" />
                                <h2 className="-translate-x-3">Admin</h2>
                                <input type="radio" id="timings" name="timings" value="Waiter" checked={role == 'Waiter'} onChange={(e) => setRole(e.target.value)} className="h-[20px]" />
                                <h2 className="-translate-x-3">Waiter</h2>
                                <input type="radio" id="timings" name="timings" value="Chef" checked={role == 'Chef'} onChange={(e) => setRole(e.target.value)} className="h-[20px]" />
                                <h2 className="-translate-x-3">Chef</h2>
                                <input type="radio" id="timings" name="timings" value="Customer" checked={role == 'Customer'} onChange={(e) => setRole(e.target.value)} className="h-[20px]" />
                                <h2 className="-translate-x-3">Customer</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={`${error !== '' ? 'text-lg opacity-100':'text-2xl opacity-0'} transition-all font-semibold ${color}`}>
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