export const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
};

export const FILTER_KEYS = ["Travel", "Technology", "Food", "Science", "Fashion", "Sports", "Grace Doe", "Jack Smith", "Michael Johnson", "Emily Davis" ];