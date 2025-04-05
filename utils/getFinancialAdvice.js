// utils/getFinancialAdvice.js
// import OpenAI from "openai";

// Function to generate personalized financial advice (mock version)
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);

  try {
    // Për shembull, mund të krijosh një përgjigje të thjeshtë pa përdorur OpenAI
    const advice = `Consider reducing expenses or increasing income to improve your financial stability.`;

    return advice;
  } catch (error) {
    console.error("Error generating financial advice:", error);
    return "Sorry, I couldn't generate the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
