import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast.success("Expense Deleted Successfully!", {
        style: {
          background: 'rgba(239, 68, 68, 0.9)',
          color: '#fff',
          border: 'none'
        }
      });
      refreshData();
    }
  };

  return (
    <div className="mt-6">
      <h2 className="font-bold text-xl text-gray-800 mb-4">Latest Expenses</h2>
      
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gradient-to-r from-purple-50 to-pink-50 p-3 font-medium text-gray-700">
          <h2>Name</h2>
          <h2>Amount</h2>
          <h2>Date</h2>
          <h2>Action</h2>
        </div>

        {/* Table Body */}
        {expensesList.length > 0 ? (
          expensesList.map((expense, index) => (
            <div 
              key={index}
              className={`grid grid-cols-4 items-center p-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
            >
              <div className="text-gray-800">{expense.name}</div>
              <div className="font-medium text-gray-700">${expense.amount}</div>
              <div className="text-sm text-gray-500">{expense.createdAt}</div>
              <div className="flex justify-start">
                <button 
                  onClick={() => deleteExpense(expense)}
                  className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                >
                  <Trash className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 bg-white">
            No expenses recorded yet
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseListTable;