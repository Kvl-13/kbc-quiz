import React, { useEffect } from 'react'
import { useState } from 'react';

function Pyramid(props) {
    const { currentLevel, setWinningPrize } = props;

    const [tempPrice, setTempPrice] = useState({});

    const priceList = [
        { srno: 1, reward: "₹5,000" },
        { srno: 2, reward: "₹10,000" },
        { srno: 3, reward: "₹20,000" },
        { srno: 4, reward: "₹40,000" },
        { srno: 5, reward: "₹80,000" },
        { srno: 6, reward: "₹1,60,000" },
        { srno: 7, reward: "₹3,20,000" },
        { srno: 8, reward: "₹6,40,000" },
        { srno: 9, reward: "₹12,50,000" },
        { srno: 10, reward: "₹25,00,000" },
        { srno: 11, reward: "₹50,00,000" },
        { srno: 12, reward: "₹1 crore" },
        { srno: 13, reward: "₹3 crore" },
        { srno: 14, reward: "₹7 crore" },
    ].reverse();

    useEffect(() => {
        let temp = priceList.find(item => item.srno === currentLevel);
        setTempPrice(temp);
        if (currentLevel !== 1) {
            temp = priceList.find(item => item.srno === currentLevel - 1);
            setWinningPrize(temp.reward);
        }        
        // eslint-disable-next-line
    }, [currentLevel])

    return (
        <>
            <div className='p-3 h-100' >
                <div className='h-100 d-none d-md-flex flex-column justify-content-center'>
                    {
                        priceList.map((element, index) => {
                            return (
                                <div key={index} className={`h-100 px-2 d-flex mb-2 align-items-center ${(currentLevel) === element.srno ? "active" : ""}`}>
                                    <p className='mb-0 w-25'>
                                        {element.srno}
                                    </p>
                                    <p className='mb-0'>
                                        {element.reward}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='active d-md-none d-flex h-100 justify-content-center align-items-center '>
                    <p className='mb-0 w-50 text-center fw-bold'>{tempPrice ? tempPrice.srno : ""}</p>
                    <p className='mb-0 w-50 text-center fw-bold'>{tempPrice ? tempPrice.reward : ""}</p>
                </div>

            </div>
        </>
    )
}

export default Pyramid