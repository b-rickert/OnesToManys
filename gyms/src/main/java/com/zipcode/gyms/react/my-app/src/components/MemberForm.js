import React, { useState, useEffect } from 'react';

function MemberForm({ member, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    gymId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    joinDate: '',
    membershipType: '',
    fitnessGoal: '',
    membershipStatus: '',
    favoriteEquipment: ''
  });

  // If editing, populate form with member data
  useEffect(() => {
    if (member) {
      setFormData({
        gymId: member.gymId || '',
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        email: member.email || '',
        phoneNumber: member.phoneNumber || '',
        dateOfBirth: member.dateOfBirth || '',
        joinDate: member.joinDate || '',
        membershipType: member.membershipType || '',
        fitnessGoal: member.fitnessGoal || '',
        membershipStatus: member.membershipStatus || '',
        favoriteEquipment: member.favoriteEquipment || ''
      });
    }
  }, [member]);

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
      gymId: parseInt(formData.gymId)
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="form-container">
      <h3>{member ? 'Edit Member' : 'Add New Member'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="gymId"
          value={formData.gymId}
          onChange={handleChange}
          placeholder="Gym ID *"
          required
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name *"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name *"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="membershipType"
          value={formData.membershipType}
          onChange={handleChange}
          placeholder="Membership Type *"
          required
        />
        <input
          type="text"
          name="fitnessGoal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          placeholder="Fitness Goal"
        />
        <input
          type="text"
          name="membershipStatus"
          value={formData.membershipStatus}
          onChange={handleChange}
          placeholder="Status *"
          required
        />
        <input
          type="text"
          name="favoriteEquipment"
          value={formData.favoriteEquipment}
          onChange={handleChange}
          placeholder="Favorite Equipment"
        />
        <button type="submit">{member ? 'Update Member' : 'Add Member'}</button>
      </form>
    </div>
  );
}

export default MemberForm;