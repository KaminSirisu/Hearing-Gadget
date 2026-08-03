export function formatRelativeTime(updatedAt) {
  const utcString = updatedAt.endsWith('Z') ? updatedAt : `${updatedAt}Z`;
  const diffMs = Date.now() - new Date(utcString).getTime();
  const diffMinutes = diffMs / (1000 * 60);
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  // your tier logic here
  if (diffMs > 0 && diffMs < 60000) { // less than a minute
    return 'Just now';
  } else if (diffMinutes < 2) {
    return 'a minute ago';
  } else if (diffMinutes < 60) {
    return `${Math.floor(diffMinutes)} minutes ago`;
  } else if (diffHours < 2) {
    return 'an hour ago';
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)} hours ago`;
  } else if (diffDays < 2) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${Math.floor(diffDays)} days ago`;
  } else {
    return 'More than 7 days ago';
  }
}