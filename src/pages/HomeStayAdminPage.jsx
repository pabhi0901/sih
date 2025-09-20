import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Home, MapPin, IndianRupee, Percent, Plus, X, Edit, Trash2, Mountain, Trees, Droplet } from 'lucide-react';

// Mock API functions (replace with actual API endpoints)
const fetchHomestays = async () => {
  return [
    {
      id: '1',
      homestayName: 'Forest Retreat',
      location: 'Betla National Park, Jharkhand',
      price: 5000,
      discount: 10,
      gallery: ['https://via.placeholder.com/300?text=Forest+1', 'https://via.placeholder.com/300?text=Forest+2'],
    },
    {
      id: '2',
      homestayName: 'Waterfall Haven',
      location: 'Dassam Falls, Ranchi',
      price: 4000,
      discount: 5,
      gallery: ['https://via.placeholder.com/300?text=Waterfall+1'],
    },
    {
      id: '3',
      homestayName: 'Wildlife Lodge',
      location: 'Hazaribagh Wildlife Sanctuary',
      price: 6000,
      discount: 15,
      gallery: ['https://via.placeholder.com/300?text=Wildlife+1', 'https://via.placeholder.com/300?text=Wildlife+2'],
    },
  ];
};

const createHomestay = async (data, files) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (files) {
    Array.from(files).forEach((file, index) => {
      formData.append(`gallery[${index}]`, file);
    });
  }
  console.log('Creating homestay:', formData);
  return { id: `new-${Date.now()}`, ...data, gallery: files ? Array.from(files).map((file) => URL.createObjectURL(file)) : [] };
};

const updateHomestay = async (id, data, files) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (files && files.length > 0) {
    Array.from(files).forEach((file, index) => {
      formData.append(`gallery[${index}]`, file);
    });
  }
  console.log(`Updating homestay ${id}:`, formData);
  return { id, ...data, gallery: files && files.length > 0 ? Array.from(files).map((file) => URL.createObjectURL(file)) : data.gallery };
};

const deleteHomestay = async (id) => {
  console.log(`Deleting homestay ${id}`);
};

