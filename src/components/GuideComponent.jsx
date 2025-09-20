import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { User, MapPin, Phone, CheckCircle, XCircle, Info, Plus, Edit, Trash2, X, Image } from 'lucide-react';

// Mock API functions (unchanged)
const fetchGuides = async () => {
  return [
    {
      _id: '1',
      name: 'Amit Kumar',
      about: 'Experienced guide specializing in Jharkhand’s tribal culture and natural attractions.',
      certification: 'data:image/jpeg;base64,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',
      location: 'Ranchi, Jharkhand',
      contact: '+91 9876543210',
      languages: ['Hindi', 'English', 'Santhali'],
      status: 'pending',
    }, 
  
  ];
};

const createGuide = async (data, file) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (file) formData.append('certification', file);
  console.log('Creating guide:', formData);
  return { _id: 'new-id', ...data, certification: 'url-to-certification-image.jpg' };
};

const updateGuide = async (id, data, file) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (file) formData.append('certification', file);
  console.log(`Updating guide ${id}:`, formData);
  return { _id: id, ...data };
};

const updateGuideStatus = async (id, status) => {
  console.log(`Updating guide ${id} status to ${status}`);
};

const deleteGuide = async (id) => {
  console.log(`Deleting guide ${id}`);
};

const GuideComponent = () => {
  const [guides, setGuides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [certImageModal, setCertImageModal] = useState(null);
  const [certificationFile, setCertificationFile] = useState(null);

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm();
  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'languages',
  });

  useEffect(() => {
    const loadGuides = async () => {
      try {
        const data = await fetchGuides();
        setGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };
    loadGuides();
  }, []);

  const openModal = (guide = null) => {
    setEditingGuide(guide);
    setCertificationFile(null);
    if (guide) {
      reset({
        name: guide.name || '',
        about: guide.about || '',
        certification: guide.certification || '',
        location: guide.location || '',
        contact: guide.contact || '',
        languages: (guide.languages || []).map((value) => ({ value })),
        status: guide.status || 'pending',
      });
    } else {
      reset({
        name: '',
        about: '',
        certification: '',
        location: '',
        contact: '',
        languages: [],
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
        languages: data.languages ? data.languages.map((item) => item.value) : [],
      };
      let updatedGuide;
      if (editingGuide) {
        updatedGuide = await updateGuide(editingGuide._id, formattedData, certificationFile);
      } else {
        updatedGuide = await createGuide(formattedData, certificationFile);
      }
      setIsModalOpen(false);
      setCertificationFile(null);
      reset();
      const updatedGuides = await fetchGuides();
      setGuides(updatedGuides);
    } catch (error) {
      console.error('Error saving guide:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateGuideStatus(id, status);
      const updatedGuides = await fetchGuides();
      setGuides(updatedGuides);
    } catch (error) {
      console.error(`Error updating guide status to ${status}:`, error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      try {
        await deleteGuide(id);
        const updatedGuides = await fetchGuides();
        setGuides(updatedGuides);
      } catch (error) {
        console.error('Error deleting guide:', error);
      }
    }
  };

  const openCertImageModal = (imageUrl) => {
    setCertImageModal(imageUrl);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gradient-to-b from-teal-50 to-emerald-50 min-h-screen relative">
      {/* Header */}
      <div className="relative flex justify-between items-center mb-6 z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
          Guides
        </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add Guide
        </button>
      </div>

      {/* Guides Table */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-x-auto border border-teal-200 z-10">
        <table className="w-full table-auto">
          <thead className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Name</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Location</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Contact</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Certification</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Approval</th>
              <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No guides found.
                </td>
              </tr>
            ) : (
              guides.map((guide) => (
                <tr key={guide._id} className="border-b border-teal-100 hover:bg-teal-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-700">{guide.name}</td>
                  <td className="py-3 px-4 text-gray-600">{guide.location}</td>
                  <td className="py-3 px-4 text-gray-600">{guide.contact}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                      {guide.status.charAt(0).toUpperCase() + guide.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {guide.certification ? (
                      <button
                        onClick={() => openCertImageModal(guide.certification)}
                        className="text-teal-600 hover:text-teal-800 transition"
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {guide.status === 'pending' ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleStatusUpdate(guide._id, 'approved')}
                          className="text-green-600 hover:text-green-800 transition flex items-center gap-1"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(guide._id, 'rejected')}
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
                      onClick={() => openModal(guide)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(guide._id)}
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

      {/* Pulsating User Icon (Outside Table) */}
      <div className="flex justify-center items-center mt-4 pointer-events-none">
        <div className="animate-pulse">
          <User className="w-32 h-32 text-teal-600 opacity-20" />
        </div>
      </div>

      {/* Modal for Create/Update Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex justify-center items-center p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-teal-200">
            <div className="flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-t-xl">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {editingGuide ? 'Update Guide' : 'Create Guide'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-teal-200 transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-6 bg-gradient-to-b from-teal-50 to-emerald-50">
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80 shadow-sm"
                  placeholder="e.g., Amit Kumar"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">About</label>
                <textarea
                  {...register('about', { required: 'About is required' })}
                  className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80 shadow-sm"
                  placeholder="e.g., Experienced guide in Jharkhand’s tribal culture"
                  rows="4"
                />
                {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Image className="w-5 h-5 text-teal-600" />
                  Certification
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCertificationChange}
                  className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80 shadow-sm"
                />
                {editingGuide && editingGuide.certification && (
                  <p className="text-sm text-gray-600 mt-1">Current: {editingGuide.certification}</p>
                )}
                {errors.certification && <p className="text-red-500 text-sm mt-1">{errors.certification.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  Location
                </label>
                <input
                  {...register('location', { required: 'Location is required' })}
                  className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80 shadow-sm"
                  placeholder="e.g., Ranchi, Jharkhand"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-teal-600" />
                  Contact
                </label>
                <input
                  {...register('contact', { required: 'Contact is required' })}
                  className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80 shadow-sm"
                  placeholder="e.g., +91 9876543210"
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Languages</label>
                {languageFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <input
                      {...register(`languages.${index}.value`, { required: 'Language is required' })}
                      className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80 shadow-sm"
                      placeholder="e.g., Hindi"
                    />
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendLanguage({ value: '' })}
                  className="text-teal-600 hover:text-teal-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Language
                </button>
                {errors.languages && errors.languages.map((error, index) => error?.value && (
                  <p key={index} className="text-red-500 text-sm mt-1">{error.value.message}</p>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-teal-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition shadow-md"
                >
                  {editingGuide ? 'Update' : 'Create'}
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

export default GuideComponent;