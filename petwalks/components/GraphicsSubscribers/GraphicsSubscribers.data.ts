import { db } from "@/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

export const fetchTypeWalks = async (): Promise<{ distributors: { travel: number, walk: number, t: Timestamp }[] }> => {
  try {
    const usersCollection = collection(db, "walksDistribution");
    const usersSnapshot = await getDocs(usersCollection);
    
    const array: {
      travel: any; walk: any; t: any; 
    }[] = [];

    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      array.push({
        travel: data.travel, 
        walk: data.walk, 
        t: data.t 
      });
    });

    return { distributors: array };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};