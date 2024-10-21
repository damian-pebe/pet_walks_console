"use client"; // Ensure this is a client-side component
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchCompanyById } from "../../../firebaseFunctions";
import RatingStars from "@/components/RatingStars/RatingStars"; // Import your RatingStars component
import { X } from "lucide-react"; // Importing close icon
import { Divider } from "@mui/material";
import { Button } from "@/components/ui/button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BlockIcon from "@mui/icons-material/Block";
export default function PreviewCompany() {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const companyId = searchParams.get("Id");
  const router = useRouter(); 

  useEffect(() => {
    const getCompany = async () => {
      if (companyId) {
        const companyData = await fetchCompanyById(companyId);
        setCompany(companyData);
        setLoading(false);
      }
    };
    getCompany();
  }, [companyId]);

  // Function to calculate average rating
  const getAverageRating = (ratings: (number | string)[]) => {
    if (ratings.length === 0) return 0;
    const numericRatings = ratings.map((rating) =>
      typeof rating === "string" ? parseFloat(rating) : rating
    );
    const total = numericRatings.reduce((acc, rating) => acc + rating, 0);
    return total / numericRatings.length;
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!company) return <div className="text-center p-5">Company not found</div>;

  // Calculate average rating
  const averageRating = getAverageRating(company.rating);

  return (
    <div className="shadow-sm bg-background rounded-lg p-6 hover:shadow-lg transition relative">
      <h1 className="text-3xl font-semibold mb-4 uppercase">{company.name}</h1>
      <Button
      variant="outline"   
           onClick={() => router.back()} 
        className="absolute top-4 right-4 text-gray-500 hover:text-black transition-transform transform hover:scale-150 duration-700 ease-in-out hover:z-20"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Premium status */}
      {company.premium && (
        <p className="text-lg font-semibold text-white bg-green-600 px-4 py-1 rounded-full shadow-md ">
          Premium Company
        </p>
      )}

      {/* Display multiple images */}
      <div className="flex flex-wrap gap-4 mb-6 pt-3">
        {company.imageUrls.map((url: string, index: number) => (
          <img
            key={index}
            src={url}
            alt={`Company image ${index + 1}`}
            className="w-60 h-60 object-cover rounded-lg shadow-sm transition-transform transform hover:scale-150 duration-700 ease-in-out hover:z-20"
          />
        ))}
      </div>

      <Divider />

      <div className="space-y-3 flex-1">
        <p className="text-lg">
          <strong>Address:</strong> {company.address}
        </p>
        <p className="text-lg">
          <strong>Category:</strong> {company.category}
        </p>
        <p className="text-lg flex items-center">
          <strong>Rating:</strong>
          <span className="ml-2 text-yellow-500">
            <RatingStars rating={averageRating} />
            {/* Use the RatingStars component here */}
          </span>
        </p>
        <p className="text-lg">
          <strong>Description:</strong> {company.description}
        </p>

        <p className="text-lg">
          <strong>Email:</strong> {company.email}
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> {company.phone}
        </p>

        {/* Display comments */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Comments:</h2>
          {company.comments.length > 0 ? (
            <ul className="list-disc ml-5 space-y-2">
              {company.comments.map((comment: string, index: number) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          ) : (
            <p>No comments available</p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="destructive"
          className="px-20 py-6 rounded-md transition-transform transform hover:scale-125 duration-700 ease-in-out hover:z-20"
        >
          <BlockIcon />
        </Button>

        <Button
          variant="destructive"
          className="px-20 py-6  rounded-md transition-transform transform hover:scale-125 duration-700 ease-in-out hover:z-20"
        >
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
}
