import React from 'react';

function GymList({ gyms, onGymClick, onEdit, onDelete }) {
  return (
    <div id="gym-list">
      {gyms.map(gym => (
        <div 
          key={gym.id} 
          className="gym-card"
          onClick={() => onGymClick(gym.id, gym.name)}
        >
          <h3>{gym.name}</h3>
          <p><strong>ID: {gym.id}</strong></p>
          <p>{gym.city}, {gym.state}</p>
          <p>Type: {gym.gymType || 'N/A'}</p>
          <p>Rate: ${gym.monthlyRate || 'N/A'}/month</p>
          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            <button className="edit-btn" onClick={() => onEdit(gym)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(gym.id, gym.name)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GymList;