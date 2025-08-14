import "./App.css";
import { useQuery } from "@tanstack/react-query";


function App() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://tech-test-backend.dwsbrazil.io/posts/");
      if (!res.ok) throw new Error("Error to search posts");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
    <h1>Post List</h1>
    <ul>
      {data.map((post: any) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default App;
