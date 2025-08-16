import { useQuery } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
};

type Author = {
  id: string;
  name: string;
  avatar_url?: string;
  profilePicture?: string;
};

export type Post = {
  id: string;
  title: string;
  thumbnail_url: string;
  author: Author;
  createdAt: string;
  categories: Category[];
  content: string;
};

export function usePosts() {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://tech-test-backend.dwsbrazil.io/posts/");
      if (!res.ok) throw new Error("Error to fetch posts");
      return res.json();
    },
  });
}

export function usePost(id?: string) {
  return useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(
        `https://tech-test-backend.dwsbrazil.io/posts/${id}`
      );
      if (!res.ok) throw new Error("Error to fetch post");
      return res.json();
    },
    enabled: !!id,
  });
}
