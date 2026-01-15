
import { useState, useEffect } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button, Input, Spinner, Switch } from '@nextui-org/react';

const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Cargar el horario existente de Firestore
  const [value, loading, error] = useDocument(doc(db, 'horarios', 'general'));

  useEffect(() => {
    if (value && value.exists()) {
      setSchedule(value.data());
    } else {
      // Si no existe, inicializa un horario por defecto
      const defaultSchedule = daysOfWeek.reduce((acc, day) => ({
        ...acc,
        [day]: { activo: true, inicio: '09:00', fin: '18:00' }
      }), {});
      setSchedule(defaultSchedule);
    }
  }, [value]);

  const handleTimeChange = (day, field, time) => {
    setSchedule(prev => ({ ...prev, [day]: { ...prev[day], [field]: time } }));
  };

  const handleActiveChange = (day, activo) => {
    setSchedule(prev => ({ ...prev, [day]: { ...prev[day], activo } }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'horarios', 'general'), schedule, { merge: true });
      alert('¡Horario guardado con éxito!');
    } catch (err) {
      console.error("Error al guardar el horario: ", err);
      alert('Hubo un error al guardar el horario.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <Spinner label="Cargando horario..." />;
  if (error) return <p className="text-red-500">Error al cargar el horario.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestionar Horarios de Trabajo</h2>
      <div className="space-y-4 p-4 border rounded-lg">
        {daysOfWeek.map((day) => (
          <div key={day} className="grid grid-cols-4 items-center gap-4">
            <label className="capitalize font-medium">{day}</label>
            <Switch 
              isSelected={schedule[day]?.activo || false}
              onChange={() => handleActiveChange(day, !schedule[day]?.activo)}
            >
              {schedule[day]?.activo ? 'Abierto' : 'Cerrado'}
            </Switch>
            <Input 
              type="time" 
              label="Hora de Inicio" 
              value={schedule[day]?.inicio || ''}
              onChange={(e) => handleTimeChange(day, 'inicio', e.target.value)}
              isDisabled={!schedule[day]?.activo}
            />
            <Input 
              type="time" 
              label="Hora de Fin" 
              value={schedule[day]?.fin || ''}
              onChange={(e) => handleTimeChange(day, 'fin', e.target.value)}
              isDisabled={!schedule[day]?.activo}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleSave} color="primary" isLoading={isSaving} className="mt-4">
        {isSaving ? 'Guardando...' : 'Guardar Horario'}
      </Button>
    </div>
  );
}
