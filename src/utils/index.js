const formatDate = (isoDate) => {
  const newDate = new Date(isoDate);
  const date = newDate.getUTCDate();
  const month = newDate.toLocaleDateString(
    'en-US',
    { month: 'short' },
  );
  const year = newDate.getFullYear();

  return `${date} ${month} ${year}`;
};

module.exports = { formatDate };
