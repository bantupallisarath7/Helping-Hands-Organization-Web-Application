import { useState } from "react";
import { MdEdit } from "react-icons/md";

const BankDetails = ({ isAdmin }) => {
  const [editingField, setEditingField] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    bankName: "State Bank of India",
    accountName: "Helping Hands Organization",
    accountNumber: "123456789012",
    ifscCode: "SBIN0001234",
    branch: "RGUKT Ongole Campus",
  });

  const handleChange = (field, value) => {
    setBankDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditingField(null);
  };

  return (
    <div className="bg-red-100 p-6 rounded shadow">
      <h3 className="text-xl font-semibold text-red-900 mb-4">Bank Transfer</h3>
      <ul className="space-y-2 text-gray-800">
        {[
          { label: "Bank Name", key: "bankName" },
          { label: "Account Name", key: "accountName" },
          { label: "Account Number", key: "accountNumber" },
          { label: "IFSC Code", key: "ifscCode" },
          { label: "Branch", key: "branch" },
        ].map(({ label, key }) => (
          <li key={key} className="flex justify-between items-center">
            <div className="flex-1">
              <strong>{label}:</strong>{" "}
              {editingField === key ? (
                <input
                  type="text"
                  value={bankDetails[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onBlur={handleSave}
                  autoFocus
                  className="px-2 py-1 w-full max-w-xs"
                />
              ) : (
                <span>{bankDetails[key]}</span>
              )}
            </div>
            {isAdmin && (<button
              onClick={() => setEditingField(key)}
              className="text-red-700 hover:text-red-900 p-2 bg-white rounded-full shadow"
              title={`Edit ${label}`}
            >
              <MdEdit />
            </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankDetails;