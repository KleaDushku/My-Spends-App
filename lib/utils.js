// utils/formatNumber.js
/**
 * Formats a number with comma separators (e.g., 1000 → "1,000")
 * @param {number|string} num - The number to format
 * @returns {string} Formatted number string
 */
export default function formatNumber(num) {
  if (typeof num === 'string') {
    num = parseFloat(num.replace(/[^0-9.]/g, ''));
  }
  return new Intl.NumberFormat('en-US').format(num);
}