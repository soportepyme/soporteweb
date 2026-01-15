
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../firebase';
import imageCompression from 'browser-image-compression';

function BookingForm() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [scheduledDate, setScheduledDate] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert('Please login to book an appointment');
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };

    const compressedPhotos = await Promise.all(
      photos.map((photo) => imageCompression(photo, options))
    );

    const photoUrls = await Promise.all(
      compressedPhotos.map(async (photo) => {
        const storageRef = ref(storage, `appointments/${auth.currentUser.uid}/${photo.name}`);
        await uploadBytes(storageRef, photo);
        return getDownloadURL(storageRef);
      })
    );

    const docRef = await addDoc(collection(db, 'appointments'), {
      clientId: auth.currentUser.uid,
      vehicle: { brand, model, year },
      issue: { description, photoUrls },
      status: 'pending',
      payment: { estimated: 0, final: 0, isPaid: false },
      dates: { created: new Date(), scheduled: new Date(scheduledDate), completed: null },
    });

    navigate(`/confirmation/${docRef.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} className="w-full p-2 border" />
      <input type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} className="w-full p-2 border" />
      <input type="text" placeholder="Year" onChange={(e) => setYear(e.target.value)} className="w-full p-2 border" />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border" />
      <input type="file" multiple onChange={handleImageChange} className="w-full" />
      <input type="date" onChange={(e) => setScheduledDate(e.target.value)} className="w-full p-2 border" />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white">Book Appointment</button>
    </form>
  );
}

export default BookingForm;
