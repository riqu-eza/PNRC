import  { useState } from 'react';

// Configuration object for each category
const categorySteps = {
  Accommodation: [
    { stepName: 'Room Type', fields: [{ id: 'roomName', label: 'Room Name', type: 'text', required: true }] },
    { stepName: 'Bed Count', fields: [{ id: 'bedCount', label: 'Number of Beds', type: 'number', required: true }] },
    { stepName: 'Room Capacity', fields: [{ id: 'capacity', label: 'Room Capacity', type: 'number', required: true }] },
  ],
  Dining: [
    { stepName: 'Meal Type', fields: [{ id: 'mealType', label: 'Meal Type', type: 'text', required: true }] },
    { stepName: 'Meal Price', fields: [{ id: 'price', label: 'Meal Price', type: 'number', required: true }] },
    { stepName: 'Availability', fields: [{ id: 'availability', label: 'Availability (Time/Days)', type: 'text', required: true }] },
  ],
};

const DynamicForm = () => {
  const [step, setStep] = useState(1); // Tracks the current step number
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    items: [], // Array to hold multiple entries for any category
  });

  const handleChange = (e, index = null) => {
    const { id, value } = e.target;
    if (index !== null) {
      // Update fields in the items array
      const newItems = [...formData.items];
      newItems[index][id] = value;
      setFormData({ ...formData, items: newItems });
    } else {
      // Update other form fields
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleAddItem = () => {
    const newItem = categorySteps[selectedCategory][step - 7].fields.reduce((acc, field) => {
      acc[field.id] = '';
      return acc;
    }, {});
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const renderDynamicFields = () => {
    if (!selectedCategory || !categorySteps[selectedCategory]) return null;

    const currentStepConfig = categorySteps[selectedCategory][step - 7];
    if (!currentStepConfig) return null;

    return formData.items.map((item, index) => (
      <div key={index} className="mb-4">
        <h4 className="text-xl mb-4">Item {index + 1}</h4>
        {currentStepConfig.fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label htmlFor={`${field.id}-${index}`} className="block mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              id={`${field.id}-${index}`}
              value={item[field.id]}
              onChange={(e) => handleChange(e, index)}
              required={field.required}
              className="border p-2 rounded-lg w-full"
            />
          </div>
        ))}
        <button
          className="p-2 bg-red-500 text-white rounded-lg mt-4"
          onClick={() => handleRemoveItem(index)}
        >
          Remove Item
        </button>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      {step === 1 && (
        <div className="text-center m-12">
          <h3 className="text-3xl m-8">Step 1: Property Name</h3>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <button
            className="p-3 bg-blue-500 text-white rounded-lg"
            onClick={handleNextStep}
            disabled={!formData.name}
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h3 className="text-2xl m-6">Step 2: Email</h3>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="flex gap-4 justify-evenly mt-8">
            <button className="p-3 bg-gray-500 text-white rounded-lg" onClick={handlePreviousStep}>
              Back
            </button>
            <button
              className="p-3 bg-blue-500 text-white rounded-lg"
              onClick={handleNextStep}
              disabled={!formData.email}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="m-8 p-4 text-center">
          <h3 className="p-4 text-2xl">Step 6: Choose Category</h3>
          <select
            id="selectedCategory"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setFormData({ ...formData, items: [] }); // Reset items when changing category
              setStep(7); // Move to step 7 when category is selected
            }}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Category</option>
            {Object.keys(categorySteps).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Step 7 and beyond: Render category-specific dynamic fields */}
      {step >= 4 && selectedCategory && (
        <div className="m-8 p-4 text-center">
          <h3 className="text-3xl m-8">Step {step}: {categorySteps[selectedCategory][step - 7]?.stepName}</h3>
          {renderDynamicFields()}

          {step === 7 && (
            <button
              className="p-3 bg-green-500 text-white rounded-lg mt-6"
              onClick={handleAddItem}
            >
              Add Another {selectedCategory.slice(0, -1)}
            </button>
          )}

          <div className="flex gap-4 justify-evenly mt-6">
            <button className="p-3 bg-gray-500 text-white rounded-lg" onClick={handlePreviousStep}>
              Back
            </button>
            <button className="p-3 bg-blue-500 text-white rounded-lg" onClick={handleNextStep}>
              Continue
            </button>
          </div>
        </div>
      )}

      {step === categorySteps[selectedCategory]?.length + 7 && (
        <div className="text-center m-12">
          <h3 className="text-3xl m-8">Review & Submit</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <button className="p-3 bg-blue-500 text-white rounded-lg">Submit</button>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
