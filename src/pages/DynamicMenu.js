import { useEffect, useState } from "react";

export default function DynamicMenu() {

    const [totalStock, setTotalStock] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [rcount, setrCount] = useState([]);
    const [available, setAvaiable] = useState([]);
    const [acount, setaCount] = useState([]);

    let offset = 0;

    async function getTotalStock() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dynamic`, postData);
        const response = await res.json();
        setTotalStock(response.stock);
    }

    async function getRecipes() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/recipes`, postData);
        const response = await res.json();
        setRecipes(response.recipes);
        setrCount(response.rcount);
    }


    useEffect(() => {
        getTotalStock();
        getRecipes();
    }, [])

    useEffect(() =>
        console.log(rcount)
        , [rcount])

    useEffect(()=>{
        setAvaiable([]);
        setaCount([]);
        {rcount.map((ele, index) => {
            let min = 999;
            let flag = false; // is available
            for (let i = 0; i < ele.COUNT; i++) {
                let newmin=0
                totalStock.map(stck => {
                    if (recipes[offset].INAME === stck.INAME) {
                        if (recipes[offset].QTY > stck.QTY) {
                            flag = true; // not available
                        } else {
                            newmin = Math.floor(stck.QTY/recipes[offset].QTY)
                            if (newmin < min){
                                min = newmin
                            }
                        }
                    }
                });
                offset = offset + 1;
            }
            if (flag === false) {
                setAvaiable((pavailable)=>[...pavailable,ele.DID])
                setaCount((pavailable)=>[...pavailable,min])
            }
        })}
    },[totalStock,recipes,rcount])

    return (
        <div>
            {available}
        </div>
    )

}