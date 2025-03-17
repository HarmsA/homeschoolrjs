
// Format a date to string
export const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString();
};

// Calculate time distance from now
export const formatDistanceToNow = (date, options = {}) => {
  if (!date) return '';
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
  let result = '';
  if (diffDays > 0) result = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  else if (diffHours > 0) result = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  else if (diffMinutes > 0) result = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  else if (diffSeconds > 0) result = `${diffSeconds} second${diffSeconds > 1 ? 's' : ''}`;
  else result = 'less than a second';

  if (options.addSuffix) {
    result = date > now ? `in ${result}` : `${result} ago`;
  }
  
  return result;
};

// Check if date is in the past
export const isPast = (date) => {
  if (!date) return false;
  return date < new Date();
};

// Check if date is in the future
export const isFuture = (date) => {
  if (!date) return false;
  return date > new Date();
};

// Check if two dates are equal (comparing year, month, and day)
export const isEqual = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// Check if date is before another date
export const isBefore = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1 < date2;
};
// Custom Date Adapter for MUI
export class CustomDateAdapter {
  constructor({ locale } = {}) {
    this.locale = locale;
  }

  // Required by MUI
  date(value) {
    if (value === null) return null;
    return new Date(value);
  }

  parse(value) {
    return new Date(value);
  }

  format(date, formatString) {
    if (!date) return '';
    return date.toLocaleDateString(this.locale);
  }

  toJsDate(value) {
    return new Date(value);
  }

  isValid(date) {
    return date instanceof Date && !isNaN(date);
  }

  addDays(date, count) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + count);
    return newDate;
  }

  getYear(date) {
    return date.getFullYear();
  }

  getMonth(date) {
    return date.getMonth();
  }

  getDate(date) {
    return date.getDate();
  }

  getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  setYear(date, year) {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    return newDate;
  }

  setMonth(date, month) {
    const newDate = new Date(date);
    newDate.setMonth(month);
    return newDate;
  }

  setDate(date, day) {
    const newDate = new Date(date);
    newDate.setDate(day);
    return newDate;
  }

  formatByString(date, formatString) {
    return date.toLocaleDateString();
  }

  isEqual(date1, date2) {
    return date1?.getTime() === date2?.getTime();
  }

  isSameDay(date1, date2) {
    return this.isEqual(date1, date2);
  }

  startOfDay(date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  endOfDay(date) {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  }
}
