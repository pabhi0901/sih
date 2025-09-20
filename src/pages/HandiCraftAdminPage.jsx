import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Store, MapPin, List, FileText, Clock, Star, Shield, Plus, X, Edit, Trash2, Mountain, Trees, Droplet } from 'lucide-react';

// Mock API functions (replace with actual API endpoints)
const fetchHandicrafts = async () => {
  return [
    {
      id: '1',
      shop_name: 'Tribal Treasures',
      address: 'Ranchi Market, Jharkhand',
      handicraft_names: ['Bamboo Basket', 'Terracotta Pot'],
      description: 'Handcrafted tribal artifacts',
      operating_hours: '9 AM - 6 PM',
      gallery: ['https://via.placeholder.com/300?text=Handicraft+1', 'https://via.placeholder.com/300?text=Handicraft+2'],
      ratings: 4.5,
      status: 'approved',
    },
    {
      id: '2',
      shop_name: 'Jharkhand Crafts',
      address: 'Hazaribagh, Jharkhand',
      handicraft_names: ['Wooden Carving', 'Saree'],
      description: 'Traditional Jharkhand handicrafts',
      operating_hours: '10 AM - 5 PM',
      gallery: ['https://via.placeholder.com/300?text=Handicraft+3'],
      ratings: 4.0,
      status: 'pending',
    },
    {
      id: '3',
      shop_name: 'Artisan Hub',
      address: 'Dumka, Jharkhand',
      handicraft_names: ['Metal Jewelry', 'Clay Idol'],
      description: 'Authentic tribal jewelry and idols',
      operating_hours: '8 AM - 7 PM',
      gallery: ['https://via.placeholder.com/300?text=Handicraft+4', 'https://via.placeholder.com/300?text=Handicraft+5'],
      ratings: 4.8,
      status: 'approved',
    },
  ];
};

const createHandicraft = async (data, files) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (files) {
    Array.from(files).forEach((file, index) => {
      formData.append(`gallery[${index}]`, file);
    });
  }
  console.log('Creating handicraft:', formData);
  return { id: `new-${Date.now()}`, ...data, gallery: files ? Array.from(files).map((file) => URL.createObjectURL(file)) : [], status: 'pending' };
};

const updateHandicraft = async (id, data, files) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (files && files.length > 0) {
    Array.from(files).forEach((file, index) => {
      formData.append(`gallery[${index}]`, file);
    });
  }
  console.log(`Updating handicraft ${id}:`, formData);
  return { id, ...data, gallery: files && files.length > 0 ? Array.from(files).map((file) => URL.createObjectURL(file)) : data.gallery, status: data.status };
};

const deleteHandicraft = async (id) => {
  console.log(`Deleting handicraft ${id}`);
};

// Define 8 themes for smooth transitions
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

