import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const Gallery = ({ isAdmin }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {

      const res = await axios.get("https://api-hho.onrender.com/admin/gallery/all");
      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setImages(res.data.images);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowLeft" && selectedIndex > 0) {
          setSelectedIndex((prev) => prev - 1);
        } else if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
          setSelectedIndex((prev) => prev + 1);
        } else if (e.key === "Escape") {
          setSelectedIndex(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  const handleDelete = async (index, id) => {
    try {
      const res = await axios.delete(`https://api-hho.onrender.com/admin/gallery/delete/${id}`, { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      const updated = [...images];
      updated.splice(index, 1);
      setImages(updated);
      toast.success(res.data.message);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("https://api-hho.onrender.com/admin/gallery/upload", formData, { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message);
      fetchImages(); // Refresh gallery
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

return (
  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8">

    {/* Heading Section */}
    <div className="max-w-7xl mx-auto mb-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center sm:text-left">
        Our Gallery
      </h2>

      <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1">
        Explore moments from our events, campaigns, and community activities.
      </p>
    </div>

    {/* Image Grid */}
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
      </div>
    ) : images.length === 0 ? (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="text-6xl mb-4">🖼️</div>

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
          No images in the gallery
        </h3>

        <p className="text-sm sm:text-base text-gray-500 max-w-md">
          Images will appear here once the admin uploads them. Please check back later.
        </p>

        <button
          onClick={() => {
            setLoading(true);
            fetchImages();
          }}
          className="mt-6 px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-700 transition shadow"
        >
          Refresh Gallery
        </button>
      </div>
    ) : (
      <div className="max-w-7xl mx-auto">
        <div
          className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:8815${image.imageUrl}`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-40 sm:h-44 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              />

              {/* Delete Button (Admin Only) */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(index, image._id)}
                  className="absolute top-2 right-2 bg-white text-red-700 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition hover:bg-red-700 hover:text-white"
                >
                  <MdDelete className="text-lg" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Floating Upload Button (Admin Only) */}
    {isAdmin && (
      <>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          id="imageUpload"
        />

        <label
          htmlFor="imageUpload"
          className="
          fixed
          bottom-6
          right-6
          bg-red-900
          text-white
          px-5
          py-3
          rounded-full
          shadow-lg
          hover:bg-red-700
          transition
          cursor-pointer
          z-50
          text-sm
          font-medium
        "
        >
          Upload Image
        </label>
      </>
    )}

    {/* Image Modal */}
    {selectedIndex !== null && (
      <div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedIndex(null)}
      >
        <img
          src={`http://localhost:8815${images[selectedIndex].imageUrl}`}
          alt={`Gallery ${selectedIndex + 1}`}
          className="max-w-full max-h-[90vh] rounded-lg shadow-xl"
        />
      </div>
    )}
  </div>
);
};

export default Gallery;