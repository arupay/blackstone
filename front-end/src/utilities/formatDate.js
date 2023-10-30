/**
 * Converts a given ISO date string into a human-readable format.
 * @param {string} isoString - The ISO formatted date string.
 * @returns {string} - The human-readable formatted date string.
 */
function formatDate(isoString) {
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

export default formatDate;