const HandicraftDashboard = () => {
  const [handicrafts, setHandicrafts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedHandicraft, setSelectedHandicraft] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Cycle through themes every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fetch handicrafts on mount
  useEffect(() => {
    const loadHandicrafts = async () => {
      try {
        const data = await fetchHandicrafts();
        setHandicrafts(data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching handicrafts:', error);
      }
    };
    loadHandicrafts();
  }, []);

  const currentTheme = themes[themeIndex];

  const openAddModal = () => {
    reset({
      shop_name: '',
      address: '',
      handicraft_names: [],
      description: '',
      operating_hours: '',
      ratings: 0,
    });
    setImageFiles([]);
    setIsAddModalOpen(true);
  };

  const openUpdateModal = (handicraft) => {
    setSelectedHandicraft(handicraft);
    reset({
      shop_name: handicraft.shop_name,
      address: handicraft.address,
      handicraft_names: handicraft.handicraft_names.join(', '),
      description: handicraft.description,
      operating_hours: handicraft.operating_hours,
      ratings: handicraft.ratings,
    });
    setImageFiles([]);
    setIsUpdateModalOpen(true);
  };

  const onAddSubmit = async (data) => {
    try {
      const processedData = {
        ...data,
        handicraft_names: data.handicraft_names.split(',').map((item) => item.trim()),
      };
      const newHandicraft = await createHandicraft(processedData, imageFiles);
      setHandicrafts([...handicrafts, newHandicraft]);
      reset();
      setImageFiles([]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding handicraft:', error);
    }
  };

  const onUpdateSubmit = async (data) => {
    try {
      const processedData = {
        ...data,
        handicraft_names: data.handicraft_names.split(',').map((item) => item.trim()),
        status: selectedHandicraft.status, // Preserve existing status
      };
      const updatedHandicraft = await updateHandicraft(selectedHandicraft.id, processedData, imageFiles);
      setHandicrafts(handicrafts.map((hc) => (hc.id === updatedHandicraft.id ? updatedHandicraft : hc)));
      reset();
      setImageFiles([]);
      setIsUpdateModalOpen(false);
      setSelectedHandicraft(null);
    } catch (error) {
      console.error('Error updating handicraft:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this handicraft shop?')) {
      try {
        await deleteHandicraft(id);
        setHandicrafts(handicrafts.filter((hc) => hc.id !== id));
      } catch (error) {
        console.error('Error deleting handicraft:', error);
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
          <Store className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          Shop Name
        </label>
        <input
          {...register('shop_name', { required: 'Shop name is required' })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.shop_name ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter shop name"
        />
        {errors.shop_name && <p className="text-red-500 text-sm mt-1">{errors.shop_name.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <MapPin className={`w-5 h-5 ${currentTheme.textColors.iconSecondary} transition-colors duration-2000`} />
          Address
        </label>
        <input
          {...register('address', { required: 'Address is required' })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.address ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter address"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <List className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          Handicraft Items
        </label>
        <input
          {...register('handicraft_names', { required: 'At least one handicraft item is required' })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.handicraft_names ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter items (comma-separated)"
        />
        {errors.handicraft_names && <p className="text-red-500 text-sm mt-1">{errors.handicraft_names.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <FileText className={`w-5 h-5 ${currentTheme.textColors.iconTertiary} transition-colors duration-2000`} />
          Description
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.description ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter description"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <Clock className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          Operating Hours
        </label>
        <input
          {...register('operating_hours', { required: 'Operating hours are required' })}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm ${errors.operating_hours ? 'border-red-300' : 'border-green-300'}`}
          placeholder="Enter operating hours (e.g., 9 AM - 6 PM)"
        />
        {errors.operating_hours && <p className="text-red-500 text-sm mt-1">{errors.operating_hours.message}</p>}
      </div>
      <div className="relative">
        <label className={`block font-semibold mb-2 flex items-center gap-2 ${currentTheme.textColors.header} transition-colors duration-2000`}>
          <Star className={`w-5 h-5 ${currentTheme.textColors.iconSecondary} transition-colors duration-2000`} />
          Ratings
        </label>
        <input
          type="number"
          step="0.1"
          {...register('ratings', { min: 0, max: 5 })}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
          placeholder="Enter ratings (0-5)"
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
        {selectedHandicraft && selectedHandicraft.gallery && (
          <p className={`text-sm mt-1 ${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>Current: {selectedHandicraft.gallery.length} image(s)</p>
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
            <Mountain className={`inline-block mr-2 ${currentTheme.textColors.icon} transition-colors duration-2000`} /> Handicraft Dashboard <Trees className={`inline-block ml-2 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
          </h2>
          <button
            onClick={openAddModal}
            className={`flex items-center gap-2 bg-gradient-to-r ${currentTheme.tableHeaderGradient} ${currentTheme.textColors.button} px-4 py-2 rounded-lg ${currentTheme.textColors.buttonHover} transition-all duration-2000 shadow-md`}
          >
            <Plus className="w-5 h-5" /> Add Handicraft Shop
          </button>
        </div>

        {/* Handicraft Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-green-200">
          <table className="w-full min-w-[800px]">
            <thead className={`bg-gradient-to-r ${currentTheme.tableHeaderGradient} text-white transition-all duration-2000`}>
              <tr>
                <th className="py-3 px-4 text-left">Shop Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Operating Hours</th>
                <th className="py-3 px-4 text-left">Ratings</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {handicrafts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No handicraft shops found.
                  </td>
                </tr>
              ) : (
                handicrafts.map((handicraft) => (
                  <tr key={handicraft.id} className="border-b border-green-100 hover:bg-green-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Store className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
                        <span className={`font-medium ${currentTheme.textColors.tableText} transition-colors duration-2000`}>{handicraft.shop_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-5 h-5 ${currentTheme.textColors.iconSecondary} transition-colors duration-2000`} />
                        <span className={`${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>{handicraft.address}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${currentTheme.textColors.icon} transition-colors duration-2000`} />
                        <span className={`${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>{handicraft.operating_hours}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Star className={`w-5 h-5 ${currentTheme.textColors.iconSecondary} transition-colors duration-2000`} />
                        <span className={`${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>{handicraft.ratings}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Shield className={`w-5 h-5 ${currentTheme.textColors.iconTertiary} transition-colors duration-2000`} />
                        <span className={`${currentTheme.textColors.tableSecondaryText} transition-colors duration-2000`}>{handicraft.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openUpdateModal(handicraft)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(handicraft.id)}
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
          title="Create Handicraft Shop"
          onSubmit={onAddSubmit}
        >
          <FormFields />
        </Modal>

        {/* Update Modal */}
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          title="Update Handicraft Shop"
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

export default HandicraftDashboard;