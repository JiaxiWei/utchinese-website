/**
 * Format a date into a localized string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  // Format options
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  return date.toLocaleDateString('zh-CN', options);
};

/**
 * Calculate the event status based on date
 * @param {Date} startDate - Event start date
 * @param {Date} endDate - Event end date
 * @returns {string} Status ('past', 'ongoing', or 'upcoming')
 */
export const getEventStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  if (end && now > end) {
    return 'past';
  } else if (start > now) {
    return 'upcoming';
  } else {
    return 'ongoing';
  }
}; 