import React, { useState, useEffect } from 'react';

function GymForm({ gym, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    operatingHours: '',
    numberOfEquipment: '',
    gymType: '',
    monthlyRate: ''
  });

  // If editing, populate form with gym data
  useEffect(() => {
    if (gym) {
      setFormData({
        name: gym.name || '',
        address: gym.address || '',
        city: gym.city || '',
        state: gym.state || '',
        phoneNumber: gym.phoneNumber || '',
        operatingHours: gym.operatingHours || '',
        numberOfEquipment: gym.numberOfEquipment || '',
        gymType: gym.gymType || '',
        monthlyRate: gym.monthlyRate || ''
      });
    }
  }, [gym]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      numberOfEquipment: formData.numberOfEquipment ? parseInt(formData.numberOfEquipment) : null,
      monthlyRate: formData.monthlyRate ? parseFloat(formData.monthlyRate) : null
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="form-container">
      <h3>{gym ? 'Edit Gym' : 'Add New Gym'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Gym Name *"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State (2 letters)"
          maxLength="2"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="operatingHours"
          value={formData.operatingHours}
          onChange={handleChange}
          placeholder="Operating Hours"
        />
        <input
          type="number"
          name="numberOfEquipment"
          value={formData.numberOfEquipment}
          onChange={handleChange}
          placeholder="Number of Equipment"
        />
        <input
          type="text"
          name="gymType"
          value={formData.gymType}
          onChange={handleChange}
          placeholder="Gym Type"
        />
        <input
          type="number"
          name="monthlyRate"
          value={formData.monthlyRate}
          onChange={handleChange}
          placeholder="Monthly Rate"
          step="0.01"
        />
        <button type="submit">{gym ? 'Update Gym' : 'Add Gym'}</button>
      </form>
    </div>
  );
}

export default GymForm;