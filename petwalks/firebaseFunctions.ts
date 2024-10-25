import {  Message,
} from "./app/(routes)/chats/Components/TableChats/TableChats.types";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Users } from "./components/CustomersTable/CustomersTable.types";
export const fetchCompanies = async () => {
  const response = await fetch(
    "https://us-central1-petwalks-ef2a9.cloudfunctions.net/db-queries/companies"
  );
  return response.ok ? response.json() : [];
};

export const fetchCompanyById = async (companyId: string) => {
  const response = await fetch(
    `https://us-central1-petwalks-ef2a9.cloudfunctions.net/db-queries/company/${companyId}`
  );
  return response.ok ? response.json() : [];
};

export const fetchChats = async () => {
  const response = await fetch(
    "https://us-central1-petwalks-ef2a9.cloudfunctions.net/db-queries/chats"
  );
  return response.ok ? response.json() : [];
};

export const fetchChatMessages = async (chatId: string) => {
  const chatDoc = doc(db, "chat", chatId);
  const chatData = await getDoc(chatDoc);

  if (chatData.exists()) {
    return { ...chatData.data(), chatId: chatDoc.id };
  } else {
    throw new Error("Chat not found");
  }
};

export const addMessageToChat = async (chatId: string, message: Message) => {
  const chatDoc = doc(db, "chat", chatId);
  const chatData = await getDoc(chatDoc);

  if (chatData.exists()) {
    await updateDoc(chatDoc, {
      messages: arrayUnion(message),
    });

    return { ...chatData.data(), chatId: chatDoc.id };
  } else {
    throw new Error("Chat not found");
  }
};

export const fetchUsers = async (): Promise<Users[]> => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);

  const users: Users[] = usersSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      email: data.email as string,
      reports: data.reports as number,
      profilePhoto: data.profilePhoto as string,
      averageRating: calculateAverageRating(data.rating as number[]),
    };
  });

  return users;
};

const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((acc, rating) => acc + rating, 0);
  return total / ratings.length;
};

export const fetchPremiumUsers = async (): Promise<{ premium: number; standard: number }> => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    let premium = 0, standard = 0;

    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      data.premium === "active" ? premium++ : standard++;
    });

    return { premium, standard };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchWalks = async () => {
  const walksCollection = collection(db, "walks");
  const walksSnapshot = await getDocs(walksCollection);

  const walks = walksSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      ownerEmail: data.ownerEmail as string,
      payMethod: data.payMethod as string,
      pets: data.selectedPets.length as number,
      premium: data.premium as Boolean,
      price: data.price as number,
    };
  });

  return walks;
};