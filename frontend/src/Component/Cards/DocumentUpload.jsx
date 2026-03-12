import axios from "axios";
import { toast } from "react-toastify";

const DocumentUpload = ({ campaignId, formField, setFormField }) => {

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("documents", file));

    try {
      const res = await axios.post(`http://localhost:8815/campaign/${campaignId}/upload-documents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setFormField((prev) => ({
        ...prev,
        document: [...(prev.document || []), ...res.data.documents],
      }));
      toast.success(res.data.message)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const removeFile = async (indexToRemove) => {
    const fileToDelete = formField.document[indexToRemove];

    try {
      const res = await axios.delete("http://localhost:8815/campaign/delete-document", {
        data: {
          campaignId,
          docUrl: fileToDelete.url,
        },
      });

      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setFormField((prev) => ({
        ...prev,
        document: res.data.documents,
      }));
      toast.success(res.data.message)
    } catch (err) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      <label className="block font-medium text-gray-500 mb-2">Documents</label>
      <input
        type="file"
        multiple
        className="w-full border rounded px-3 py-2"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      {formField.document && formField.document.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          {formField.document.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
            >
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-900 hover:underline"
              >
                {file.name}
              </a>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-800 text-xs font-semibold"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentUpload;