
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import AdminScanner from '../components/app/AdminScanner';

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // In a real app, you would get the user's role from Firestore
    // and check if it's 'admin'.
    if (auth.currentUser) {
      // This is a placeholder for checking the admin role.
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {isAdmin ? <AdminScanner /> : <p>You are not authorized to view this page.</p>}
    </div>
  );
}

export default Admin;
