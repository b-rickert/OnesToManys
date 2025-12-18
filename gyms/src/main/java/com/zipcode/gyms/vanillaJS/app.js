// Waits for page to load
document.addEventListener('DOMContentLoaded', async () => {
    await loadGyms();
});

// Loads and displays all gyms
async function loadGyms() {
    try {
        const gyms = await getAllGyms();
        displayGyms(gyms);
    } catch (error) {
        console.error('Error loading gyms:', error);
        document.getElementById('gym-List').innerHTML = '<p>Error loading gyms</p>';
    }
}

// Display gyms as cards
function displayGyms(gyms) {
    const gymList = document.getElementById('gym-list');
    gymList.innerHTML = '';       // Clears existing content

    gyms.forEach(gym => {
        const gymCard = document.createElement('div');
        gymCard.className = 'gym-card';
        gymCard.innerHTML = `
            <h3>${gym.name}</h3>
            <p>${gym.city}, ${gym.state}</p>
            <p>Type: ${gym.gymType || 'N/A'}</p>
            <p>Rate: $${gym.monthlyRate || 'N/A'}/month</p>
        `;

        // Click to view members
        gymCard.addEventListener('click', () => loadMembersForGym(gym.id, gym.name));

        gymList.appendChild(gymCard);
    });
}

// Load members for a specific gym (we'll implement this next)
async function loadMembersForGym(gymId, gymName) {
    console.log(`Loading members for gym ${gymId}`);
    // Will implement in next step
}
