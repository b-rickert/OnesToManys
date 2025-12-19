// Base URL for the API
const API_BASE_URL = 'http://localhost:8080/api';

// Fetch all gyms
async function getAllGyms() {
    const response = await fetch(`${API_BASE_URL}/gyms`);
    return await response.json();
}

// Fetch members for a specific gym
async function getMembersByGymId(gymId) {
    const response = await fetch(`${API_BASE_URL}/gyms/${gymId}/members`);
    return await response.json();
}

// Fetch all members
async function getAllMembers() {
    const response = await fetch(`${API_BASE_URL}/members`);
    return await response.json();
}

// Create a new gym
async function createGym(gymData) {
    const response = await fetch(`${API_BASE_URL}/gyms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gymData)
    });
    return await response.json();
}

// Create new member
async function createMember(memberData) {
    const response = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
    });
    return await response.json();
}