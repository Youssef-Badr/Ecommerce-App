import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function Wishlist() {
  const queryClient = useQueryClient();

  // Fetch wishlist items
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist");
      return response.data;
    },
  });

  // Remove item from wishlist
  const removeFromWishlist = useMutation({
    mutationFn: async (productId) => {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]); // Refresh data after deletion
    },
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading wishlist...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load wishlist</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-green-500 text-center text-2xl font-semibold mb-6">Your Wishlist</h1>

      {data?.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4 relative">
              <button
                onClick={() => removeFromWishlist.mutate(product._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>

              <Link to={`/product/${product.slug}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <p className="text-center text-lg font-semibold">{product.name}</p>
                <p className="text-center text-gray-600">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
