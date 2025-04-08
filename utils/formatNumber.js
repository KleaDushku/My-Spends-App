// utils/formatNumber.js
export default function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }