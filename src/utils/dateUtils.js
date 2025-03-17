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
// Date adapter for MUI
export class CustomDateAdapter {
  constructor({ locale } = {}) {
    this.locale = locale;
  }

  date(value) {
    return value ? new Date(value) : null;
  }

  toJsDate(value) {
    return new Date(value);
  }

  parse(value) {
    return new Date(value);
  }

  format(date) {
    return date ? date.toLocaleDateString(this.locale) : '';
  }

  isValid(date) {
    return date instanceof Date && !isNaN(date);
  }

  isEqual(date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getTime() === date2.getTime();
  }

  isBefore(date1, date2) {
    if (!date1 || !date2) return false;
    return date1 < date2;
  }

  isAfter(date1, date2) {
    if (!date1 || !date2) return false;
    return date1 > date2;
  }

  addDays(date, count) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + count);
    return newDate;
  }
}