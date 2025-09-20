import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MapPin, Plus, Edit, Trash2, X, Mountain, Trees, Image } from 'lucide-react';

// Mock API functions (replace with your actual API endpoints)
const fetchDestinations = async () => {
  return [
    {
      _id: '1',
      name: 'Netarhat',
      address: 'Latehar, Jharkhand',
      about: ['Known as Queen of Chotanagpur', 'Famous for sunsets'],
      whatToKnow: ['Best visited in winter', 'Carry warm clothes'],
      attractions: [
        { title: 'Upper Ghaghri Falls', description: 'Beautiful waterfall', image: 'url-to-image' },
        { title: 'Lower Ghaghri Falls', description: 'Scenic spot', image: 'url-to-image' },
      ],
      whatToDo: [
        { title: 'Trekking', description: 'Explore the hills', image: 'url-to-image' },
        { title: 'Photography', description: 'Capture sunsets', image: 'url-to-image' },
      ],
      howToReach: { train: 'Nearest station: Ranchi', flight: 'Nearest airport: Ranchi', road: 'Well-connected by roads' },
      nearbyDestinations: [
        { title: 'Magnolia Sunset Point', description: 'Scenic viewpoint', image: 'url-to-image' },
        { title: 'Koel View Point', description: 'River view', image: 'url-to-image' },
      ],
      events: ['Tribal Festival', 'Nature Walks'],
      famousFood: ['Litti Chokha', 'Dhuska'],
    },
  ];
};

const createDestination = async (data, files) => {
  const formData = new FormData();
  // Append JSON data
  formData.append('data', JSON.stringify(data));
  // Append files
  files.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });
  console.log('Creating destination:', formData);
  // Replace with actual POST
  // Example: const response = await fetch('/api/destinations', { method: 'POST', body: formData });
  return { _id: 'new-id', ...data };
};

const updateDestination = async (id, data, files) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  files.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });
  console.log(`Updating destination ${id}:`, formData);
  // Replace with actual PATCH
  // Example: const response = await fetch(`/api/destinations/${id}`, { method: 'PATCH', body: formData });
  return { _id: id, ...data };
};

const deleteDestination = async (id) => {
  console.log(`Deleting destination ${id}`);
  // Replace with actual DELETE
};

