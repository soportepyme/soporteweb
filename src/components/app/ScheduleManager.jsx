
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const daysOfWeekSpanish = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo'
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function ScheduleManager() {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const scheduleRef = doc(db, 'settings', 'workSchedule');

  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const docSnap = await getDoc(scheduleRef);
      if (docSnap.exists()) {
        setSchedule(docSnap.data());
      } else {
        const defaultSchedule = daysOfWeek.reduce((acc, day) => {
          acc[day] = { enabled: false, startTime: '09:00', endTime: '17:00' };
          return acc;
        }, {});
        setSchedule(defaultSchedule);
      }
      setLoading(false);
    };
    getSchedule();
  }, []);

  const handleScheduleChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSaveSchedule = async () => {
    setIsSaving(true);
    try {
      await setDoc(scheduleRef, schedule);
      alert('¡Horario guardado con éxito!');
    } catch (error) {
      console.error("Error al guardar el horario: ", error);
      alert('Error al guardar el horario.');
    }
    setIsSaving(false);
  };

  if (loading && Object.keys(schedule).length === 0) {
    return <p>Cargando horario...</p>;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gestionar Horario de Trabajo</h2>
      <div className="space-y-4">
        {daysOfWeek.map(day => (
          <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 bg-gray-50 rounded-lg border">
            <label className="font-bold text-gray-700 flex items-center">
              <input 
                type="checkbox"
                className="mr-3 h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                checked={schedule[day]?.enabled || false}
                onChange={(e) => handleScheduleChange(day, 'enabled', e.target.checked)}
              /> 
              {daysOfWeekSpanish[day]}
            </label>
            <div className="col-span-2 flex items-center gap-3">
                <input 
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
                    value={schedule[day]?.startTime || '09:00'}
                    disabled={!schedule[day]?.enabled}
                    onChange={(e) => handleScheduleChange(day, 'startTime', e.target.value)}
                />
                <span className="text-gray-500 font-semibold">a</span>
                <input 
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
                    value={schedule[day]?.endTime || '17:00'}
                    disabled={!schedule[day]?.enabled}
                    onChange={(e) => handleScheduleChange(day, 'endTime', e.target.value)}
                />
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={handleSaveSchedule} 
        className="mt-6 w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        disabled={isSaving}
        >
        {isSaving ? 'Guardando...' : 'Guardar Horario'}
      </button>
    </div>
  );
}

export default ScheduleManager;
