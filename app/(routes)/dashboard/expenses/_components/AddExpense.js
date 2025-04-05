import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });

    setAmount("");
    setName("");
    if (result) {
      setLoading(false);
      refreshData();
      toast.success("New Expense Added!", {
        style: {
          background: 'rgba(74, 222, 128, 0.9)',
          color: '#fff',
          border: 'none'
        }
      });
    }
    setLoading(false);
  };

  return (
    <div className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white">
      <h2 className="font-bold text-lg text-gray-800">Add New Expense</h2>
      
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Expense Name
          </label>
          <Input
            className="focus-visible:ring-gray-400"
            placeholder="e.g. Bedroom Decor"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Expense Amount
          </label>
          <Input
            className="focus-visible:ring-gray-400"
            placeholder="e.g. 1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </div>
      </div>

      <Button
        disabled={!(name && amount) || loading}
        onClick={addNewExpense}
        className="mt-5 w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-md transition-all"
      >
        {loading ? (
          <Loader className="animate-spin h-4 w-4" />
        ) : (
          "Add Expense"
        )}
      </Button>
    </div>
  );
}

export default AddExpense;