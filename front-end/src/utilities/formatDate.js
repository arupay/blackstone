/**
 * Converts a given ISO date string into a human-readable format.
 * @param {string} isoString - The ISO formatted date string.
 * @returns {string} - The human-readable formatted date string.
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
}

/**
 * Converts a JS Date object into the desired UTC format (for backend purposes).
 * @param {Date} date - The JavaScript Date object.
 * @returns {string} - The formatted date string in 'YYYY-MM-DD HH:mm:ss UTC' format.
 */
export function convertToUTCString(date) {
  const isoString = date.toISOString();
  const formattedString = isoString.replace("T", " ").split(".")[0];
  return `${formattedString} UTC`;
}
// Gets only the start date in a human-readable format.
export function getDayOfMonth(isoString) {
  const date = new Date(isoString);
  return date.getDate().toString();
}

// Gets only the first 3 letters of the month.
export function getMonthAbbreviation(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "short" });
}

export function getDayOfWeekAbbreviation(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}
