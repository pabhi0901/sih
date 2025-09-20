import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Users, MapPin, CheckCircle, XCircle, Info, Edit, X, Image, Home } from 'lucide-react';

// Sample data for fallback
const sampleHomestayData = [
  {
    id: 1,
    name: 'Amit Sharma',
    contact: '+91 9876543210',
    email: 'amit.sharma@example.com',
    password: 'encrypted_password',
    certificate: 'data:image/jpeg;base64,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',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Priya Singh',
    contact: '+91 8765432109',
    email: 'priya.singh@example.com',
    password: 'encrypted_password',
    certificate: 'https://via.placeholder.com/150?text=Certificate',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// API functions
const fetchHomestays = async () => {
  try {
    const response = await fetch('/api/homestays');
    if (!response.ok) throw new Error('Failed to fetch homestay records');
    const data = await response.json();
    return data.length > 0 ? data : sampleHomestayData; // Fallback to sample data if empty
  } catch (error) {
    console.error('Error fetching homestay records:', error);
    return sampleHomestayData; // Fallback to sample data on error
  }
};

const createHomestay = async (data, file) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (file) formData.append('certificate', file);
  try {
    const response = await fetch('/api/homestays', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create homestay record');
    return await response.json();
  } catch (error) {
    console.error('Error creating homestay record:', error);
    throw error;
  }
};

const updateHomestay = async (id, data, file) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (file) formData.append('certificate', file);
  try {
    const response = await fetch(`/api/homestays/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update homestay record');
    return await response.json();
  } catch (error) {
    console.error('Error updating homestay record:', error);
    throw error;
  }
};

const updateHomestayStatus = async (id, status) => {
  try {
    const response = await fetch(`/api/homestays/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update homestay status');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating homestay status to ${status}:`, error);
    throw error;
  }
};

const HomestaysComponent = () => {
  const location = useLocation();
  const [homestayRecords, setHomestayRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHomestay, setEditingHomestay] = useState(null);
  const [photoModal, setPhotoModal] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);

  // Color variables based on route
  const isGuideRoute = location.pathname === '/dashBoard/guide';
  const isDestinationRoute = location.pathname === '/dashBoard/destination';
  const isHandicraftRoute = location.pathname === '/dashBoard/handicraft';
  const isTouristRoute = location.pathname === '/dashBoard/tourist';
  const isHomestayRoute = location.pathname === '/dashBoard/homestays';

  const textAndStickerColor = isGuideRoute
    ? 'text-blue-700'
    : isDestinationRoute
      ? 'text-green-600'
      : isHandicraftRoute
        ? 'text-purple-700'
        : isTouristRoute || isHomestayRoute
          ? 'text-teal-700'
          : 'text-gray-600';

  const backgroundGradient = isGuideRoute
    ? 'from-green-600 to-blue-600'
    : isDestinationRoute
      ? 'from-green-500 to-green-600'
      : isHandicraftRoute
        ? 'from-purple-600 to-blue-600'
        : isTouristRoute || isHomestayRoute
          ? 'from-teal-600 to-blue-600'
          : 'from-gray-100 to-gray-200';

  const bgGradient = isGuideRoute
    ? 'from-green-50 to-blue-50'
    : isDestinationRoute
      ? 'from-green-50 to-green-50'
      : isHandicraftRoute
        ? 'from-purple-50 to-blue-50'
        : isTouristRoute || isHomestayRoute
          ? 'from-teal-50 to-blue-50'
          : 'from-gray-50 to-gray-50';

  const borderColorLight = isGuideRoute 
    ? 'border-blue-100' 
    : isDestinationRoute 
      ? 'border-green-100' 
      : isHandicraftRoute 
        ? 'border-purple-100' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-100' 
          : 'border-gray-100';

  const borderColorMedium = isGuideRoute 
    ? 'border-blue-200' 
    : isDestinationRoute 
      ? 'border-green-200' 
      : isHandicraftRoute 
        ? 'border-purple-200' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-200' 
          : 'border-gray-200';

  const borderColorDark = isGuideRoute 
    ? 'border-blue-300' 
    : isDestinationRoute 
      ? 'border-green-300' 
      : isHandicraftRoute 
        ? 'border-purple-300' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-300' 
          : 'border-gray-300';

  const modalHeaderGradient = isGuideRoute 
    ? 'from-green-100 to-blue-100' 
    : isDestinationRoute 
      ? 'from-green-100 to-green-100' 
      : isHandicraftRoute 
        ? 'from-purple-100 to-blue-100' 
        : isTouristRoute || isHomestayRoute 
          ? 'from-teal-100 to-blue-100' 
          : 'from-gray-100 to-gray-100';

  const hoverColor = isGuideRoute 
    ? 'hover:text-blue-800' 
    : isDestinationRoute 
      ? 'hover:text-green-800' 
      : isHandicraftRoute 
        ? 'hover:text-purple-800' 
        : isTouristRoute || isHomestayRoute 
          ? 'hover:text-teal-800' 
          : 'hover:text-gray-800';

  const focusRingColor = isGuideRoute 
    ? 'focus:ring-blue-500' 
    : isDestinationRoute 
      ? 'focus:ring-green-500' 
      : isHandicraftRoute 
        ? 'focus:ring-purple-500' 
        : isTouristRoute || isHomestayRoute 
          ? 'focus:ring-teal-500' 
          : 'focus:ring-gray-500';

  const tableHoverBg = isGuideRoute 
    ? 'hover:bg-blue-50' 
    : isDestinationRoute 
      ? 'hover:bg-green-50' 
      : isHandicraftRoute 
        ? 'hover:bg-purple-50' 
        : isTouristRoute || isHomestayRoute 
          ? 'hover:bg-teal-50' 
          : 'hover:bg-gray-50';

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const loadHomestayRecords = async () => {
      try {
        const data = await fetchHomestays();
        setHomestayRecords(data);
      } catch (error) {
        console.error('Error loading homestay records:', error);
        setHomestayRecords(sampleHomestayData);
      }
    };
    loadHomestayRecords();
  }, []);

  const openModal = (homestay = null) => {
    setEditingHomestay(homestay);
    setCertificateFile(null);
    if (homestay) {
      reset({
        name: homestay.name || '',
        contact: homestay.contact || '',
        email: homestay.email || '',
        password: '', // Don't pre-fill password for security
        status: homestay.status || 'pending',
      });
    } else {
      reset({
        name: '',
        contact: '',
        email: '',
        password: '',
        status: 'pending',
      });
    }
    setIsModalOpen(true);
  };

  const handleCertificateChange = (event) => {
    const file = event.target.files[0];
    if (file) setCertificateFile(file);
  };

  const onSubmit = async (data) => {
    try {
      let updatedHomestay;
      if (editingHomestay) {
        updatedHomestay = await updateHomestay(editingHomestay.id, data, certificateFile);
      } else {
        updatedHomestay = await createHomestay(data, certificateFile);
      }
      setIsModalOpen(false);
      setCertificateFile(null);
      reset();
      const updatedRecords = await fetchHomestays();
      setHomestayRecords(updatedRecords);
    } catch (error) {
      console.error('Error saving homestay record:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateHomestayStatus(id, status);
      const updatedRecords = await fetchHomestays();
      setHomestayRecords(updatedRecords);
    } catch (error) {
      console.error(`Error updating homestay status to ${status}:`, error);
    }
  };

  const openPhotoModal = (certificateUrl) => {
    setPhotoModal(certificateUrl);
  };

  return (
    <div className={`container mx-auto p-4 sm:p-6 bg-gradient-to-b ${bgGradient} min-h-screen relative`}>
      {/* Header */}
      <div className="relative flex justify-between items-center mb-6 z-10">
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r ${backgroundGradient}`}>
          Homestays
        </h2>
        <button
          onClick={() => openModal()}
          className={`px-4 py-2 bg-gradient-to-r ${backgroundGradient} text-white rounded-lg ${hoverColor} transition shadow-md`}
        >
          Add Homestay
        </button>
      </div>

      {/* Homestay Table */}
      <div className={`relative bg-white rounded-lg shadow-lg overflow-x-auto border ${borderColorMedium} z-10`}>
        <table className="w-full table-auto">
          <thead className={`bg-gradient-to-r ${backgroundGradient} text-white`}>
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Name</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Contact</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Email</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Certificate</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Approval</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {homestayRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No homestay records found.
                </td>
              </tr>
            ) : (
              homestayRecords.map((homestay) => (
                <tr key={homestay.id} className={`border-b ${borderColorLight} ${tableHoverBg} transition`}>
                  <td className="py-3 px-4 font-medium text-gray-700">{homestay.name}</td>
                  <td className="py-3 px-4 text-gray-600">{homestay.contact}</td>
                  <td className="py-3 px-4 text-gray-600">{homestay.email}</td>
                  <td className="py-3 px-4">
                    {homestay.certificate ? (
                      <button
                        onClick={() => openPhotoModal(homestay.certificate)}
                        className={`${textAndStickerColor} ${hoverColor} transition`}
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${backgroundGradient} text-white`}>
                      {homestay.status.charAt(0).toUpperCase() + homestay.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {homestay.status === 'pending' ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleStatusUpdate(homestay.id, 'approved')}
                          className={`${textAndStickerColor} ${hoverColor} transition flex items-center gap-1`}
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(homestay.id, 'rejected')}
                          className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => openModal(homestay)}
                      className={`${textAndStickerColor} ${hoverColor} transition`}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pulsating Home Icon */}
      <div className="flex justify-center items-center mt-4 pointer-events-none">
        <div className="animate-pulse">
          <Home className={`w-32 h-32 ${textAndStickerColor} opacity-20`} />
        </div>
      </div>

      {/* Modal for Add/Update Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex justify-center items-center p-4 sm:p-6">
          <div className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${borderColorMedium}`}>
            <div className={`flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r ${modalHeaderGradient} rounded-t-xl`}>
              <div className="flex items-center gap-2">
                <Home className={`w-6 h-6 ${textAndStickerColor}`} />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {editingHomestay ? 'Update Homestay' : 'Add Homestay'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-teal-200 transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={`p-4 sm:p-6 space-y-6 bg-gradient-to-b ${bgGradient}`}>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., Amit Sharma"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Contact</label>
                <input
                  {...register('contact', { 
                    required: 'Contact is required',
                    pattern: { 
                      value: /^\+?[1-9]\d{1,14}$/, 
                      message: 'Invalid phone number' 
                    }
                  })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., +91 9876543210"
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { 
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                      message: 'Invalid email address' 
                    }
                  })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., amit.sharma@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  {...register('password', { 
                    required: editingHomestay ? false : 'Password is required',
                    minLength: { 
                      value: 6, 
                      message: 'Password must be at least 6 characters' 
                    }
                  })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder={editingHomestay ? 'Leave blank to keep unchanged' : 'Enter password'}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Image className={`w-5 h-5 ${textAndStickerColor}`} />
                  Certificate
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCertificateChange}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                />
                {editingHomestay && editingHomestay.certificate && (
                  <button
                    type="button"
                    onClick={() => openPhotoModal(editingHomestay.certificate)}
                    className={`text-sm ${textAndStickerColor} ${hoverColor} mt-1 flex items-center gap-1`}
                  >
                    <Info className="w-4 h-4" />
                    View Current Certificate
                  </button>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Status</label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
              </div>
              <div className={`flex justify-end gap-3 pt-4 border-t ${borderColorMedium}`}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-gradient-to-r ${backgroundGradient} text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition shadow-md`}
                >
                  {editingHomestay ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Photo Modal */}
      {photoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4">
          <div className="relative w-full h-full flex justify-center items-center">
            <button
              onClick={() => setPhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            <img
              src={photoModal}
              alt="Certificate"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomestaysComponent;