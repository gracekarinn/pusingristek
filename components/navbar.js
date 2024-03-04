import React from 'react';
import { FaMoneyBills } from 'react-icons/fa6';
import Link from 'next/link';
import { GiExpense } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className='px-6 py-6 border-b-2 mb-10'>
      <div className='flex items-center justify-between'>
        <div>
          <Image
          src="/malamute.png"
          alt="malamute"
          quality={100}
          width={50}
          height={50}
          />
        </div>
        <nav className='flex items-center gap-3'>
          <Link href='/income'>
             <FaMoneyBills className='text-3xl text-black' />
          </Link>
          <Link href='/expense'>
             <GiExpense className='text-3xl text-black' />
          </Link>
          <Link href='/'>
             <FaHome className='text-3xl text-black' />
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
