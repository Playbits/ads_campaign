export const formatCurrency = (value: number) => {
  return value.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};

export const formatDate = (value: Date) => {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
