"use client";
import React, { useEffect, useState } from "react";
import { Currency } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

export default function History() {
  const [income, showIncome] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

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

      // Extract unique categories from the income data
      const uniqueCategories = Array.from(new Set(data.map(i => i.category).filter(Boolean)));
      setCategories(["", ...uniqueCategories]);
    };
    getIncomeData();
  }, []);

  const handleDeleteIncome = async (incomeId) => {
    const docRef = doc(db, 'income', incomeId);
    try {
      await deleteDoc(docRef);
      showIncome(prevState => prevState.filter(i => i.id !== incomeId));
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

  const filteredIncome = income.filter(i => 
    i.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || i.category === selectedCategory)
  );

  return (
    <div className="flex flex-col mt-20">
      <h2 className="text-center text-black font-bold text-4xl mb-4">Your Income History</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by description..."
          className="px-4 py-2 border border-gray-300 rounded-md mx-auto"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="relative bg-white border border-gray-300 mx-10 p-4 rounded-md shadow-md mb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">Filter by Category:</p>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mb-2"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category || "All"}</option>
              ))}
            </select>
          </div>
        </div>
        {filteredIncome.map(i => (
          <div key={i.id} className="flex justify-between items-start mb-3">
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold">{i.description}</p>
              <small className="text-gray-500">{i.createdAt ? i.createdAt.toLocaleDateString() : "N/A"}</small>
              <p className="text-green-600 text-lg font-bold mt-2">{Currency(i.amount)}</p>
            </div>
            <p className="text-black my-auto font-bold">{i.category}</p>
            <MdDelete className="text-red-500 hover:text-red-700 cursor-pointer" size={20} onClick={() => handleDeleteIncome(i.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
