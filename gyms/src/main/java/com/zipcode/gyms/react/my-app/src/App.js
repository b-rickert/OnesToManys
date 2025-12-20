import React, { useState, useEffect } from 'react';
import './App.css';
import GymList from './components/GymList';
import MemberList from './components/MemberList';
import GymForm from './components/GymForm';
import MemberForm from './components/MemberForm';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [gyms, setGyms] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedGymName, setSelectedGymName] = useState('Select a gym to view members');
  const [selectedGymId, setSelectedGymId] = useState(null);
  const [showAddGymForm, setShowAddGymForm] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [editingGym, setEditingGym] = useState(null);
  const [editingMember, setEditingMember] = useState(null);

  // Fetch gyms on component mount
  useEffect(() => {
    fetchGyms();
  }, []);

  // Fetch all gyms
  const fetchGyms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gyms`);
      const data = await response.json();
      setGyms(data);
    } catch (error) {
      console.error('Error fetching gyms:', error);
      alert('Failed to load gyms');
    }
  };

  // Load members for a specific gym
  const loadMembers = async (gymId, gymName) => {
    try {
      setSelectedGymId(gymId);
      setSelectedGymName(`Members of ${gymName}`);
      const response = await fetch(`${API_BASE_URL}/gyms/${gymId}/members`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error loading members:', error);
      alert('Failed to load members');
    }
  };

  // Create gym
  const createGym = async (gymData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gyms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gymData)
      });
      
      if (response.ok) {
        alert('Gym added successfully!');
        setShowAddGymForm(false);
        await fetchGyms();
      }
    } catch (error) {
      console.error('Error creating gym:', error);
      alert('Failed to add gym');
    }
  };

  // Update gym
  const updateGym = async (gymData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gyms/${editingGym.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gymData)
      });
      
      if (response.ok) {
        alert('Gym updated successfully!');
        setEditingGym(null);
        await fetchGyms();
      }
    } catch (error) {
      console.error('Error updating gym:', error);
      alert('Failed to update gym');
    }
  };

  // Delete gym
  const deleteGym = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/gyms/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert('Gym deleted successfully!');
        await fetchGyms();
      }
    } catch (error) {
      console.error('Error deleting gym:', error);
      alert('Failed to delete gym');
    }
  };

  // Create member
  const createMember = async (memberData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      
      if (response.ok) {
        alert('Member added successfully!');
        setShowAddMemberForm(false);
        
        if (selectedGymId) {
          await loadMembers(selectedGymId, selectedGymName.replace('Members of ', ''));
        }
      }
    } catch (error) {
      console.error('Error creating member:', error);
      alert('Failed to add member');
    }
  };

  // Update member
  const updateMember = async (memberData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/members/${editingMember.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      
      if (response.ok) {
        alert('Member updated successfully!');
        setEditingMember(null);
        
        if (selectedGymId) {
          await loadMembers(selectedGymId, selectedGymName.replace('Members of ', ''));
        }
      }
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Failed to update member');
    }
  };

  // Delete member
  const deleteMember = async (id, firstName) => {
    if (!window.confirm(`Are you sure you want to delete ${firstName}?`)) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/members/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert('Member deleted successfully!');
        
        if (selectedGymId) {
          await loadMembers(selectedGymId, selectedGymName.replace('Members of ', ''));
        }
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member');
    }
  };

  return (
    <div className="App">
      {!editingGym && !editingMember ? (
        <div className="container">
          <h1>Gym Management System (React)</h1>
          
          {/* Gym Section */}
          <section>
            <h2>Gyms</h2>
            <button 
              className="toggle-btn" 
              onClick={() => setShowAddGymForm(!showAddGymForm)}
            >
              {showAddGymForm ? '- Hide Form' : '+ Add New Gym'}
            </button>
            
            {showAddGymForm ? (
              <GymForm 
                onSubmit={createGym}
                onCancel={() => setShowAddGymForm(false)}
              />
            ) : (
              <GymList 
                gyms={gyms}
                onGymClick={loadMembers}
                onEdit={setEditingGym}
                onDelete={deleteGym}
              />
            )}
          </section>
          
          {/* Member Section */}
          <section>
            <h2>Members</h2>
            <button 
              className="toggle-btn" 
              onClick={() => setShowAddMemberForm(!showAddMemberForm)}
            >
              {showAddMemberForm ? '- Hide Form' : '+ Add New Member'}
            </button>
            
            {showAddMemberForm ? (
              <MemberForm 
                onSubmit={createMember}
                onCancel={() => setShowAddMemberForm(false)}
              />
            ) : (
              <>
                <p>{selectedGymName}</p>
                <MemberList 
                  members={members}
                  onEdit={setEditingMember}
                  onDelete={deleteMember}
                />
              </>
            )}
          </section>
        </div>
      ) : editingGym ? (
        <div className="container">
          <h2>Edit Gym</h2>
          <button className="toggle-btn" onClick={() => setEditingGym(null)}>
            ← Back to Gyms
          </button>
          <GymForm 
            gym={editingGym}
            onSubmit={updateGym}
            onCancel={() => setEditingGym(null)}
          />
        </div>
      ) : (
        <div className="container">
          <h2>Edit Member</h2>
          <button className="toggle-btn" onClick={() => setEditingMember(null)}>
            ← Back to Members
          </button>
          <MemberForm 
            member={editingMember}
            onSubmit={updateMember}
            onCancel={() => setEditingMember(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;