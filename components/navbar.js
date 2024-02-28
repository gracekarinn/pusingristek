import React from 'react';
import { FaMoneyBills } from 'react-icons/fa6';
import { TbLogout } from 'react-icons/tb';
import Link from 'next/link';
import { MdOutlineHistory } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className='px-6 py-6 border-b-2 mb-10'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='font-bold text-black text-xl'>Hi, Grace K!</p>
        </div>
        <nav className='flex items-center gap-3'>
          <Link href='/income'>
             <FaMoneyBills className='text-3xl text-black' />
          </Link>
          <Link href='/expense'>
             <MdOutlineHistory className='text-3xl text-black' />
          </Link>
          <Link href='/logout'>
             <TbLogout className='text-3xl text-black' />
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
