"use client";
import React, { useEffect } from "react";
import { Currency } from '@/lib/utils';
import { useState, useRef } from "react";
import Menu from "@/components/menu";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

export default function Home() {
  const [showIncomeMenu, setshowIncomeMenu] = useState(false);
  const [showExpenseMenu, setshowExpenseMenu] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const amountExRef = useRef();
  const descriptioExRef = useRef();
  const categoryExRef = useRef();
  const dateExRef = useRef();
  const [income, showIncome] = useState([]);
  const dateRef = useRef();
  const [expense, showExpense] = useState([]);
  const [balance, setBalance] = useState(0);
  


  const addIncomeHandler = async (e) => {
    e.preventDefault()
  
    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: dateRef.current.value ? new Date(dateRef.current.value) : serverTimestamp(),
      category: categoryRef.current.value,
    };

    const collectionRef = collection(db, "income");

    try {
      const docsSnap = await addDoc(collectionRef, newIncome);

      showIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docsSnap.id,
            ...newIncome,
          },
        ];
      });
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      dateRef.current.value = "";
      setshowIncomeMenu(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionData = collection(db, "income");
      const docsSnap = await getDocs(collectionData);
      const data = docsSnap.docs.map(doc => {
        const createdAt = doc.data().createdAt ? new Date(doc.data().createdAt.toMillis()) : null;
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: createdAt,
        };
      });
      showIncome(data);
    };
    getIncomeData();
  }, []);

  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0) - expense.reduce((total, e) => {
      return total + e.amount;
    }, 0)
    setBalance(newBalance)
  }, [expense, income])

  const addExpenseHandler = async (e) => {
    e.preventDefault()
    const newExpense = {
      amount: +amountExRef.current.value,
      description: descriptioExRef.current.value,
      createdAt: dateExRef.current.value ? new Date(dateExRef.current.value) : serverTimestamp(),
      category: categoryExRef.current.value,
    };

    const collectionExRef = collection(db, "expense");

    try {
      const docsSnap = await addDoc(collectionExRef, newExpense);

      showExpense((prevState) => {
        return [
          ...prevState,
          {
            id: docsSnap.id,
            ...newExpense,
          },
        ];
      });
      descriptioExRef.current.value = "";
      amountExRef.current.value = "";
      dateExRef.current.value = "";
      setshowExpenseMenu(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const getExpenseData = async () => {
      const collectionData = collection(db, "expense");
      const docsSnap = await getDocs(collectionData);
      const data = docsSnap.docs.map(doc => {
        const createdAt = doc.data().createdAt ? new Date(doc.data().createdAt.toMillis()) : null;
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: createdAt,
        };
      });
      showExpense(data);
    };
    getExpenseData();
  }, []);
    
  return (
    <>
      <Menu show={showIncomeMenu} onClose={setshowIncomeMenu}>
        <form onSubmit={addIncomeHandler} className="flex flex-col gap-3">
          <label htmlFor="amount">Income amount</label>
          <input 
          ref={amountRef}
          name="amount"
          type="number"
          min={10000}
          step={1000}
          placeholder="Enter income amount"
          className="border-2 border-black rounded-2xl px-3"
          required
          />
          <label htmlFor="description">Income description</label>
          <input 
          ref={descriptionRef}
          name="description"
          type="text"
          placeholder="Enter income description"
          className="border-2 border-black rounded-2xl px-3 capitalize"
          required
          />
          <label htmlFor="date">Income date</label>
          <input
            ref={dateRef}
            name="date"
            type="date"
            className="border-2 border-black rounded-2xl px-3"
            required
          />
          <label className="category">Income Category</label>
          <input
            ref={categoryRef}
            name="category"
            type="input"
            placeholder="Enter income category"
            className="border-2 border-black rounded-2xl px-3 capitalize"
            required
          />
          <button className="rounded-2xl border-black border-2 w-40 mx-auto mt-5">Submit</button>
        </form>
      </Menu>
      <Menu show={showExpenseMenu} onClose={setshowExpenseMenu}>
        <form onSubmit={addExpenseHandler} className="flex flex-col gap-3">
          <label htmlFor="expense amount">Expense amount</label>
          <input 
          ref={amountExRef}
          name="amount"
          type="number"
          min={10000}
          step={1000}
          placeholder="Enter expense amount"
          className="border-2 border-black rounded-2xl px-3"
          required
          />
          <label htmlFor="description">Expense description</label>
          <input 
          ref={descriptioExRef}
          name="description"
          type="text"
          placeholder="Enter expense description"
          className="border-2 border-black rounded-2xl px-3 capitalize"
          required
          />
          <label htmlFor="expense date">Expense date</label>
          <input
            ref={dateExRef}
            name="date"
            type="date"
            className="border-2 border-black rounded-2xl px-3"
            required
          />
          <label className="expense category">Expense Category</label>
          <input
            ref={categoryExRef}
            name="category"
            type="input"
            placeholder="Enter expense category"
            className="border-2 border-black rounded-2xl px-3 capitalize"
            required
          />
          <button className="rounded-2xl border-black border-2 w-40 mx-auto mt-5">Submit</button>
        </form>
      </Menu>
      <main className="flex min-h-screen flex-col items-center p-15">
        <div className="z-10 max-w-5xl w-full  text-sm flex flex-col">
          <h1 className="text-center text-3xl md:text-7xl text-black font-extrabold mb-5">Welcome To MoneyRizz</h1>
          <p className="text-gray-300 font-bold text-center text-xl md:text-3xl mb-5">Track your money effortlessly</p>
          {/* Balance section */}
          <div className="flex flex-wrap mx-auto justify-center gap-x-1 md:gap-x-5">
            <div className="mt-10 flex flex-col border-2 w-fit px-3 rounded-xl border-black gap-2">
              <p className="text-xl md:text-3xl font-bold text-center">Balance</p>
              <p className="text-center md:text-2xl font-bold">{Currency(balance)}</p>
            </div>
            <div className="mt-10 flex flex-col border-2 w-fit px-3 rounded-xl border-black gap-2">
              <p className="text-xl md:text-3xl font-bold text-center">Expense</p>
              <p className="text-center md:text-2xl font-bold">{Currency(expense.reduce((total, e) => total + e.amount, 0))}</p>
            </div>
            <div className="mt-10 mx-auto flex-col border-2 w-fit px-3 rounded-xl border-black gap-2">
              <p className="text-xl md:text-3xl font-bold text-center mb-2">Income</p>
              <p className="text-center md:text-2xl font-bold">{Currency(income.reduce((total, i) => total + i.amount, 0))}</p>
            </div>
          </div>
          {/* Button section */}
          <div className="flex flex-row mx-auto gap-x-3 mt-10">
            <button
              onClick={() => {
                setshowIncomeMenu(true);
              }}
              className="bg-black text-white hover:bg-blue-500 rounded-full p-4">Add Income</button>
            <button
              onClick={() => {
                setshowExpenseMenu(true);
              }}
             className="bg-black text-white hover:bg-red-500 rounded-full p-4">Add Expense</button>
          </div>
        </div>
      </main>
    </>
  );
}
