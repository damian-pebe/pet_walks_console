import { Message } from "./app/(routes)/chats/Components/TableChats/TableChats.types";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { Users } from "./components/CustomersTable/CustomersTable.types";

import emailjs from "emailjs-com";
import { Resend } from "resend";

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

export const fetchPremiumUsers = async (): Promise<{
  premium: number;
  standard: number;
}> => {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    let premium = 0,
      standard = 0;

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

export const fetchReports = async () => {
  const reportsCollection = collection(db, "reports");
  const reportsSnapshot = await getDocs(reportsCollection);

  const reports = reportsSnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      sender: data.sender as string,
      reported: data.reported as string,
      reason: data.reason as string,
      type: data.type as string,
      chat: data.chatId,
    };
  });

  return reports;
};

export const getChat = async (
  sender: string,
  reported: string
): Promise<string> => {
  try {
    const chatCollection = collection(db, "chats");
    const chatQuery = query(
      chatCollection,
      where("sender", "==", sender),
      where("reported", "==", reported)
    );

    const chatSnapshot = await getDocs(chatQuery);

    if (!chatSnapshot.empty) {
      const chatDoc = chatSnapshot.docs[0];
      return chatDoc.id;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error fetching chat:", error);
    return "";
  }
};

export const newChat = async (
  sender: string,
  reported: string
): Promise<string> => {
  try {
    const existingChatId = await getChat(sender, reported);

    if (existingChatId) {
      return existingChatId;
    }

    const chatCollection = collection(db, "chats");
    const newChatDoc = await addDoc(chatCollection, {
      sender,
      reported,
      messages: [],
    });

    return newChatDoc.id;
  } catch (error) {
    console.error("Error creating new chat:", error);
    return "";
  }
};

export const fetchUserByEmail = async (userEmail: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { ...userDoc.data(), id: userDoc.id };
  } else {
    console.log("No document found!");
    return null;
  }
};

export const getUserIdByEmail = async (
  email: string
): Promise<string | null> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.id; // Return the uid
    } else {
      console.log("No user found with that email.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user ID");
  }
};

export const disableUserTemporarily = async (
  email: string,
  durationInDays: number
) => {
  try {
    const uid = await getUserIdByEmail(email);
    if (!uid) {
      throw new Error("User ID not found");
    }

    const disableUntil = Timestamp.fromMillis(
      Date.now() + durationInDays * 24 * 60 * 60 * 1000
    );

    const userDocRef = doc(db, "disabledUsers", uid);
    await setDoc(userDocRef, {
      disableUntil,
    });

    const userAuthRef = doc(db, "users", uid);
    await updateDoc(userAuthRef, {
      disabled: true,
    });
  } catch (error) {
    throw new Error("Failed to disable user temporarily");
  }
};
export const disableUserForever = async (email: string) => {
  try {
    const uid = await getUserIdByEmail(email);
    if (!uid) {
      throw new Error("User ID not found");
    }

    const userAuthRef = doc(db, "users", uid);
    await updateDoc(userAuthRef, {
      disabled: true,
    });
  } catch (error) {
    throw new Error("Failed to disable user temporarily");
  }
};

export const deleteCompany = async (uid: string) => {
  try {
    if (!uid) {
      throw new Error("User ID not found");
    }
    const userAuthRef = doc(db, "business", uid);
    await deleteDoc(userAuthRef);
  } catch (error) {
    throw new Error("Failed to disable user temporarily");
  }
};

export const deleteUser = async (email: string) => {
  try {
    const uid = await getUserIdByEmail(email);
    if (!uid) {
      throw new Error("User ID not found");
    }

    const userAuthRef = doc(db, "users", uid);
    await deleteDoc(userAuthRef);
  } catch (error) {
    throw new Error("Failed to disable user temporarily");
  }
};

export const fetchINEByEmail = async (email: string) => {
  try {
    const userCollection = collection(db, "users");
    const userQuery = query(userCollection, where("email", "==", email));

    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();

      return userData.ine ? userData.ine : "";
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error fetching chat:", error);
    return "";
  }
};

export const fetchAddressProofByEmail = async (email: string) => {
  try {
    const userCollection = collection(db, "users");
    const userQuery = query(userCollection, where("email", "==", email));

    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();

      return userData.addressProof ? userData.addressProof : "";
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error fetching chat:", error);
    return "";
  }
};

export const fetchAgreement = async () => {
  try {
    const reportsCollection = collection(db, "users");
    const reportsQuery = query(
      reportsCollection,
      where("docs", "==", "inCheck")
    );

    const reportsSnapshot = await getDocs(reportsQuery);

    if (!reportsSnapshot.empty) {
      const users = reportsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          email: data.email as string,
          ine: data.ine as string,
          addressProof: data.addressProof as string,
        };
      });

      return users; // Return all users with 'inCheck' status
    } else {
      return []; // Return an empty array if no documents found
    }
  } catch (error) {
    console.error("Error fetching agreements:", error);
    return [];
  }
};


export const updateUserDocs = async (docs: string, email: string) => {
  try {
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));

    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0].ref; 
      await updateDoc(userDoc, {
        docs: docs, 
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error updating user docs:", error);
    throw error;
  }
};


export const deleteReport = async (sender: string, reported: string) => {
  try {
    const reportsCollection = collection(db, "business");
    const reportsQuery = query(
      reportsCollection, 
      where('sender', '==', sender), 
      where('reported', '==', reported)
    );

    const reportsSnapshot = await getDocs(reportsQuery);

    if (!reportsSnapshot.empty) {
      const batch = writeBatch(db); 

      reportsSnapshot.forEach((doc) => {
        batch.delete(doc.ref); 
      });

      await batch.commit(); 
      console.log("All matching reports deleted successfully.");
    } else {
      console.log("No matching reports found.");
    }
  } catch (error) {
    console.error("Failed to delete reports:", error);
    throw new Error("Failed to delete reports.");
  }
};
