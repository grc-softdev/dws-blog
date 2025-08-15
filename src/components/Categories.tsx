import { useQuery } from "@tanstack/react-query";

const Categories = () => {
    const fetchCategories = async () => {
        const response = await fetch(
          "https://tech-test-backend.dwsbrazil.io/categories/"
        );
        if (!response.ok) {
          throw new Error("Error to search categories");
        }
        return response.json();
      };

    //   const useCategoryById = (id) => {
    //     return useQuery({
    //       queryKey: ['category', id],
    //       queryFn: async () => {
    //         const res = await fetch(`https://tech-test-backend.dwsbrazil.io/categories/${id}`);
    //         if (!res.ok) throw new Error('Erro ao buscar categoria');
    //         return res.json();
    //       },
    //       enabled: !!id, 
    //     });
    //   }
    
      const { data, error, isLoading, isError, isFetching } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5,
      });
    
      if (isLoading) return <div>Loading Categories...</div>;
      if (isError) return <div>Error: {error.message}</div>;


    
      return (
        <div>
          {isFetching && <span>Loading...</span>}
          
            {data.map((category: any) => (
              <div key={category.id}>{category.name}</div>
            ))}
         
        </div>
      );
}

export default Categories