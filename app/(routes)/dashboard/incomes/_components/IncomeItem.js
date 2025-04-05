"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm"; // Shtuar këtë import

function IncomeItem({ budget, onUpdate }) {
  const deleteIncome = async () => {
    const result = await db
      .delete(Incomes)
      .where(eq(Incomes.id, budget.id))
      .returning();

    if (result) {
      onUpdate();
      toast.success("Income source deleted successfully!", {
        style: {
          background: 'rgba(74, 222, 128, 0.9)',
          color: '#fff',
          border: 'none'
        }
      });
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow duration-200 cursor-pointer h-[160px] flex flex-col justify-between bg-white group relative">
      {/* Delete button (appears on hover) */}
      <button 
        onClick={deleteIncome}
        className="absolute -top-2 -right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-10"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full text-purple-600 text-xl">
            {budget?.icon || '💰'}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{budget.name}</h2>
            <p className="text-xs text-gray-500">{budget.totalItem} {budget.totalItem === 1 ? 'Transaction' : 'Transactions'}</p>
          </div>
        </div>
        <h2 className="font-bold text-lg text-purple-600">${budget.amount}</h2>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Income</span>
          <span>${budget.amount}</span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;