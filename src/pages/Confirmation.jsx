
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";

function Confirmation() {
  const { id } = useParams();

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Appointment Confirmed!</h1>
      <p className="mb-4">Your appointment ID is: {id}</p>
      <div style={{ background: 'white', padding: '16px' }}>
        <QRCode value={id} />
      </div>
    </div>
  );
}

export default Confirmation;
