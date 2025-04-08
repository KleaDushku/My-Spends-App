import { useState, useEffect } from 'react';
import { 
  Wallet, 
  ReceiptText, 
  Sparkles, 
  CircleDollarSign,
  Send
} from 'lucide-react';
import formatNumber from '@/utils/formatNumber'; // Now this will work
import getFinancialAdvice from '@/utils/getFinancialAdvice';

function CardInfo({ budgetList = [], incomeList = [] }) {
  // State for financial data
  const [totals, setTotals] = useState({
    budget: 0,
    income: 0,
    spend: 0
  });

  // State for advice functionality
  const [advice, setAdvice] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState({
    expenses: {},
    income: {}
  });

  // Calculate totals and categories
  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      const newTotals = {
        budget: budgetList.reduce((sum, item) => sum + Number(item.amount), 0),
        income: incomeList.reduce((sum, item) => sum + item.totalAmount, 0),
        spend: budgetList.reduce((sum, item) => sum + item.totalSpend, 0)
      };

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

      setTotals(newTotals);
      setCategories(newCategories);
    }
  }, [budgetList, incomeList]);

  // Fetch advice when financial data changes
  useEffect(() => {
    if (totals.income > 0) {
      fetchAdvice();
    }
  }, [totals]);

  // Function to fetch financial advice
  const fetchAdvice = async (question = '') => {
    setLoading(true);
    try {
      const result = await getFinancialAdvice(
        totals.income,
        totals.spend,
        {
          expensesByCategory: categories.expenses,
          incomeByCategory: categories.income,
          question: question
        }
      );
      setAdvice(result);
    } catch (error) {
      setAdvice('Could not get financial advice at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle custom question submission
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (customQuestion.trim()) {
      fetchAdvice(customQuestion);
      setCustomQuestion('');
    }
  };

  // Card gradient styles
  const cardGradients = [
    'bg-gradient-to-r from-purple-600 to-blue-500',
    'bg-gradient-to-r from-fuchsia-600 to-pink-500',
    'bg-gradient-to-r from-violet-600 to-purple-500',
    'bg-gradient-to-r from-pink-500 to-red-500',
  ];

  return (
    <div className="space-y-6">
      {/* Advice Card */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-purple-800 to-blue-600 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-yellow-300" />
          <h3 className="text-lg font-semibold">Financial Advice</h3>
        </div>
        
        <div className="min-h-[60px] mb-4 flex items-center">
          {isLoading ? (
            <div className="animate-pulse">Generating advice...</div>
          ) : (
            <p className="text-sm md:text-base">{advice || 'Analyzing your financial data...'}</p>
          )}
        </div>

        <form onSubmit={handleQuestionSubmit} className="flex gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Ask a specific question..."
            className="flex-1 bg-white/20 rounded-full px-4 py-2 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      {budgetList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Total Budget',
              value: totals.budget,
              icon: Wallet,
              gradient: cardGradients[0]
            },
            {
              title: 'Total Expenses',
              value: totals.spend,
              icon: ReceiptText,
              gradient: cardGradients[1]
            },
            {
              title: 'Number of Budgets',
              value: budgetList.length,
              icon: Wallet,
              gradient: cardGradients[2]
            },
            {
              title: 'Total Income',
              value: totals.income,
              icon: CircleDollarSign,
              gradient: cardGradients[3]
            }
          ].map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl text-white shadow-md flex items-center justify-between ${card.gradient}`}
            >
              <div>
                <h4 className="text-sm font-medium">{card.title}</h4>
                <p className="text-2xl font-bold">
                  {card.title.includes('Number') ? card.value : `$${formatNumber(card.value)}`}
                </p>
              </div>
              <card.icon className="h-12 w-12 p-3 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardGradients.map((gradient, index) => (
            <div
              key={index}
              className={`h-28 rounded-xl animate-pulse ${gradient} opacity-20`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;