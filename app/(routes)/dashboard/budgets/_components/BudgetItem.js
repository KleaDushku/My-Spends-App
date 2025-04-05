import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const progressPercentage = calculateProgressPerc();
  const isOverBudget = progressPercentage >= 100;

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 rounded-xl cursor-pointer h-[170px] transition-all duration-300 
          bg-gradient-to-br from-gray-100 to-gray-200
          hover:from-gray-150 hover:to-gray-250
          border border-gray-300/30 shadow-md hover:shadow-lg
          relative overflow-hidden group">
        
        {/* Fuchsia accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="p-3 rounded-full bg-gray-300/20 text-fuchsia-600 border border-fuchsia-400/30 group-hover:bg-fuchsia-500/10">
                {budget?.icon}
              </div>
              <div>
                <h2 className="font-bold text-gray-800 group-hover:text-fuchsia-700 transition-colors">
                  {budget.name}
                </h2>
                <h2 className="text-sm text-gray-600">{budget.totalItem} Items</h2>
              </div>
            </div>
            <h2 className="font-bold text-xl text-gray-900 group-hover:text-fuchsia-800 transition-colors">
              ${budget.amount}
            </h2>
          </div>

          {/* Progress bar */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600 group-hover:text-fuchsia-600/90 transition-colors">
                ${budget.totalSpend || 0} spent
              </span>
              <span className="text-xs text-gray-600 group-hover:text-fuchsia-600/90 transition-colors">
                ${budget.amount - budget.totalSpend} remaining
              </span>
            </div>
            
            <div className="w-full bg-gray-300/40 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  isOverBudget ? "bg-red-400" : "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600"
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="mt-1.5 text-right">
              <span className={`text-xs font-medium ${
                isOverBudget ? "text-red-500" : "text-fuchsia-600"
              }`}>
                {progressPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Status badge */}
        {budget.isNew && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-fuchsia-500/90 to-fuchsia-600/90
              text-gray-100 text-xs px-2.5 py-1 rounded-full shadow
              font-medium uppercase tracking-wide">
            New
          </div>
        )}
      </div>
    </Link>
  );
}

export default BudgetItem;