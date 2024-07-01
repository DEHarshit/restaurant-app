import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Bill() {

    const router = useRouter();
    const { id } = router.query;

    const { data: session, status } = useSession();

    const [order, setOrder] = useState([]);
    const [ordetails, setOrdetails] = useState([]);

    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState('');

    const gst = Math.round(((order.PRICE * 9) / 100) * 100) / 100;
    const total = Math.round((order.PRICE + gst * 2) * 100) / 100;

    async function getOrders() {
        if (id) {
            const postData = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id: id })
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bill`, postData);
            const response = await res.json();
            setOrder(response.order[0]);
            setOrdetails(response.ordetails);
        }
    }

    async function handlePayment() {
        if (id) {
            const postData = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id: id, user: userId, price: total, phone: phone, name:session?.user?.name })
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bill`, postData);
            const response = await res.json();
            setOrder(response.order[0]);
            setOrdetails(response.ordetails);
            signOut();
        }
    }

    async function getPhone() {
        if (session) {
            const postData = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ name: session?.user?.name })
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getphone`, postData);
            const response = await res.json();
            console.log(response)
            if (response) {
                setPhone(response.phone[0].PHONE);
                setUserId(response.id[0].ID);
            }
        }
    }

    function generatePDF() {
        const input = document.getElementById('billContent');
        const startX = 40;
        let startY = 120;
        const lineSpacing = 20;

        const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        html2canvas(input, { scale: 2 })
            .then((canvas) => {
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'pt',
                    format: 'a4'
                });

                pdf.setFont('helvetica');

                const HeaderText = 'DRMLUASN'
                const pageWidth2 = pdf.internal.pageSize.getWidth();
                pdf.setFontSize(20);
                const textWidth3 = pdf.getTextWidth(HeaderText);
                const textX3 = (pageWidth2 - textWidth3) / 2;
                pdf.text(HeaderText, textX3, pdf.internal.pageSize.getHeight()-800);

                pdf.setFontSize(16);
                pdf.text(`Receipt #${order.ID}`, startX, startY - 30);

                pdf.setFontSize(12);
                pdf.text(`Date: ${currentDate}`, startX, startY);
                pdf.text(`Time: ${currentTime}`, pdf.internal.pageSize.getWidth() - 150, startY);
                startY += lineSpacing * 2;

                pdf.setFontSize(12);
                pdf.text(`Order ID: ${order.ID}`, startX, startY);
                startY += lineSpacing * 2;

                pdf.setFontSize(12);
                pdf.setFillColor(207, 207, 207);
                pdf.rect(startX, startY, pdf.internal.pageSize.getWidth() - 80, lineSpacing, 'F');
                pdf.text('Item Name', startX + 10, startY + 15);
                pdf.text('Quantity', startX + 250, startY + 15);
                pdf.text('Cost', startX + 400, startY + 15);
                startY += lineSpacing;

                pdf.setFontSize(12);
                ordetails.forEach((item) => {
                    startY += lineSpacing * 2;
                    pdf.text(item.DNAME, startX + 10, startY);
                    pdf.text(item.QTY.toString(), startX + 250, startY);
                    pdf.text(item.PRICE.toString(), startX + 400, startY);
                    pdf.line(startX, startY + 10, startX + 500, startY + 10);
                });

                startY += lineSpacing * 2;
                pdf.setFontSize(12);
                pdf.text('Subtotal:', startX + 250, startY);
                pdf.text(`Rs. ${order.PRICE}`, startX + 400, startY);

                startY += lineSpacing * 2;
                pdf.setFontSize(12);
                pdf.text('CGST:', startX + 250, startY);
                pdf.text(`Rs. ${gst}`, startX + 400, startY);

                startY += lineSpacing * 2;
                pdf.setFontSize(12);
                pdf.text('SGST:', startX + 250, startY);
                pdf.text(`Rs. ${gst}`, startX + 400, startY);

                startY += lineSpacing * 2;
                pdf.setFontSize(12);
                pdf.text('Total:', startX + 250, startY);
                pdf.line(startX + 350, startY - 20, startX + 500, startY - 20);
                pdf.text(`Rs. ${total}`, startX + 400, startY);
                pdf.line(startX + 350, startY + 10, startX + 500, startY + 10);

                const footerText1 = 'SAVE PAPER SAVE NATURE !!';
                const footerText2 = 'Thank you for choosing us.';
                const pageWidth = pdf.internal.pageSize.getWidth();

                pdf.setFontSize(10);
                const textWidth1 = pdf.getTextWidth(footerText1);
                const textX1 = (pageWidth - textWidth1) / 2;
                pdf.text(footerText1, textX1, pdf.internal.pageSize.getHeight() - 50);

                pdf.setFontSize(10);
                const textWidth2 = pdf.getTextWidth(footerText2);
                const textX2 = (pageWidth - textWidth2) / 2;
                pdf.text(footerText2, textX2, pdf.internal.pageSize.getHeight() - 30);

                pdf.save(`restaurant_bill_${order.ID}.pdf`);
            });
    }

    useEffect(()=>{
        getPhone()
    })

    useEffect(() => {
        getOrders()
    }, [id])

    if (!id) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <div>
                <div className="h-screen flex items-center justify-center">
                    <div id="billContent" className="flex flex-1 flex-col bg-zinc-900 max-h-[700px] overflow-auto max-w-[750px] rounded-xl">
                        <div className="h-full flex flex-col justify-between p-10">
                            <div className="flex flex-col space-y-10">
                                <div className="flex font-semibold text-3xl">
                                    Bill
                                </div>
                                <div>
                                    <div>
                                        Order ID: {order.ID}
                                    </div>
                                    <div className="py-10">
                                        <table className="w-full ">
                                            <thead className="bg-zinc-700 rounded-lg">
                                                <tr>
                                                    <th className="py-4 px-4 border-r">
                                                        <div className="flex">
                                                            Item Name
                                                        </div>
                                                    </th>
                                                    <th className="py-4 px-4 border-r">
                                                        <div className="flex">
                                                            Quantity
                                                        </div>
                                                    </th>
                                                    <th className="py-4 px-4">
                                                        <div className="flex">
                                                            Cost
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            {ordetails.map((ele, index) => (
                                                <tbody key={index}>
                                                    <tr className="hover:bg-opacity-10 hover:bg-white">
                                                        <td className="py-4 px-4">
                                                            <div className="flex">
                                                                {ele.DNAME}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <div className="flex">
                                                                {ele.QTY}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <div className="flex">
                                                                {ele.PRICE}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                            <tbody>
                                                <tr className="bg-zinc-700">
                                                    <td colSpan='2' className="py-4 px-4 ">
                                                        <div className="flex justify-end font-semibold">
                                                            SUB TOTAL:
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 ">
                                                        <div className="font-semibold text-xl text-yellow-600">
                                                            ₹ {order.PRICE}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <td colSpan='2' className="py-4 px-4 ">
                                                        <div className="flex justify-end font-semibold">
                                                            CGST @9%:
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 ">
                                                        <div className="text-lg">
                                                            ₹ {gst}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <td colSpan='2' className="py-4 px-4 ">
                                                        <div className="flex justify-end font-semibold">
                                                            SGST @9%:
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 ">
                                                        <div className="text-lg">
                                                            ₹ {gst}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <td colSpan='2' className="py-4 px-4 ">
                                                        <div className="flex justify-end font-semibold">
                                                            TOTAL:
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 ">
                                                        <div className="font-semibold text-xl text-green-600">
                                                            ₹ {total}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                {order.PSTATUS !== 'Paid'
                                    ?
                                    <div className="flex items-center space-x-4">
                                        <div className="flex font-semibold text-2xl">
                                            Payment:
                                        </div>
                                        <button onClick={handlePayment} type="button" className='w-[150px] bg-zinc-700 hover:bg-blue-700 p-2 rounded-full px-5 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                            Pay
                                        </button>
                                    </div>
                                    :
                                    <div className="text-blue-600 flex font-semibold text-2xl">
                                        Payment Complete
                                    </div>
                                }
                                <div>
                                    {order.PSTATUS === 'Paid'
                                        ?
                                        <button onClick={generatePDF} type="button" className='w-[150px] bg-zinc-700 hover:bg-pink-700 p-2 rounded-full px-5 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                            Generate Bill
                                        </button>
                                        :
                                        <div className="flex font-semibold text-2xl">
                                            Not Paid
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}