export const categorySteps = {
    Accommodation: [
      { stepName: 'Room Type', fields: [{ id: 'roomName', label: 'Room Name', type: 'text', required: true,  placeholder:"Name" },
      { id: 'roomDescription', label: 'Room Description', type: 'text', required: true,  placeholder:"Room Description" }
      ] },
      { stepName: 'Bed Count', fields: [{ id: 'bedCount', label: 'Number of Beds', type: 'number', required: true }] },
      { stepName: 'Room Capacity', fields: [{ id: 'capacity', label: 'Room Capacity', type: 'number', required: true }] },
    ],
    Dining: [
      { stepName: 'Meal Type', fields: [{ id: 'mealType', label: 'Meal Type', type: 'text', required: true }] },
      { stepName: 'Meal Price', fields: [{ id: 'price', label: 'Meal Price', type: 'number', required: true }] },
      { stepName: 'Availability', fields: [{ id: 'availability', label: 'Availability (Time/Days)', type: 'text', required: true }] },
    ],
  };