// Define 8 themes for smoother transitions
const themes = [
  {
    name: 'Forest Dawn',
    backgroundGradient: 'from-emerald-50 via-teal-50 to-green-50',
    tableHeaderGradient: 'from-green-500 to-teal-500',
    modalHeaderGradient: 'from-green-100 to-teal-100',
    modalBackgroundGradient: 'from-green-50 to-teal-50',
    textColors: {
      header: 'text-gray-800',
      tableText: 'text-gray-700',
      tableSecondaryText: 'text-gray-600',
      button: 'text-white',
      icon: 'text-green-600',
      iconSecondary: 'text-teal-600',
      iconTertiary: 'text-blue-600',
      buttonHover: 'hover:from-green-600 hover:to-teal-600',
    },
  },
  {
    name: 'River Mist',
    backgroundGradient: 'from-teal-50 via-cyan-50 to-blue-50',
    tableHeaderGradient: 'from-teal-500 to-cyan-500',
    modalHeaderGradient: 'from-teal-100 to-cyan-100',
    modalBackgroundGradient: 'from-teal-50 to-cyan-50',
    textColors: {
      header: 'text-teal-800',
      tableText: 'text-teal-700',
      tableSecondaryText: 'text-teal-600',
      button: 'text-white',
      icon: 'text-teal-600',
      iconSecondary: 'text-cyan-600',
      iconTertiary: 'text-blue-600',
      buttonHover: 'hover:from-teal-600 hover:to-cyan-600',
    },
  },
  {
    name: 'Waterfall Breeze',
    backgroundGradient: 'from-cyan-50 via-blue-50 to-indigo-50',
    tableHeaderGradient: 'from-cyan-500 to-blue-500',
    modalHeaderGradient: 'from-cyan-100 to-blue-100',
    modalBackgroundGradient: 'from-cyan-50 to-blue-50',
    textColors: {
      header: 'text-blue-800',
      tableText: 'text-blue-700',
      tableSecondaryText: 'text-blue-600',
      button: 'text-white',
      icon: 'text-cyan-600',
      iconSecondary: 'text-blue-600',
      iconTertiary: 'text-indigo-600',
      buttonHover: 'hover:from-cyan-600 hover:to-blue-600',
    },
  },
  {
    name: 'Twilight Hills',
    backgroundGradient: 'from-blue-50 via-indigo-50 to-purple-50',
    tableHeaderGradient: 'from-blue-500 to-purple-500',
    modalHeaderGradient: 'from-blue-100 to-purple-100',
    modalBackgroundGradient: 'from-blue-50 to-purple-50',
    textColors: {
      header: 'text-indigo-800',
      tableText: 'text-indigo-700',
      tableSecondaryText: 'text-indigo-600',
      button: 'text-white',
      icon: 'text-blue-600',
      iconSecondary: 'text-indigo-600',
      iconTertiary: 'text-purple-600',
      buttonHover: 'hover:from-blue-600 hover:to-purple-600',
    },
  },
  {
    name: 'Sunset Glow',
    backgroundGradient: 'from-purple-50 via-pink-50 to-rose-50',
    tableHeaderGradient: 'from-purple-500 to-pink-500',
    modalHeaderGradient: 'from-purple-100 to-pink-100',
    modalBackgroundGradient: 'from-purple-50 to-pink-50',
    textColors: {
      header: 'text-purple-800',
      tableText: 'text-purple-700',
      tableSecondaryText: 'text-purple-600',
      button: 'text-white',
      icon: 'text-purple-600',
      iconSecondary: 'text-pink-600',
      iconTertiary: 'text-rose-600',
      buttonHover: 'hover:from-purple-600 hover:to-pink-600',
    },
  },
  {
    name: 'Tribal Hearth',
    backgroundGradient: 'from-rose-50 via-red-50 to-orange-50',
    tableHeaderGradient: 'from-pink-500 to-orange-500',
    modalHeaderGradient: 'from-pink-100 to-orange-100',
    modalBackgroundGradient: 'from-pink-50 to-orange-50',
    textColors: {
      header: 'text-red-800',
      tableText: 'text-red-700',
      tableSecondaryText: 'text-red-600',
      button: 'text-white',
      icon: 'text-pink-600',
      iconSecondary: 'text-red-600',
      iconTertiary: 'text-orange-600',
      buttonHover: 'hover:from-pink-600 hover:to-orange-600',
    },
  },
  {
    name: 'Golden Fields',
    backgroundGradient: 'from-orange-50 via-amber-50 to-yellow-50',
    tableHeaderGradient: 'from-orange-500 to-amber-500',
    modalHeaderGradient: 'from-orange-100 to-amber-100',
    modalBackgroundGradient: 'from-orange-50 to-amber-50',
    textColors: {
      header: 'text-amber-800',
      tableText: 'text-amber-700',
      tableSecondaryText: 'text-amber-600',
      button: 'text-white',
      icon: 'text-orange-600',
      iconSecondary: 'text-amber-600',
      iconTertiary: 'text-yellow-600',
      buttonHover: 'hover:from-orange-600 hover:to-amber-600',
    },
  },
  {
    name: 'Forest Dusk',
    backgroundGradient: 'from-amber-50 via-green-50 to-emerald-50',
    tableHeaderGradient: 'from-amber-500 to-green-500',
    modalHeaderGradient: 'from-amber-100 to-green-100',
    modalBackgroundGradient: 'from-amber-50 to-green-50',
    textColors: {
      header: 'text-green-800',
      tableText: 'text-green-700',
      tableSecondaryText: 'text-green-600',
      button: 'text-white',
      icon: 'text-amber-600',
      iconSecondary: 'text-green-600',
      iconTertiary: 'text-emerald-600',
      buttonHover: 'hover:from-amber-600 hover:to-green-600',
    },
  },
];

