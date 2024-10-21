import { db } from "./firebase"; 
import { collection, getDocs, doc, getDoc} from "firebase/firestore";

export const fetchCompanies = async () => {
  const querySnapshot = await getDocs(collection(db, "business"));  
  const companies: any[] = [];
  querySnapshot.forEach((doc) => {
    companies.push({ ...doc.data(), id: doc.id });
  });
  return companies;
};

export const fetchCompanyById = async (companyId: string) => {
    const docRef = doc(db, "business", companyId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      console.log("No such document!");
      return null;
    }
  };