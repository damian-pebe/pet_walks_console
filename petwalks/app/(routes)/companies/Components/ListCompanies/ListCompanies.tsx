"use client"; // Mark this component as a Client Component
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table"; // Make sure this component exists
import { fetchCompanies } from "../../../../../firebaseFunctions";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@mui/material";
import RatingStars from "@/components/RatingStars/RatingStars";

export default function ListCompanies() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Correct use of useRouter in the App Directory

  useEffect(() => {
    const getData = async () => {
      const companyData = await fetchCompanies(); // Function that fetches company data from Firebase
      setCompanies(companyData);
      setLoading(false);
    };

    getData();
  }, []);

  const roundRating = (ratings: number[]) => {
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratings.length;
    return Math.round(average * 2) / 2; // Round to nearest .5
  };

  const columns = [
    {
      accessorKey: "imageUrls",
      header: "Image",
      cell: ({ row }: any) => (
        <img
          src={row.original.imageUrls[0]}
          alt="Business"
          className="w-40 h-40 object-cover rounded-md" // Tailwind utilities for size and fit
        />
      ),
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }: any) => {
        const ratingList = row.original.rating || []; // Assuming 'rating' is an array
        const roundedRating = roundRating(ratingList); // Calculate the rounded average
        return <RatingStars rating={roundedRating} />;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <Button
          color="secondary"
          variant="outlined"
          onClick={() =>
            router.push(
              `/ViewCompany?Id=${row.original.id}`
            )
          }
        >
          Preview
        </Button>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={companies} />
    </div>
  );
}
