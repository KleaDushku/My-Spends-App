"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Incomes, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";

function IncomeList() {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getIncomeList();
    }
  }, [user]);

  const getIncomeList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Incomes)
        .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Incomes.id)
        .orderBy(desc(Incomes.id));
      
      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateIncomes refreshData={getIncomeList} />
        
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl h-[160px] animate-pulse"
            />
          ))
        ) : incomeList.length > 0 ? (
          incomeList.map((income) => (
            <IncomeItem 
              key={income.id} 
              budget={income} 
              onUpdate={getIncomeList}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-500 text-center">
              No income sources found. Create your first one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IncomeList;