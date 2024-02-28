import React from 'react';
import { Currency } from '@/lib/utils';

function Expense({ color, title, total }) {
    return (
        <div className='md:w-[650px] flex items-center border-2 border-black mt-5 rounded-full mx-4 md:mx-auto p-6 md:max-w-screen-md lg:mx-auto relative justify-between'>
            <div className='flex items-center gap-2'>
                <div className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor: color }} />
                <p className='capitalize text-black font-normal'>{title}</p>
            </div>
            <p className='text-black font-bold'>{Currency(total)}</p>
        </div>
    );
}

export default Expense;