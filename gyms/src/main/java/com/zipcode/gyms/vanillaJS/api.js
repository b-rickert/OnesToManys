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