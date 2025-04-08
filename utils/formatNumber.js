// utils/formatNumber.js
/**
 * Formats a number with comma separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export default function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }