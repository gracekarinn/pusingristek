"use client";
import React, { useEffect, useState } from "react";
import { Currency } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [expenses, showExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

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
      showExpenses(data);

   
      const uniqueCategories = Array.from(new Set(data.map(i => i.category).filter(Boolean)));
      setCategories(["", ...uniqueCategories]);
    };
    getExpenseData();
  }, []);

  const handleDeleteExpense = async (expenseId) => {
    const docRef = doc(db, 'expense', expenseId);
    try {
      await deleteDoc(docRef);
      showExpenses(prevState => prevState.filter(i => i.id !== expenseId));
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  const filteredExpenses = expenses.filter(i => 
    i.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || i.category === selectedCategory)
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-black font-bold text-4xl mb-4">Your Expense History</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by description..."
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md mb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">Filter by Category:</p>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mb-2 w-full"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category || "All"}</option>
              ))}
            </select>
          </div>
        </div>
        {filteredExpenses.map((i) => (
          <div key={i.id} className="flex justify-between items-start mb-3">
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold">{i.description}</p>
              <small className="text-gray-500">{i.createdAt ? i.createdAt.toLocaleDateString() : "N/A"}</small>
              <p className="text-red-600 text-lg font-bold mt-2">{Currency(i.amount)}</p>
            </div>
            <div className="flex flex-row gap-x-4">
              <p className="text-black font-bold">{i.category}</p>
              <MdDelete className="text-red-500 hover:text-red-700 cursor-pointer" size={20} onClick={() => handleDeleteExpense(i.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}