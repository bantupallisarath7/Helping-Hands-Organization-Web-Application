import { useState, useRef } from "react";
import { MdEdit } from "react-icons/md";
import QRcode from "../../assets/upi-qr.png";

const UpiSection = ({ isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [upiId, setUpiId] = useState("helpinghands@upi");
  const [qrImage, setQrImage] = useState(QRcode);
  const fileInputRef = useRef();

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setQrImage(reader.result); // base64 image preview
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-red-100 p-6 rounded shadow">
      <h3 className="text-xl font-semibold text-red-900 mb-4">UPI / QR Code</h3>

      <ul className="space-y-2 text-gray-800">
        <li className="flex justify-between items-center">
          <div className="flex-1">
            <strong>UPI ID:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
                className="px-2 py-1 w-full max-w-xs"
              />
            ) : (
              <span>{upiId}</span>
            )}
          </div>
          {!isEditing && isAdmin && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-red-700 hover:text-red-900 p-2 bg-white rounded-full shadow"
              title="Edit UPI ID"
            >
              <MdEdit />
            </button>
          )}
        </li>
      </ul>

      <div className="flex flex-wrap justify-center gap-4 mt-6 relative">
        <div className="text-center">
          <img
            src={qrImage}
            alt="QR Code"
            className="w-32 h-32 mx-auto rounded object-cover"
          />
          <p className="mt-2 text-sm text-gray-700">PhonePe</p>
        </div>

        {isAdmin && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute top-0 right-0 bg-white text-red-700 hover:text-red-900 p-2 rounded-full shadow"
              title="Upload QR Code"
            >
              <MdEdit />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpiSection;