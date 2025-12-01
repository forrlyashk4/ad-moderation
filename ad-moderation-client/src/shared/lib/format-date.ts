const formatDate = function (dateString: string) {
  const date = new Date(dateString);
  return (
    date.toISOString().slice(0, 10).replace(/-/g, ".") +
    " " +
    date.toTimeString().slice(0, 5)
  );
};

export { formatDate };
