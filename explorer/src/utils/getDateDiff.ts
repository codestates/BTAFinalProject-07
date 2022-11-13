const getPastDateDiff = (past: Date) => {
  const current = new Date();
  const yearDiff = current.getFullYear() - past.getFullYear();
  if (yearDiff) {
    return yearDiff + ' years ago';
  }
  const monthDiff = current.getMonth() - past.getMonth();
  if (monthDiff) {
    return monthDiff + ' months ago';
  }
  const dateDiff = current.getDate() - past.getDate();
  if (dateDiff) {
    return dateDiff + ' days ago';
  }
  const hourDiff = current.getHours() - past.getHours();
  if (hourDiff) {
    return hourDiff + ' hours ago';
  }
  const minuteDiff = current.getMinutes() - past.getMinutes();
  if (minuteDiff) {
    return minuteDiff + ' minutes ago';
  }
  const secondDiff = current.getSeconds() - past.getSeconds();
  return secondDiff + ' seconds ago';
};

export default getPastDateDiff;
