import { useEffect, useState } from "react"


export default function Sample() {

    const [index, setIndex] = useState(0);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [pos, setPos] = useState('');
    const [salary, setSalary] = useState('');
    const [hire, setHire] = useState('');

    const [formData, setFormData] = useState([]);

    async function handleSave() {
        const Data = {
            index: index,
            id: id,
            name: name,
            dept: dept,
            pos: pos,
            salary: salary,
            hire: hire,
            payroll_date: new Date(new Date().getTime()).toISOString().split("T")[0]
        }
        const postData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(Data)
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sampleapi`, postData);
        console.log(response.json())
    }

    async function handleCommit() {
        const postData = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({index: index})
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sampleapi`, postData);
        console.log(response.json())
    }

    async function getData() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sampleapi`, postData);
        const response = await res.json();
        setFormData(response);
    }

    function handlePrevious(){
        if( index == 0){
            setIndex(0)
        } else {
            setIndex(index-1)
        }
    }

    function handleNext(){
        if( index == formData.length){
            setIndex(index)
        } else {
            setIndex(index+1)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if ( index == formData.length){
            setId('')
            setName('')
            setDept('')
            setPos('')
            setSalary('')
            setHire('')
        } else if (formData.length !== 0) {
            setId(formData[index].id)
            setName(formData[index].name)
            setDept(formData[index].dept)
            setPos(formData[index].pos)
            setSalary(formData[index].salary)
            setHire(formData[index].hire)
        }
    }, [formData, index])

    return (


        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col space-y-4 bg-zinc-900 p-10">
                <div className="flex flex-col space-y-3 text-black">
                    <label className="text-white">Employee ID:</label>
                    <input className="w-[200px] border border-4 border-zinc-800" type="text" name="id" value={`${id}`} onChange={(e) => setId(e.target.value)} />

                    <label className="text-white">Employee Name:</label>
                    <input className="w-[200px] border border-4 border-zinc-800" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />


                    <label className="text-white">Department:</label>
                    <input className="w-[200px] border border-4 border-zinc-800" type="text" name="dept" value={dept} onChange={(e) => setDept(e.target.value)} />


                    <label className="text-white">Position:</label>
                    <input className="w-[200px] border border-4 border-zinc-800" type="text" name="pos" value={pos} onChange={(e) => setPos(e.target.value)} />

                    <label className="text-white">Salary:</label>
                    <input className="w-[200px] border border-4 border-zinc-800" type="text" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />


                    <label className="text-white">Hire:</label>
                    <input className="w-[200px] border border-4 border-zinc-800" type="date" name="hire" value={hire} onChange={(e) => setHire(e.target.value)} />
                </div>
                <div className="flex space-x-10">
                    <button onClick={handlePrevious} className="bg-blue-800 p-2">
                        Previous
                    </button>
                    <button onClick={handleSave} className="bg-lime-800 p-2">
                        Save
                    </button>
                    <button onClick={handleCommit} className="bg-green-800 p-2">
                        Commit
                    </button>
                    <button onClick={handleNext} className="bg-blue-800 p-2">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}