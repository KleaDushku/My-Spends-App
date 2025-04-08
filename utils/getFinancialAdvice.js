import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Merr këshilla financiare të personalizuara
 * @param {number} totalIncome - Të ardhurat totale
 * @param {number} totalSpend - Shpenzimet totale
 * @param {Object} [options] - Opsione shtesë
 * @param {Object} [options.expensesByCategory] - Shpenzimet sipas kategorive
 * @param {Object} [options.incomeByCategory] - Të ardhurat sipas kategorive
 * @param {string[]} [options.financialGoals] - Qëllimet financiare
 * @param {string} [options.question] - Pyetje e veçantë e përdoruesit
 * @returns {Promise<string>} - Këshilla financiare e koncizuar
 */
const getFinancialAdvice = async (
  totalIncome,
  totalSpend,
  {
    expensesByCategory = {},
    incomeByCategory = {},
    financialGoals = [],
    question = ""
  } = {}
) => {
  const savings = totalIncome - totalSpend;
  const savingsRate = ((savings / totalIncome) * 100).toFixed(1);

  try {
    const basePrompt = `
      Të dhënat financiare:
      - Të ardhurat: $${totalIncome} ${Object.keys(incomeByCategory).length > 0 ? `(${JSON.stringify(incomeByCategory)})` : ''}
      - Shpenzimet: $${totalSpend} ${Object.keys(expensesByCategory).length > 0 ? `(${JSON.stringify(expensesByCategory)})` : ''}
      - Kursimet: $${savings} (${savingsRate}% e të ardhurave)
      ${financialGoals.length > 0 ? `- Qëllimet: ${financialGoals.join(", ")}\n` : ''}
      ${question ? `Pyetja e përdoruesit: "${question}"\n` : ''}

      Jepni NJË fjali të vetme këshillash financiare:
      1. Fokuso tek optimizimi i shpenzimeve
      2. Sugjero mënyra për të rritur kursimet
      3. ${question ? 'Përgjigju specifikisht pyetjes së përdoruesit' : 'Sugjero rregullime në buxhet'}
      Përdor gjuhë të thjeshtë dhe sugjerime konkrete.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: basePrompt }],
      max_tokens: 100,
      temperature: 0.5
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Gabim gjenerimi këshillash:", error);
    return "Nuk mund të gjenerojmë këshilla në këtë moment. Ju lutem provoni përsëri.";
  }
};

export default getFinancialAdvice;