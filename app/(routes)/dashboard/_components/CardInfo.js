import { useState, useEffect } from 'react';
import { 
  Wallet, 
  ReceiptText, 
  Sparkles, 
  CircleDollarSign,
  Send
} from 'lucide-react';
import formatNumber from '@/utils/formatNumber';
import getFinancialAdvice from '@/utils/getFinancialAdvice';

export default function CardInfo({ budgetList = [], incomeList = [] }) {
  // State for financial data
  const [financialData, setFinancialData] = useState({
    totals: {
      budget: 0,
      income: 0,
      spend: 0,
      savings: 0,
      savingsRate: 0
    },
    categories: {
      expenses: {},
      income: {}
    }
  });

  // State for advice functionality
  const [advice, setAdvice] = useState({
    content: '',
    customQuestion: '',
    isLoading: false,
    error: null
  });

  // Calculate financial data when lists change
  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      const newTotals = {
        budget: budgetList.reduce((sum, item) => sum + Number(item.amount), 0),
        income: incomeList.reduce((sum, item) => sum + item.totalAmount, 0),
        spend: budgetList.reduce((sum, item) => sum + item.totalSpend, 0)
      };
      
      newTotals.savings = newTotals.income - newTotals.spend;
      newTotals.savingsRate = parseFloat(((newTotals.savings / newTotals.income) * 100).toFixed(1));

      const newCategories = {
        expenses: budgetList.reduce((acc, item) => ({
          ...acc,
          [item.name]: item.totalSpend
        }), {}),
        income: incomeList.reduce((acc, item) => ({
          ...acc,
          [item.name]: item.totalAmount
        }), {})
      };

      setFinancialData({
        totals: newTotals,
        categories: newCategories
      });
    }
  }, [budgetList, incomeList]);

  // Fetch advice when financial data changes
  useEffect(() => {
    if (financialData.totals.income > 0) {
      fetchAdvice();
    }
  }, [financialData.totals]);

  // Fetch financial advice
  const fetchAdvice = async (question = '') => {
    setAdvice(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await getFinancialAdvice(
        financialData.totals.income,
        financialData.totals.spend,
        {
          expensesByCategory: financialData.categories.expenses,
          incomeByCategory: financialData.categories.income,
          question: question || ''
        }
      );
      setAdvice(prev => ({ ...prev, content: result }));
    } catch (error) {
      setAdvice(prev => ({ ...prev, 
        error: 'Failed to get financial advice',
        content: 'Unable to generate advice. Please try again later.'
      }));
      console.error('Advice generation error:', error);
    } finally {
      setAdvice(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Handle custom question submission
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (advice.customQuestion.trim()) {
      fetchAdvice(advice.customQuestion);
      setAdvice(prev => ({ ...prev, customQuestion: '' }));
    }
  };

  // Card configuration
  const statCards = [
    {
      title: 'Total Budget',
      value: financialData.totals.budget,
      icon: Wallet,
      gradient: 'bg-gradient-to-r from-purple-600 to-blue-500'
    },
    {
      title: 'Total Expenses',
      value: financialData.totals.spend,
      icon: ReceiptText,
      gradient: 'bg-gradient-to-r from-fuchsia-600 to-pink-500'
    },
    {
      title: 'Savings Rate',
      value: `${financialData.totals.savingsRate}%`,
      icon: CircleDollarSign,
      gradient: 'bg-gradient-to-r from-emerald-600 to-teal-500'
    },
    {
      title: 'Total Income',
      value: financialData.totals.income,
      icon: CircleDollarSign,
      gradient: 'bg-gradient-to-r from-pink-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Advice Section */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-purple-800 to-blue-600 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-yellow-300" />
          <h3 className="text-lg font-semibold">Financial Advisor</h3>
        </div>
        
        <div className="min-h-[60px] mb-4 flex items-center">
          {advice.isLoading ? (
            <div className="animate-pulse">Analyzing your finances...</div>
          ) : (
            <p className="text-sm md:text-base">
              {advice.content || 'Enter your financial data to get personalized advice'}
            </p>
          )}
        </div>

        <form onSubmit={handleQuestionSubmit} className="flex gap-2">
          <input
            type="text"
            value={advice.customQuestion}
            onChange={(e) => setAdvice(prev => ({ ...prev, customQuestion: e.target.value }))}
            placeholder="Ask a specific question..."
            className="flex-1 bg-white/20 rounded-full px-4 py-2 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={advice.isLoading}
          />
          <button
            type="submit"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
            disabled={advice.isLoading || !advice.customQuestion.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {budgetList.length > 0 ? (
          statCards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl text-white shadow-md flex items-center justify-between ${card.gradient}`}
            >
              <div>
                <h4 className="text-sm font-medium">{card.title}</h4>
                <p className="text-2xl font-bold">
                  {card.title.includes('Rate') ? 
                    card.value : 
                    `$${formatNumber(card.value)}`
                  }
                </p>
              </div>
              <card.icon className="h-12 w-12 p-3 bg-white/20 rounded-full" />
            </div>
          ))
        ) : (
          statCards.map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-xl animate-pulse bg-gray-200 dark:bg-gray-700"
            />
          ))
        )}
      </div>
    </div>
  );
}
