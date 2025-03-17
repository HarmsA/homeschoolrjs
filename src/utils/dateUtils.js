
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

  let result = '';
  if (diffDays > 0) result = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  else if (diffHours > 0) result = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  else if (diffMinutes > 0) result = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  else result = 'just now';

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

// Date adapter implementation
export class CustomDateAdapter {
  constructor({ locale } = {}) {
    this.locale = locale;
  }

  // Required methods
  date(value) {
    if (!value) return null;
    return new Date(value);
  }

  parse(value, format) {
    return new Date(value);
  }

  format(date, format) {
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

  addMonths(date, count) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + count);
    return newDate;
  }

  addYears(date, count) {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + count);
    return newDate;
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

  getYear(date) {
    return date.getFullYear();
  }

  getMonth(date) {
    return date.getMonth();
  }

  getDate(date) {
    return date.getDate();
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

  isBefore(date1, date2) {
    return date1 < date2;
  }

  isAfter(date1, date2) {
    return date1 > date2;
  }

  isEqual(date1, date2) {
    return date1.getTime() === date2.getTime();
  }

  isSameDay(date1, date2) {
    return this.startOfDay(date1).getTime() === this.startOfDay(date2).getTime();
  }
}
