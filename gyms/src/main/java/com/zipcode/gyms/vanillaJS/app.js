// Waits for page to load
document.addEventListener('DOMContentLoaded', async () => {
    await loadGyms();
    
    // Toggle gym form visibility
    document.getElementById('toggle-gym-form').addEventListener('click', () => {
        const formContainer = document.getElementById('gym-form-container');
        const toggleBtn = document.getElementById('toggle-gym-form');
        
        if (formContainer.style.display === 'none') {
            formContainer.style.display = 'block';
            toggleBtn.textContent = '- Hide Form';
        } else {
            formContainer.style.display = 'none';
            toggleBtn.textContent = '+ Add New Gym';
        }
    });
    
    // Handle gym form submission
    document.getElementById('add-gym-form').addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent page reload
        
        const gymData = {
            name: document.getElementById('gym-name').value,
            address: document.getElementById('gym-address').value,
            city: document.getElementById('gym-city').value,
            state: document.getElementById('gym-state').value,
            phoneNumber: document.getElementById('gym-phone').value,
            operatingHours: document.getElementById('gym-hours').value,
            numberOfEquipment: parseInt(document.getElementById('gym-equipment').value) || null,
            gymType: document.getElementById('gym-type').value,
            monthlyRate: parseFloat(document.getElementById('gym-rate').value) || null
        };
        
        try {
            await createGym(gymData);
            alert('Gym added successfully!');
            document.getElementById('add-gym-form').reset(); // Clear form
            document.getElementById('gym-form-container').style.display = 'none';
            document.getElementById('toggle-gym-form').textContent = '+ Add New Gym';
            await loadGyms(); // Reload gym list
        } catch (error) {
            console.error('Error creating gym:', error);
            alert('Failed to add gym');
        }
    });
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
    gymList.innerHTML = '';
    
    gyms.forEach(gym => {
        const gymCard = document.createElement('div');
        gymCard.className = 'gym-card';
        gymCard.innerHTML = `
            <h3>${gym.name}</h3>
            <p>${gym.city}, ${gym.state}</p>
            <p>Type: ${gym.gymType || 'N/A'}</p>
            <p>Rate: $${gym.monthlyRate || 'N/A'}/month</p>
        `;
        
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
    memberList.innerHTML = '';
    
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