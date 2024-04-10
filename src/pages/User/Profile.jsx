import { useState } from "react";

const Profile = () => {
    const [activeButton, setActiveButton] = useState('ORDERS');

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div className="border border-black mt-10 flex justify-center flex-col p-4 md:w-[900px] mx-auto">
            <div className="flex justify-center">
                <div className="text-center flex flex-col justify-start mr-auto">
                    <p className="text-xl font-semibold">Amit Jha</p>
                    <p>amit.jaha@gmail.com</p>
                    <p className="text-gray-600">+77688890</p>
                    <div className="flex justify-center mt-4 gap-3">
                        <button className="bg-black text-white px-4 py-2  hover:bg-gray-800">EDIT</button>
                        <button className="bg-black text-white px-4 py-2  hover:bg-gray-800">LOGOUT</button>
                    </div>
                </div>
                <div className="ml-8">
                    <h2 className="text-xl font-semibold">ADDRESS</h2>
                    <p>R107, AJMERA INFINITY</p>
                    <p>KARUNA NAGAR, ELECTRONIC CITY,</p>
                    <p>BANGALORE, INDIA</p>
                    <p>PIN: 846009</p>
                </div>
            </div>
            <hr className="my-8 border-t border-black" />
            <div className="gap-3">
            <button className={` border border-black px-4 py-2   ${activeButton === 'ORDERS' ? 'bg-black text-white' : 'bg-gray-300'}`} onClick={() => handleButtonClick('ORDERS')}>ORDERS</button>
<button className={`border border-black px-4 py-2 ${activeButton === 'TESTS' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`} onClick={() => handleButtonClick('TESTS')}>TESTS</button>
<button className={`border border-black px-4 py-2 ${activeButton === 'Q/A' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`} onClick={() => handleButtonClick('Q/A')}>Q/A</button>

                <hr className="border-t border-black" />
            </div>
            {activeButton === 'ORDERS' && (
                <>
                    <div className="bg-white  flex justify-between shadow-md mt-4 border border-gray-300 gap-3">
                        <div className="ml-6 flex flex-col justify-center text-justify">
                            <h2 className="text-lg font-semibold mb-2">ORDER #1293</h2>
                            <p ><span className="font-bold">PRODUCTS:</span> Sample Book Name</p>
                            <p><span className="font-bold">DATE:</span> 10/3/2024</p>
                            <p><span className="font-bold">ADDRESS:</span> R107, AJMERA INFINITY</p>
                            <p>KARUNA NAGAR, ELECTRONIC CITY,</p>
                            <p>BANGALORE, INDIA</p>
                            <p>PIN: 857888</p>
                        </div>
                        <div className="flex flex-col mt-4">
                            <button className="bg-black text-white px-3 py-2 mb-2">VIEW DETAILS</button>
                            <button className="bg-black text-white px-3 py-2 mb-2 ">TRACK ORDER</button>
                            <button className="bg-black text-white px-3 py-2 g ">DOWNLOAD INVOICE</button>
                        </div>
                    </div>
                    <div className="bg-white  flex justify-between shadow-md mt-4 border border-gray-300">
                        <div className="ml-6">
                            <h2 className="text-lg font-semibold mb-2">ORDER #1293</h2>
                            <p ><span className="font-bold">PRODUCTS:</span> Sample Book Name</p>
                            <p><span className="font-bold">DATE:</span> 10/3/2024</p>
                            <p><span className="font-bold">ADDRESS:</span> R107, AJMERA INFINITY</p>
                            <p>KARUNA NAGAR, ELECTRONIC CITY,</p>
                            <p>BANGALORE, INDIA</p>
                            <p>PIN: 857888</p>
                        </div>
                        <div className="flex flex-col mt-4">
                        <button className="bg-black text-white px-3 py-2 mb-2 text-sm">VIEW DETAILS</button>
<button className="bg-black text-white px-3 py-2 mb-2 text-sm">TRACK ORDER</button>
<button className="bg-black text-white px-3 py-2 mb-2 text-sm">DOWNLOAD INVOICE</button>

                        </div>
                    </div>
                </>
            )}
            {activeButton === 'TESTS' && (
                <div className=" p-4 rounded-lg shadow-md">
                    <input className="border border-gray-300 px-3 py-2 mb-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-full" placeholder="Enter your input here" />
                    <p className="text-lg font-semibold mb-2">Test Name</p>
                    <div className="flex justify-between">
                        <div>
                            <p><span className="font-semibold">Module:</span> Name of Module</p>
                            <p><span className="font-semibold">Date:</span> 10/02/2001</p>
                            <p><span className="font-semibold">Marks:</span> 100</p>
                            <p><span className="font-semibold">Duration:</span> 30 min</p>
                        </div>
                        <button className="bg-black text-white w-1/4 h-10">START</button>
                    </div>
                </div>
            )}

            {activeButton === 'Q/A' && (
               

               
                <div className=" p-4 rounded-lg shadow-md flex justify-between">
                
                    <div className="mb-4">
                        <p className="text-lg font-semibold mb-2">QUESTION TITLE</p>
                        <p><span className="font-semibold">Module:</span> Name of Module</p>
                        <p><span className="font-semibold">Date:</span> 10/02/2001</p>
                    </div>
                    <button className="bg-black text-white w-1/4 h-10">VIEW REPLY</button>
                </div>
               
            )}
        </div>
    );
};

export default Profile;
