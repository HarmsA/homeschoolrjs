
// Format a date to string
export const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString();
};

// Calculate time distance from now
export const formatDistanceToNow = (date) => {
  if (!date) return '';
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (diffDays > 0) return `${diffDays} days ago`;
  if (diffHours > 0) return `${diffHours} hours ago`;
  if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
  return 'just now';
};

// Check if date is before another date
export const isBefore = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1 < date2;
};
