
import { useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { QrReader } from '@yudiel/react-qr-scanner';

function AdminScanner() {
  const [appointment, setAppointment] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = async (result) => {
    if (result) {
      setScanning(false);
      const docRef = doc(db, 'appointments', result.text);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAppointment({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert('No such document!');
      }
    }
  };

  const updateStatus = async (status) => {
    if (appointment) {
      const docRef = doc(db, 'appointments', appointment.id);
      await updateDoc(docRef, { status });
      setAppointment({ ...appointment, status });
    }
  };

  const openWhatsApp = () => {
    const text = `Vehicle: ${appointment.vehicle.brand} ${appointment.vehicle.model} - Issue: ${appointment.issue.description} - Photos: ${appointment.issue.photoUrls.join(', ')}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }

  return (
    <div>
      <button onClick={() => setScanning(!scanning)} className="p-2 bg-blue-600 text-white">{scanning ? 'Close Scanner' : 'Scan QR'}</button>
      {scanning && (
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: 'environment' }}
        />
      )}
      {appointment && (
        <div className="mt-4 p-4 border">
          <p>Brand: {appointment.vehicle.brand}</p>
          <p>Model: {appointment.vehicle.model}</p>
          <p>Description: {appointment.issue.description}</p>
          <p>Status: {appointment.status}</p>
          <button onClick={() => updateStatus('in_shop')} className="p-2 bg-green-600 text-white">Admit Vehicle</button>
          <button onClick={openWhatsApp} className="p-2 bg-yellow-500 text-black">WhatsApp Mechanic</button>
        </div>
      )}
    </div>
  );
}

export default AdminScanner;