const DestinationComponent = () => {
  const [destinations, setDestinations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // Store selected files

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm();

  const {
    fields: aboutFields,
    append: appendAbout,
    remove: removeAbout,
  } = useFieldArray({ control, name: 'about' });
  const {
    fields: whatToKnowFields,
    append: appendWhatToKnow,
    remove: removeWhatToKnow,
  } = useFieldArray({ control, name: 'whatToKnow' });
  const {
    fields: attractionsFields,
    append: appendAttraction,
    remove: removeAttraction,
  } = useFieldArray({ control, name: 'attractions' });
  const {
    fields: whatToDoFields,
    append: appendWhatToDo,
    remove: removeWhatToDo,
  } = useFieldArray({ control, name: 'whatToDo' });
  const {
    fields: nearbyFields,
    append: appendNearby,
    remove: removeNearby,
  } = useFieldArray({ control, name: 'nearbyDestinations' });
  const {
    fields: eventsFields,
    append: appendEvent,
    remove: removeEvent,
  } = useFieldArray({ control, name: 'events' });
  const {
    fields: foodFields,
    append: appendFood,
    remove: removeFood,
  } = useFieldArray({ control, name: 'famousFood' });

  // Fetch destinations on mount and after updates/deletes
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    loadDestinations();
  }, []);

  // Open modal for creating or editing
  const openModal = (destination = null) => {
    setEditingDestination(destination);
    setImageFiles([]); // Reset image files
    if (destination) {
      // Prefill with full data for update
      reset({
        name: destination.name || '',
        address: destination.address || '',
        about: (destination.about || []).map((value) => ({ value })),
        whatToKnow: (destination.whatToKnow || []).map((value) => ({ value })),
        attractions: (destination.attractions || []).map((item) => ({
          title: item.title || '',
          description: item.description || '',
          image: item.image || '', // Store URL for display
        })),
        whatToDo: (destination.whatToDo || []).map((item) => ({
          title: item.title || '',
          description: item.description || '',
          image: item.image || '',
        })),
        howToReach: destination.howToReach || { train: '', flight: '', road: '' },
        nearbyDestinations: (destination.nearbyDestinations || []).map((item) => ({
          title: item.title || '',
          description: item.description || '',
          image: item.image || '',
        })),
        events: (destination.events || []).map((value) => ({ value })),
        famousFood: (destination.famousFood || []).map((value) => ({ value })),
      });
    } else {
      // Completely blank form for add
      reset({
        name: '',
        address: '',
        about: [],
        whatToKnow: [],
        attractions: [],
        whatToDo: [],
        howToReach: { train: '', flight: '', road: '' },
        nearbyDestinations: [],
        events: [],
        famousFood: [],
      });
    }
    setIsModalOpen(true);
  };

  // Handle image file selection
  const handleImageChange = (index, fieldName, event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = { field: `${fieldName}.${index}`, file };
        return newFiles;
      });
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        about: data.about ? data.about.map((item) => item.value) : [],
        whatToKnow: data.whatToKnow ? data.whatToKnow.map((item) => item.value) : [],
        events: data.events ? data.events.map((item) => item.value) : [],
        famousFood: data.famousFood ? data.famousFood.map((item) => item.value) : [],
        // Remove image fields from JSON (handled separately as files)
        attractions: data.attractions ? data.attractions.map((item) => ({
          title: item.title,
          description: item.description,
        })) : [],
        whatToDo: data.whatToDo ? data.whatToDo.map((item) => ({
          title: item.title,
          description: item.description,
        })) : [],
        nearbyDestinations: data.nearbyDestinations ? data.nearbyDestinations.map((item) => ({
          title: item.title,
          description: item.description,
        })) : [],
      };

      // Collect all image files
      const filesToSend = imageFiles.filter((fileObj) => fileObj && fileObj.file);

      let updatedDestination;
      if (editingDestination) {
        updatedDestination = await updateDestination(editingDestination._id, formattedData, filesToSend.map((fileObj) => fileObj.file));
      } else {
        updatedDestination = await createDestination(formattedData, filesToSend.map((fileObj) => fileObj.file));
      }
      setIsModalOpen(false);
      setImageFiles([]);
      reset();
      const updatedDestinations = await fetchDestinations();
      setDestinations(updatedDestinations);
    } catch (error) {
      console.error('Error saving destination:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await deleteDestination(id);
        const updatedDestinations = await fetchDestinations();
        setDestinations(updatedDestinations);
      } catch (error) {
        console.error('Error deleting destination:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
          Destinations
        </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add Destination
        </button>
      </div>

      {/* Destinations Table - Display only specified fields */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-green-200">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">About</th>
              <th className="py-3 px-4 text-left">Nearby Destinations</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No destinations found.
                </td>
              </tr>
            ) : (
              destinations.map((destination) => (
                <tr key={destination._id} className="border-b border-green-100 hover:bg-green-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-700">{destination.name}</td>
                  <td className="py-3 px-4 text-gray-600">{destination.address}</td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-gray-600">
                      {destination.about.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-gray-600">
                      {destination.nearbyDestinations.map((nearby, idx) => (
                        <li key={idx}>{nearby.title}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => openModal(destination)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(destination._id)}
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

      {/* Modal for Create/Update Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex justify-center items-center p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-green-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Mountain className="w-6 h-6 text-green-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {editingDestination ? 'Update Destination' : 'Create Destination'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-green-200 transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-6 bg-gradient-to-b from-green-50 to-blue-50">
              {/* Name */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Destination Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                  placeholder="e.g., Netarhat"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Address */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Trees className="w-5 h-5 text-green-600" />
                  Address
                </label>
                <input
                  {...register('address')}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                  placeholder="e.g., Latehar, Jharkhand"
                />
              </div>

              {/* About */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">About</label>
                {aboutFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <input
                      {...register(`about.${index}.value`, { required: 'About point is required' })}
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      placeholder="e.g., Famous for sunsets"
                    />
                    <button
                      type="button"
                      onClick={() => removeAbout(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendAbout({ value: '' })}
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add About Point
                </button>
                {errors.about && errors.about.map((error, index) => error?.value && (
                  <p key={index} className="text-red-500 text-sm mt-1">{error.value.message}</p>
                ))}
              </div>

              {/* What to Know */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">What to Know</label>
                {whatToKnowFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <input
                      {...register(`whatToKnow.${index}.value`, { required: 'What to know point is required' })}
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      placeholder="e.g., Best visited in winter"
                    />
                    <button
                      type="button"
                      onClick={() => removeWhatToKnow(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendWhatToKnow({ value: '' })}
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add What to Know
                </button>
                {errors.whatToKnow && errors.whatToKnow.map((error, index) => error?.value && (
                  <p key={index} className="text-red-500 text-sm mt-1">{error.value.message}</p>
                ))}
              </div>

              {/* Attractions */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Attractions</label>
                {attractionsFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 mb-3 p-3 bg-white/50 rounded-lg border border-green-200 shadow-sm">
                    <input
                      {...register(`attractions.${index}.title`, { required: 'Attraction title is required' })}
                      placeholder="Attraction Title"
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                    />
                    <textarea
                      {...register(`attractions.${index}.description`)}
                      placeholder="Description"
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      rows="3"
                    />
                    <div className="relative">
                      <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <Image className="w-5 h-5 text-green-600" />
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, `attractions`, e)}
                        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      />
                      {editingDestination && field.image && (
                        <p className="text-sm text-gray-600 mt-1">Current: {field.image}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttraction(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {errors.attractions?.[index]?.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.attractions[index].title.message}</p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendAttraction({ title: '', description: '', image: '' })}
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Attraction
                </button>
              </div>

              {/* What to Do */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">What to Do</label>
                {whatToDoFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 mb-3 p-3 bg-white/50 rounded-lg border border-green-200 shadow-sm">
                    <input
                      {...register(`whatToDo.${index}.title`, { required: 'Activity title is required' })}
                      placeholder="Activity Title"
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                    />
                    <textarea
                      {...register(`whatToDo.${index}.description`)}
                      placeholder="Description"
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      rows="3"
                    />
                    <div className="relative">
                      <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <Image className="w-5 h-5 text-green-600" />
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, `whatToDo`, e)}
                        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      />
                      {editingDestination && field.image && (
                        <p className="text-sm text-gray-600 mt-1">Current: {field.image}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeWhatToDo(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {errors.whatToDo?.[index]?.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.whatToDo[index].title.message}</p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendWhatToDo({ title: '', description: '', image: '' })}
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Activity
                </button>
              </div>

              {/* How to Reach */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">How to Reach</label>
                <div className="space-y-3">
                  <input
                    {...register('howToReach.train')}
                    placeholder="By Train"
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                  />
                  <input
                    {...register('howToReach.flight')}
                    placeholder="By Flight"
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                  />
                  <input
                    {...register('howToReach.road')}
                    placeholder="By Road"
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                  />
                </div>
              </div>

              {/* Nearby Destinations */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nearby Destinations</label>
                {nearbyFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 mb-3 p-3 bg-white/50 rounded-lg border border-green-200 shadow-sm">
                    <input
                      {...register(`nearbyDestinations.${index}.title`, { required: 'Nearby destination title is required' })}
                      placeholder="Nearby Destination Title"
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                    />
                    <textarea
                      {...register(`nearbyDestinations.${index}.description`)}
                      placeholder="Description"
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      rows="3"
                    />
                    <div className="relative">
                      <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <Image className="w-5 h-5 text-green-600" />
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, `nearbyDestinations`, e)}
                        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      />
                      {editingDestination && field.image && (
                        <p className="text-sm text-gray-600 mt-1">Current: {field.image}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNearby(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {errors.nearbyDestinations?.[index]?.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.nearbyDestinations[index].title.message}</p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendNearby({ title: '', description: '', image: '' })}
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Nearby Destination
                </button>
              </div>

              {/* Events */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Events</label>
                {eventsFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <input
                      {...register(`events.${index}.value`, { required: 'Event is required' })}
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      placeholder="e.g., Tribal Festival"
                    />
                    <button
                      type="button"
                      onClick={() => removeEvent(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendEvent({ value: '' })}
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Event
                </button>
                {errors.events && errors.events.map((error, index) => error?.value && (
                  <p key={index} className="text-red-500 text-sm mt-1">{error.value.message}</p>
                ))}
              </div>

              {/* Famous Food */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Famous Food</label>
                {foodFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <input
                      {...register(`famousFood.${index}.value`, { required: 'Food item is required' })}
                      className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 shadow-sm"
                      placeholder="e.g., Litti Chokha"
                    />
                    <button
                      type="button"
                      onClick={() => removeFood(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendFood({ value: '' })}
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 mt-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Food Item
                </button>
                {errors.famousFood && errors.famousFood.map((error, index) => error?.value && (
                  <p key={index} className="text-red-500 text-sm mt-1">{error.value.message}</p>
                ))}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-green-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-md"
                >
                  {editingDestination ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationComponent;