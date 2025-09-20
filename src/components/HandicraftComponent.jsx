import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { Palette, MapPin, Clock, CheckCircle, XCircle, Info, Plus, Edit, Trash2, X, Image } from 'lucide-react';

// API functions
const fetchHandicrafts = async () => {
  try {
    const response = await fetch('/api/handicrafts');
    if (!response.ok) throw new Error('Failed to fetch handicrafts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching handicrafts:', error);
    return [];
  }
};

const createHandicraft = async (data, file) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (file) formData.append('certification_url', file);
  try {
    const response = await fetch('/api/handicrafts', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create handicraft');
    return await response.json();
  } catch (error) {
    console.error('Error creating handicraft:', error);
    throw error;
  }
};

const updateHandicraft = async (id, data, file) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (file) formData.append('certification_url', file);
  try {
    const response = await fetch(`/api/handicrafts/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update handicraft');
    return await response.json();
  } catch (error) {
    console.error('Error updating handicraft:', error);
    throw error;
  }
};

const updateHandicraftStatus = async (id, status) => {
  try {
    const response = await fetch(`/api/handicrafts/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update handicraft status');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating handicraft status to ${status}:`, error);
    throw error;
  }
};

const deleteHandicraft = async (id) => {
  try {
    const response = await fetch(`/api/handicrafts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete handicraft');
    return await response.json();
  } catch (error) {
    console.error('Error deleting handicraft:', error);
    throw error;
  }
};

const HandicraftComponent = () => {
  const location = useLocation();
  const [handicrafts, setHandicrafts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHandicraft, setEditingHandicraft] = useState(null);
  const [certImageModal, setCertImageModal] = useState(null);
  const [certificationFile, setCertificationFile] = useState(null);

  // Color variables based on route
  const isGuideRoute = location.pathname === '/dashBoard/guide';
  const isDestinationRoute = location.pathname === '/dashBoard/destination';
  const isHandicraftRoute = location.pathname === '/dashBoard/handicraft';
  const textAndStickerColor = isGuideRoute 
    ? 'text-blue-700' 
    : isDestinationRoute 
      ? 'text-green-600' 
      : isHandicraftRoute 
        ? 'text-purple-700' 
        : 'text-gray-600';
  const backgroundGradient = isGuideRoute 
    ? 'from-green-600 to-blue-600' 
    : isDestinationRoute 
      ? 'from-green-500 to-green-600' 
      : isHandicraftRoute 
        ? 'from-purple-600 to-blue-600' 
        : 'from-gray-100 to-gray-200';
  const borderColorLight = isGuideRoute 
    ? 'border-blue-100' 
    : isDestinationRoute 
      ? 'border-green-100' 
      : isHandicraftRoute 
        ? 'border-purple-100' 
        : 'border-gray-100';
  const borderColorMedium = isGuideRoute 
    ? 'border-blue-200' 
    : isDestinationRoute 
      ? 'border-green-200' 
      : isHandicraftRoute 
        ? 'border-purple-200' 
        : 'border-gray-200';
  const borderColorDark = isGuideRoute 
    ? 'border-blue-300' 
    : isDestinationRoute 
      ? 'border-green-300' 
      : isHandicraftRoute 
        ? 'border-purple-300' 
        : 'border-gray-300';
  const modalHeaderGradient = isGuideRoute 
    ? 'from-green-100 to-blue-100' 
    : isDestinationRoute 
      ? 'from-green-100 to-green-100' 
      : isHandicraftRoute 
        ? 'from-purple-100 to-blue-100' 
        : 'from-gray-100 to-gray-100';
  const bgGradient = isGuideRoute 
    ? 'from-green-50 to-blue-50' 
    : isDestinationRoute 
      ? 'from-green-50 to-green-50' 
      : isHandicraftRoute 
        ? 'from-purple-50 to-blue-50' 
        : 'from-gray-50 to-gray-50';
  const hoverColor = isGuideRoute 
    ? 'hover:text-blue-800' 
    : isDestinationRoute 
      ? 'hover:text-green-800' 
      : isHandicraftRoute 
        ? 'hover:text-purple-800' 
        : 'hover:text-gray-800';
  const focusRingColor = isGuideRoute 
    ? 'focus:ring-blue-500' 
    : isDestinationRoute 
      ? 'focus:ring-green-500' 
      : isHandicraftRoute 
        ? 'focus:ring-purple-500' 
        : 'focus:ring-gray-500';
  const tableHoverBg = isGuideRoute 
    ? 'hover:bg-blue-50' 
    : isDestinationRoute 
      ? 'hover:bg-green-50' 
      : isHandicraftRoute 
        ? 'hover:bg-purple-50' 
        : 'hover:bg-gray-50';

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm();
  const { fields: handicraftNameFields, append: appendHandicraftName, remove: removeHandicraftName } = useFieldArray({
    control,
    name: 'handicraft_names',
  });

  useEffect(() => {
    const loadHandicrafts = async () => {
      try {
        const data = await fetchHandicrafts();
        setHandicrafts(data);
      } catch (error) {
        console.error('Error fetching handicrafts:', error);
      }
    };
    loadHandicrafts();
  }, []);

  const openModal = (handicraft = null) => {
    setEditingHandicraft(handicraft);
    setCertificationFile(null);
    if (handicraft) {
      reset({
        shop_name: handicraft.shop_name || '',
        address: handicraft.address || '',
        handicraft_names: (handicraft.handicraft_names || []).map((value) => ({ value })),
        description: handicraft.description || '',
        operating_hours: handicraft.operating_hours || '',
        status: handicraft.status || 'pending',
      });
    } else {
      reset({
        shop_name: '',
        address: '',
        handicraft_names: [],
        description: '',
        operating_hours: '',
        status: 'pending',
      });
    }
    setIsModalOpen(true);
  };

  const handleCertificationChange = (event) => {
    const file = event.target.files[0];
    if (file) setCertificationFile(file);
  };

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        handicraft_names: data.handicraft_names ? data.handicraft_names.map((item) => item.value) : [],
      };
      let updatedHandicraft;
      if (editingHandicraft) {
        updatedHandicraft = await updateHandicraft(editingHandicraft._id, formattedData, certificationFile);
      } else {
        updatedHandicraft = await createHandicraft(formattedData, certificationFile);
      }
      setIsModalOpen(false);
      setCertificationFile(null);
      reset();
      const updatedHandicrafts = await fetchHandicrafts();
      setHandicrafts(updatedHandicrafts);
    } catch (error) {
      console.error('Error saving handicraft:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateHandicraftStatus(id, status);
      const updatedHandicrafts = await fetchHandicrafts();
      setHandicrafts(updatedHandicrafts);
    } catch (error) {
      console.error(`Error updating handicraft status to ${status}:`, error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this handicraft?')) {
      try {
        await deleteHandicraft(id);
        const updatedHandicrafts = await fetchHandicrafts();
        setHandicrafts(updatedHandicrafts);
      } catch (error) {
        console.error('Error deleting handicraft:', error);
      }
    }
  };

  const openCertImageModal = (imageUrl) => {
    setCertImageModal(imageUrl);
  };

  return (
    <div className={`container mx-auto p-4 sm:p-6 bg-gradient-to-b ${bgGradient} min-h-screen relative`}>
      {/* Header */}
      <div className="relative flex justify-between items-center mb-6 z-10">
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r ${backgroundGradient}`}>
          Handicrafts
        </h2>
        <button
          onClick={() => openModal()}
          className={`flex items-center gap-2 bg-gradient-to-r ${backgroundGradient} text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-md`}
        >
          <Plus className="w-5 h-5" />
          Add Handicraft
        </button>
      </div>

      {/* Handicrafts Table */}
      <div className={`relative bg-white rounded-lg shadow-lg overflow-x-auto border ${borderColorMedium} z-10`}>
        <table className="w-full table-auto">
          <thead className={`bg-gradient-to-r ${backgroundGradient} text-white`}>
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Shop Name</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Address</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Items</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Operating Hours</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Certification</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Approval</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {handicrafts.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-500">
                  No handicrafts found.
                </td>
              </tr>
            ) : (
              handicrafts.map((handicraft) => (
                <tr key={handicraft._id} className={`border-b ${borderColorLight} ${tableHoverBg} transition`}>
                  <td className="py-3 px-4 font-medium text-gray-700">{handicraft.shop_name}</td>
                  <td className="py-3 px-4 text-gray-600">{handicraft.address}</td>
                  <td className="py-3 px-4 text-gray-600">{handicraft.handicraft_names.join(', ')}</td>
                  <td className="py-3 px-4 text-gray-600">{handicraft.operating_hours}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${backgroundGradient} text-white`}>
                      {handicraft.status.charAt(0).toUpperCase() + handicraft.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {handicraft.certification_url ? (
                      <button
                        onClick={() => openCertImageModal(handicraft.certification_url)}
                        className={`${textAndStickerColor} ${hoverColor} transition`}
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {handicraft.status === 'pending' ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleStatusUpdate(handicraft._id, 'approved')}
                          className={`${textAndStickerColor} ${hoverColor} transition flex items-center gap-1`}
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(handicraft._id, 'rejected')}
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
                      onClick={() => openModal(handicraft)}
                      className={`${textAndStickerColor} ${hoverColor} transition`}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(handicraft._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pulsating Palette Icon (Outside Table) */}
      <div className="flex justify-center items-center mt-4 pointer-events-none">
        <div className="animate-pulse">
          <Palette className={`w-32 h-32 ${textAndStickerColor} opacity-20`} />
        </div>
      </div>

      {/* Modal for Create/Update Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex justify-center items-center p-4 sm:p-6">
          <div className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${borderColorMedium}`}>
            <div className={`flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r ${modalHeaderGradient} rounded-t-xl`}>
              <div className="flex items-center gap-2">
                <Palette className={`w-6 h-6 ${textAndStickerColor}`} />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {editingHandicraft ? 'Update Handicraft' : 'Create Handicraft'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-purple-200 transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={`p-4 sm:p-6 space-y-6 bg-gradient-to-b ${bgGradient}`}>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Palette className={`w-5 h-5 ${textAndStickerColor}`} />
                  Shop Name
                </label>
                <input
                  {...register('shop_name', { required: 'Shop name is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., Tribal Art Hub"
                />
                {errors.shop_name && <p className="text-red-500 text-sm mt-1">{errors.shop_name.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <MapPin className={`w-5 h-5 ${textAndStickerColor}`} />
                  Address
                </label>
                <input
                  {...register('address', { required: 'Address is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., Main Road, Ranchi, Jharkhand"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Handicraft Items</label>
                {handicraftNameFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <input
                      {...register(`handicraft_names.${index}.value`, { required: 'Handicraft name is required' })}
                      className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                      placeholder="e.g., Bamboo Baskets"
                    />
                    <button
                      type="button"
                      onClick={() => removeHandicraftName(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendHandicraftName({ value: '' })}
                  className={`${textAndStickerColor} ${hoverColor} flex items-center gap-1 mt-2 font-medium`}
                >
                  <Plus className="w-4 h-4" /> Add Handicraft Item
                </button>
                {errors.handicraft_names && errors.handicraft_names.map((error, index) => error?.value && (
                  <p key={index} className="text-red-500 text-sm mt-1">{error.value.message}</p>
                ))}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., Authentic tribal handicrafts from Jharkhand"
                  rows="4"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${textAndStickerColor}`} />
                  Operating Hours
                </label>
                <input
                  {...register('operating_hours', { required: 'Operating hours are required' })}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                  placeholder="e.g., 10:00 AM - 6:00 PM"
                />
                {errors.operating_hours && <p className="text-red-500 text-sm mt-1">{errors.operating_hours.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Image className={`w-5 h-5 ${textAndStickerColor}`} />
                  Certification
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCertificationChange}
                  className={`w-full p-3 border ${borderColorDark} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} bg-white/80 shadow-sm`}
                />
                {editingHandicraft && editingHandicraft.certification_url && (
                  <p className="text-sm text-gray-600 mt-1">Current: {editingHandicraft.certification_url}</p>
                )}
                {errors.certification_url && <p className="text-red-500 text-sm mt-1">{errors.certification_url.message}</p>}
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
                  className={`px-4 py-2 bg-gradient-to-r ${backgroundGradient} text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-md`}
                >
                  {editingHandicraft ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Image Modal */}
      {certImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4">
          <div className="relative w-full h-full flex justify-center items-center">
            <button
              onClick={() => setCertImageModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            <img
              src={certImageModal}
              alt="Certification"
              className="w-full h-full object-contain"
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

export default HandicraftComponent;