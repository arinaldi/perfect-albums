export const sortByDate = (a, b) => {
  const dateA = a === 'TBD'
    ? a
    : new Date(a).toISOString();
  const dateB = b === 'TBD'
    ? b
    : new Date(b).toISOString();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
};

export const sortDesc = (a, b) => b - a;

export const getQuery = (query) => decodeURI(query.substring(1));
