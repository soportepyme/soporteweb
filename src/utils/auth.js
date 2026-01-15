import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const checkAdminStatus = async (user) => {
  if (!user) return false;
  try {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().role === 'admin';
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
