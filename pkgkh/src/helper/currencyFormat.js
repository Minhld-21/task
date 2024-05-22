export default function currencyFormat(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid input';
  }

  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'đ';
}

export function currencyFormatNoUnit(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Invalid input';
  }

  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
