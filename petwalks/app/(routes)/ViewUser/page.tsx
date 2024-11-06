"use client"; // Ensure this is a client-side component
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  deleteUser,
  disableUserTemporarily,
  fetchUserByEmail,
} from "../../../firebaseFunctions";
import RatingStars from "@/components/RatingStars/RatingStars";
import { X } from "lucide-react";

import { Divider } from "@mui/material";
import { Button } from "@/components/ui/button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BlockIcon from "@mui/icons-material/Block";
import { useToast } from "@/hooks/use-toast";
export default function PreviewUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const userEmail = searchParams.get("Email");
  const router = useRouter();


  const handleDeleteClick = (userEmail: string) => {
    const router = useRouter();
    const { toast } = useToast();
  
    return async () => {
      try {
        await deleteUser(userEmail!); 
        toast({
          title: "User Deleted",
          description: `User ${userEmail} has been successfully deleted.`,
        });
        router.back(); 
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an issue deleting the user.",
        });
      }
    };
  };
  const handleDisableClick = (userEmail: string) => {
    const router = useRouter();
    const { toast } = useToast();
  
    return async () => {
      try {
        await disableUserTemporarily(userEmail!, 3); 
        toast({
          title: "User Deleted",
          description: `User ${userEmail} has been successfully deleted.`,
        });
        router.back(); 
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an issue deleting the user.",
        });
      }
    };
  };

  useEffect(() => {
    const getUser = async () => {
      if (userEmail) {
        const userData = await fetchUserByEmail(userEmail);
        setUser(userData);
        setLoading(false);
      }
    };
    getUser();
  }, [userEmail]);

  const getAverageRating = (ratings: (number | string)[]) => {
    if (ratings.length === 0) return 0;
    const numericRatings = ratings.map((rating) =>
      typeof rating === "string" ? parseFloat(rating) : rating
    );
    const total = numericRatings.reduce((acc, rating) => acc + rating, 0);
    return total / numericRatings.length;
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!user) return <div className="text-center p-5">User not found</div>;

  const averageRating = getAverageRating(user.rating);

  return (
    <div className="shadow-sm bg-background rounded-lg p-6 hover:shadow-lg transition relative">
      <h1 className="text-3xl font-semibold mb-4 uppercase">{user.name}</h1>
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="absolute top-4 right-4 text-gray-500 hover:text-black transition-transform transform hover:scale-150 duration-700 ease-in-out hover:z-20"
      >
        <X className="w-6 h-6" />
      </Button>

      {user.premium === "active" && (
        <p className="text-lg font-semibold text-black bg-green-100 px-4 py-1 rounded-full shadow-md ">
          Premium User
        </p>
      )}

      <div className="flex flex-wrap gap-4 mb-6 pt-3">
        {user.profilePhoto && (
          <img
            key={user.profilePhoto}
            src={user.profilePhoto}
            alt={user.profilePhoto}
            className="w-60 h-60 object-cover rounded-lg shadow-sm transition-transform transform hover:scale-150 duration-700 ease-in-out hover:z-20"
          />
        )}
      </div>

      <Divider />

      <div className="space-y-3 flex-1">
        <p className="text-lg">
          <strong>Address:</strong> {user.address}
        </p>
        <p className="text-lg">
          <strong>Phone number:</strong> {user.phone}
        </p>
        <p className="text-lg flex items-center">
          <strong>Rating:</strong>
          <span className="ml-2 text-yellow-500">
            <RatingStars rating={averageRating} />
          </span>
        </p>
        <p className="text-lg">
          <strong>Name:</strong> {user.name}
        </p>

        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="destructive"
          className="px-20 py-6 rounded-md transition-transform transform hover:scale-125 duration-700 ease-in-out hover:z-20"
          onClick={() => handleDisableClick(userEmail!)}
        >
          <BlockIcon />
        </Button>

        <Button
          variant="destructive"
          className="px-20 py-6  rounded-md transition-transform transform hover:scale-125 duration-700 ease-in-out hover:z-20"
          onClick={() => handleDeleteClick(userEmail!)}
        >
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
}
