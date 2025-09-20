import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Users, MapPin, CheckCircle, XCircle, Info, Edit, X, Image } from 'lucide-react';

// Sample data for fallback
const sampleKYCData = [
  {
    kyc_id: 1,
    user_id: 'USER123',
    full_name: 'John Doe',
    dob: '1990-05-15',
    address: '123 Main St, Ranchi, Jharkhand',
    id_proof_number: 'A123456789',
    photo_url: 'https://via.placeholder.com/150',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    kyc_id: 2,
    user_id: 'USER456',
    full_name: 'Jane Smith',
    dob: '1985-08-22',
    address: '456 Park Ave, Mumbai, Maharashtra',
    id_proof_number: 'B987654321',
    photo_url: 'https://via.placeholder.com/150',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// API functions
const fetchKYC = async () => {
  try {
    const response = await fetch('/api/kyc');
    if (!response.ok) throw new Error('Failed to fetch KYC records');
    const data = await response.json();
    return data.length > 0 ? data : sampleKYCData; // Fallback to sample data if empty
  } catch (error) {
    console.error('Error fetching KYC records:', error);
    return sampleKYCData; // Fallback to sample data on error
  }
};

const updateKYC = async (kyc_id, data, file) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (file) formData.append('photo_url', file);
  try {
    const response = await fetch(`/api/kyc/${kyc_id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update KYC record');
    return await response.json();
  } catch (error) {
    console.error('Error updating KYC record:', error);
    throw error;
  }
};

const updateKYCStatus = async (kyc_id, status) => {
  try {
    const response = await fetch(`/api/kyc/${kyc_id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update KYC status');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating KYC status to ${status}:`, error);
    throw error;
  }
};

const VisitorsComponent = () => {
  const location = useLocation();
  const [kycRecords, setKYCRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKYC, setEditingKYC] = useState(null);
  const [photoModal, setPhotoModal] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  // Color variables based on route
  const isGuideRoute = location.pathname === '/dashBoard/guide';
  const isDestinationRoute = location.pathname === '/dashBoard/destination';
  const isHandicraftRoute = location.pathname === '/dashBoard/handicraft';
  const isTouristRoute = location.pathname === '/dashBoard/tourist';
  const textAndStickerColor = isGuideRoute 
    ? 'text-blue-700' 
    : isDestinationRoute 
      ? 'text-green-600' 
      : isHandicraftRoute 
        ? 'text-purple-700' 
        : isTouristRoute 
          ? 'text-teal-700' 
          : 'text-gray-600';
  const backgroundGradient = isGuideRoute 
    ? 'from-green-600 to-blue-600' 
    : isDestinationRoute 
      ? 'from-green-500 to-green-600' 
      : isHandicraftRoute 
        ? 'from-purple-600 to-blue-600' 
        : isTouristRoute 
          ? 'from-teal-600 to-blue-600' 
          : 'from-gray-100 to-gray-200';
  const borderColorLight = isGuideRoute 
    ? 'border-blue-100' 
    : isDestinationRoute 
      ? 'border-green-100' 
      : isHandicraftRoute 
        ? 'border-purple-100' 
        : isTouristRoute 
          ? 'border-teal-100' 
          : 'border-gray-100';
  const borderColorMedium = isGuideRoute 
    ? 'border-blue-200' 
    : isDestinationRoute 
      ? 'border-green-200' 
      : isHandicraftRoute 
        ? 'border-purple-200' 
        : isTouristRoute 
          ? 'border-teal-200' 
          : 'border-gray-200';
  const borderColorDark = isGuideRoute 
    ? 'border-blue-300' 
    : isDestinationRoute 
      ? 'border-green-300' 
      : isHandicraftRoute 
        ? 'border-purple-300' 
        : isTouristRoute 
          ? 'border-teal-300' 
          : 'border-gray-300';
  const modalHeaderGradient = isGuideRoute 
    ? 'from-green-100 to-blue-100' 
    : isDestinationRoute 
      ? 'from-green-100 to-green-100' 
      : isHandicraftRoute 
        ? 'from-purple-100 to-blue-100' 
        : isTouristRoute 
          ? 'from-teal-100 to-blue-100' 
          : 'from-gray-100 to-gray-100';
  const bgGradient = isGuideRoute 
    ? 'from-green-50 to-blue-50' 
    : isDestinationRoute 
      ? 'from-green-50 to-green-50' 
      : isHandicraftRoute 
        ? 'from-purple-50 to-blue-50' 
        : isTouristRoute 
          ? 'from-teal-50 to-blue-50' 
          : 'from-gray-50 to-gray-50';
  const hoverColor = isGuideRoute 
    ? 'hover:text-blue-800' 
    : isDestinationRoute 
      ? 'hover:text-green-800' 
      : isHandicraftRoute 
        ? 'hover:text-purple-800' 
        : isTouristRoute 
          ? 'hover:text-teal-800' 
          : 'hover:text-gray-800';
  const focusRingColor = isGuideRoute 
    ? 'focus:ring-blue-500' 
    : isDestinationRoute 
      ? 'focus:ring-green-500' 
      : isHandicraftRoute 
        ? 'focus:ring-purple-500' 
        : isTouristRoute 
          ? 'focus:ring-teal-500' 
          : 'focus:ring-gray-500';
  const tableHoverBg = isGuideRoute 
    ? 'hover:bg-blue-50' 
    : isDestinationRoute 
      ? 'hover:bg-green-50' 
      : isHandicraftRoute 
        ? 'hover:bg-purple-50' 
        : isTouristRoute 
          ? 'hover:bg-teal-50' 
          : 'hover:bg-gray-50';

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const loadKYCRecords = async () => {
      try {
        const data = await fetchKYC();
        setKYCRecords(data);
      } catch (error) {
        console.error('Error loading KYC records:', error);
        setKYCRecords(sampleKYCData); // Fallback to sample data
      }
    };
    loadKYCRecords();
  }, []);

  const openModal = (kyc = null) => {
    setEditingKYC(kyc);
    setPhotoFile(null);
    if (kyc) {
      reset({
        user_id: kyc.user_id || '',
        full_name: kyc.full_name || '',
        dob: kyc.dob ? new Date(kyc.dob).toISOString().split('T')[0] : '',
        address: kyc.address || '',
        id_proof_number: kyc.id_proof_number || '',
        status: kyc.status || 'pending',
      });
    } else {
      reset({
        user_id: '',
        full_name: '',
        dob: '',
        address: '',
        id_proof_number: '',
        status: 'pending',
      });
    }
    setIsModalOpen(true);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) setPhotoFile(file);
  };

  const onSubmit = async (data) => {
    try {
      let updatedKYC;
      if (editingKYC) {
        updatedKYC = await updateKYC(editingKYC.kyc_id, data, photoFile);
      } else {
        console.log('Create not implemented; updating existing record');
        return;
      }
      setIsModalOpen(false);
      setPhotoFile(null);
      reset();
      const updatedRecords = await fetchKYC();
      setKYCRecords(updatedRecords);
    } catch (error) {
      console.error('Error saving KYC record:', error);
    }
  };

  const handleStatusUpdate = async (kyc_id, status) => {
    try {
      await updateKYCStatus(kyc_id, status);
      const updatedRecords = await fetchKYC();
      setKYCRecords(updatedRecords);
    } catch (error) {
      console.error(`Error updating KYC status to ${status}:`, error);
    }
  };

  const openPhotoModal = (photoUrl) => {
    setPhotoModal(photoUrl);
  };

  return (
    <div className={`container mx-auto p-4 sm:p-6 bg-gradient-to-b ${bgGradient} min-h-screen relative`}>
      {/* Header */}
      <div className="relative flex justify-between items-center mb-6 z-10">
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r ${backgroundGradient}`}>
          Visitors
        </h2>
      </div>

      {/* KYC Table */}
      <div className={`relative bg-white rounded-lg shadow-lg overflow-x-auto border ${borderColorMedium} z-10`}>
        <table className="w-full table-auto">
          <thead className={`bg-gradient-to-r ${backgroundGradient} text-white`}>
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Full Name</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Address</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Photo</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Approval</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kycRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No KYC records found.
                </td>
              </tr>
            ) : (
              kycRecords.map((kyc) => (
                <tr key={kyc.kyc_id} className={`border-b ${borderColorLight} ${tableHoverBg} transition`}>
                  <td className="py-3 px-4 font-medium text-gray-700">{kyc.full_name}</td>
                  <td className="py-3 px-4 text-gray-600">{kyc.address}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${backgroundGradient} text-white`}>
                      {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {kyc.photo_url ? (
                      <button
                        onClick={() => openPhotoModal(kyc.photo_url)}
                        className={`${textAndStickerColor} ${hoverColor} transition`}
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                 
                  <td className="py-3 px-4">
                    {kyc.status === 'pending' ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleStatusUpdate(kyc.kyc_id, 'approved')}
                          className={`${textAndStickerColor} ${hoverColor} transition flex items-center gap-1`}
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(kyc.kyc_id, 'rejected')}
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
                      onClick={() => openModal(kyc)}
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

      {/* Pulsating Users Icon */}
      <div className="flex justify-center items-center mt-4 pointer-events-none">
        <div className="animate-pulse">
          <Users className={`w-32 h-32 ${textAndStickerColor} opacity-20`} />
        </div>
      </div>

      {/* Modal for Update Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex justify-center items-center p-4 sm:p-6">
          <div className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${borderColorMedium}`}>
            <div className={`flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r ${modalHeaderGradient} rounded-t-xl`}>
              <div className="flex items-center gap-2">
                <Users className={`w-6 h-6 ${textAndStickerColor}`} />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Update KYC
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
                <label className="block text-gray-700 font-semibold mb-2">User ID</label>
                <input
                  {...register('user_id', { required: 'User ID is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., USER123"
                />
                {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  {...register('full_name', { required: 'Full name is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., John Doe"
                />
                {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                <input
                  type="date"
                  {...register('dob', { required: 'Date of birth is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., 123 Main St, Ranchi, Jharkhand"
                  rows="4"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">ID Proof Number</label>
                <input
                  {...register('id_proof_number', { required: 'ID proof number is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., A123456789"
                />
                {errors.id_proof_number && <p className="text-red-500 text-sm mt-1">{errors.id_proof_number.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Image className={`w-5 h-5 ${textAndStickerColor}`} />
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                />
                {editingKYC && editingKYC.photo_url && (
                  <button
                    type="button"
                    onClick={() => openPhotoModal(editingKYC.photo_url)}
                    className={`text-sm ${textAndStickerColor} ${hoverColor} mt-1 flex items-center gap-1`}
                  >
                    <Info className="w-4 h-4" />
                    View Current Photo
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Modal */}
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
              alt="KYC Photo"
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

export default VisitorsComponent;