import { useQuery } from "@tanstack/react-query";

const Authors = ({ onSelectAuthor }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await fetch("https://tech-test-backend.dwsbrazil.io/authors/");
      if (!res.ok) throw new Error("Error to search authors");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <p>loading authors...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h4>Author</h4>
      {data.map((author) => (
        <div
          key={author.id}
          style={{ cursor: "pointer" }}
          onClick={() => onSelectAuthor(author.id)}
        >
          {author.name}
        </div>
      ))}
    </div>
  );
};

export default Authors;
