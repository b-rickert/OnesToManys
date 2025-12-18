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
        document.getElementById('gym-list').innerHTML = '<p>Error loading gyms</p>';
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

// Loads member for a specific gym
async function loadMembersForGym(gymId, gymName) {
    try {
        document.getElementById('selected-gym-name').textContent = `Members of ${gymName}`;
        const members = await getMembersByGymId(gymId);
        displayMembers(members);
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('member-list').innerHTML = '<p>Error loading members</p>';   
    }
}

// Display members as cards
function displayMembers(members) {
    const memberList = document.getElementById('member-list');
    memberList.innerHTML = '';   // Clear existing content
    
    if (members.length === 0) {
        memberList.innerHTML = '<p>No members found for this gym</p>';
        return;
    }
    
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <h3>${member.firstName} ${member.lastName}</h3>
            <p>Email: ${member.email || 'N/A'}</p>
            <p>Type: ${member.membershipType}</p>
            <p>Status: ${member.membershipStatus}</p>
        `;
        
        memberList.appendChild(memberCard);
    });
}