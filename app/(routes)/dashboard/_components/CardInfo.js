import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinancialAdvice";
import {
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
      };

      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  // Gradient colors for cards
  const cardGradients = [
    "bg-gradient-to-r from-purple-600 to-blue-500",
    "bg-gradient-to-r from-fuchsia-600 to-pink-500",
    "bg-gradient-to-r from-violet-600 to-purple-500",
    "bg-gradient-to-r from-pink-500 to-red-500",
  ];

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="mt-4 mb-6 rounded-2xl flex items-center justify-between bg-gradient-to-r from-purple-800 via-fuchsia-600 to-pink-500 p-6 text-white shadow-lg">
            <div className="">
              <div className="flex mb-2 flex-row space-x-3 items-center">
                <h2 className="text-lg font-semibold">Tips for you</h2>
                <Sparkles className="rounded-full text-yellow-300 w-10 h-10 p-2 bg-black bg-opacity-20" />
              </div>
              <h2 className="font-light text-md">
                {financialAdvice || "Analyzing your financial data..."}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className={`p-6 rounded-2xl flex items-center justify-between text-white ${cardGradients[0]} shadow-md`}>
              <div>
                <h2 className="text-sm font-medium">Total Budget</h2>
                <h2 className="font-bold text-2xl">
                  ${formatNumber(totalBudget)}
                </h2>
              </div>
              <Wallet className="bg-white bg-opacity-20 p-3 h-12 w-12 rounded-full" />
            </div>
            <div className={`p-6 rounded-2xl flex items-center justify-between text-white ${cardGradients[1]} shadow-md`}>
              <div>
                <h2 className="text-sm font-medium">Total Spend</h2>
                <h2 className="font-bold text-2xl">
                  ${formatNumber(totalSpend)}
                </h2>
              </div>
              <ReceiptText className="bg-white bg-opacity-20 p-3 h-12 w-12 rounded-full" />
            </div>
            <div className={`p-6 rounded-2xl flex items-center justify-between text-white ${cardGradients[2]} shadow-md`}>
              <div>
                <h2 className="text-sm font-medium">No. Of Budgets</h2>
                <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
              </div>
              <Wallet className="bg-white bg-opacity-20 p-3 h-12 w-12 rounded-full" />
            </div>
            <div className={`p-6 rounded-2xl flex items-center justify-between text-white ${cardGradients[3]} shadow-md`}>
              <div>
                <h2 className="text-sm font-medium">Total Income</h2>
                <h2 className="font-bold text-2xl">
                  ${formatNumber(totalIncome)}
                </h2>
              </div>
              <CircleDollarSign className="bg-white bg-opacity-20 p-3 h-12 w-12 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardGradients.map((gradient, index) => (
            <div
              className={`h-[120px] w-full rounded-2xl animate-pulse ${gradient} opacity-20`}
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;