const Dashboard = () => {
  const [homestays, setHomestays] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Cycle through themes every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch homestays on mount
  useEffect(() => {
    const loadHomestays = async () => {
      try {
        const data = await fetchHomestays();
        setHomestays(data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching homestays:', error);
      }
    };
    loadHomestays();
  }, []);

  const currentTheme = themes[themeIndex];

  const openAddModal = () => {
    reset({
      homestayName: '',
      location: '',
      price: '',
      discount: 0,
    });
    setImageFiles([]);
    setIsAddModalOpen(true);
  };

  const openUpdateModal = (homestay) => {
    setSelectedHomestay(homestay);
    reset({
      homestayName: homestay.homestayName,
      location: homestay.location,
      price: homestay.price,
      discount: homestay.discount,
      gallery: homestay.gallery,
    });
    setImageFiles([]);
    setIsUpdateModalOpen(true);
  };

  const onAddSubmit = async (data) => {
    try {
      const newHomestay = await createHomestay(data, imageFiles);
      setHomestays([...homestays, newHomestay]);
      reset();
      setImageFiles([]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding homestay:', error);
    }
  };

  const onUpdateSubmit = async (data) => {
    try {
      const updatedHomestay = await updateHomestay(selectedHomestay.id, data, imageFiles);
      setHomestays(homestays.map((hs) => (hs.id === updatedHomestay.id ? updatedHomestay : hs)));
      reset();
      setImageFiles([]);
      setIsUpdateModalOpen(false);
      setSelectedHomestay(null);
    } catch (error) {
      console.error('Error updating homestay:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this homestay?')) {
      try {
        await deleteHomestay(id);
        setHomestays(homestays.filter((hs) => hs.id !== id));
      } catch (error) {
        console.error('Error deleting homestay:', error);
      }
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      setImageFiles(files);
    }
  };

  const Modal = ({ isOpen, onClose, title, onSubmit, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 sm:p-6">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-green-200">
          <div className={`flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r ${currentTheme.modalHeaderGradient} rounded-t-xl transition-all duration-2000`}>
            <div className="flex items-center gap-2">
              <Mountain className={`w-6 h-6 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
              <h3 className={`text-xl sm:text-2xl font-bold ${currentTheme.textColors.header} transition-colors duration-2000`}>{title}</h3>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-green-200 transition">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={`p-4 sm:p-6 space-y-6 bg-gradient-to-b ${currentTheme.modalBackgroundGradient} transition-all duration-2000`}>
            {children}
            <div className="flex justify-end gap-3 pt-4 border-t border-green-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 bg-gradient-to-r ${currentTheme.tableHeaderGradient} ${currentTheme.textColors.button} rounded-lg ${currentTheme.textColors.buttonHover} transition-all duration-2000 shadow-md`}
              >
                {title.includes('Update') ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const FormFields = () => (
    <>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <Home className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          Homestay Name
        </label>
        <input
          {...register('homestayName', { required: 'Homestay name is required' })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.homestayName ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter homestay name"
        />
        {errors.homestayName && <p className="text-red-500 text-sm mt-1">{errors.homestayName.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <MapPin className={`w-5 h-5 ${currentTheme.textColors.iconSecondary} transition-colors duration-2000`} />
          Location
        </label>
        <input
          {...register('location', { required: 'Location is required' })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.location ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter location"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <IndianRupee className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          Price
        </label>
        <input
          type="number"
          {...register('price', { required: 'Price is required', min: 0 })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.price ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter price"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <Percent className={`w-5 h-5 ${currentTheme.textColors.iconTertiary} transition-colors duration-2000`} />
          Discount (%)
        </label>
        <input
          type="number"
          {...register('discount', { min: 0, max: 100 })}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
          placeholder="Enter discount"
        />
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <Trees className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          Gallery Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
        />
        {selectedHomestay && selectedHomestay.gallery && (
          <p className={`text-sm mt-1 ${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>Current: {selectedHomestay.gallery.length} image(s)</p>
        )}
      </div>
    </>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.backgroundGradient} p-4 sm:p-6 transition-all duration-2000`}>
      {/* Floating Nature Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-12 h-12 opacity-20 animate-float">
          <Trees className={`${currentTheme.textColors.icon} transition-colors duration-2000`} />
        </div>
        <div className="absolute top-40 right-32 w-16 h-16 opacity-30 animate-pulse">
          <Mountain className={`${currentTheme.textColors.iconSecondary} transition-colors duration-2000`} />
        </div>
        <div className="absolute bottom-40 left-32 w-14 h-14 opacity-25 animate-bounce">
          <Droplet className={`${currentTheme.textColors.iconTertiary} transition-colors duration-2000`} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${currentTheme.tableHeaderGradient} transition-all duration-2000`}>
            <Mountain className={`inline-block mr-2 ${currentTheme.textColors.icon} transition-colors duration-2000`} /> Homestay Dashboard <Trees className={`inline-block ml-2 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          </h2>
          <button
            onClick={openAddModal}
            className={`flex items-center gap-2 bg-gradient-to-r ${currentTheme.tableHeaderGradient} ${currentTheme.textColors.button} px-4 py-2 rounded-lg ${currentTheme.textColors.buttonHover} transition-all duration-2000 shadow-md`}
          >
            <Plus className="w-5 h-5" /> Add Homestay
          </button>
        </div>

        {/* Homestay Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-green-200">
          <table className="w-full min-w-[640px]">
            <thead className={`bg-gradient-to-r ${currentTheme.tableHeaderGradient} text-white transition-all duration-2000`}>
              <tr>
                <th className="py-3 px-4 text-left">Homestay Name</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Discount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {homestays.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No homestays found.
                  </td>
                </tr>
              ) : (
                homestays.map((homestay) => (
                  <tr key={homestay.id} className="border-b border-green-100 hover:bg-green-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Home className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
                        <span className={`font-medium ${currentTheme.textColors.tableText} transition-colors duration-2000`}>{homestay.homestayName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-5 h-5 ${currentTheme.textColors.iconSecondary} transition-colors duration-2000`} />
                        <span className={`${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>{homestay.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <IndianRupee className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
                        <span className={`${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>{homestay.price}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Percent className={`w-5 h-5 ${currentTheme.textColors.iconTertiary} transition-colors duration-2000`} />
                        <span className={`${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>{homestay.discount}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openUpdateModal(homestay)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(homestay.id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Create Homestay"
          onSubmit={onAddSubmit}
        >
          <FormFields />
        </Modal>

        {/* Update Modal */}
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          title="Update Homestay"
          onSubmit={onUpdateSubmit}
        >
          <FormFields />
        </Modal>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;