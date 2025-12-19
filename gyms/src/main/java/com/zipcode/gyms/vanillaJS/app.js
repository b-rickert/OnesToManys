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
        e.preventDefault();
        
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
            document.getElementById('add-gym-form').reset();
            document.getElementById('gym-form-container').style.display = 'none';
            document.getElementById('toggle-gym-form').textContent = '+ Add New Gym';
            await loadGyms();
        } catch (error) {
            console.error('Error creating gym:', error);
            alert('Failed to add gym');
        }
    });
    
    // Toggle member form visibility
    document.getElementById('toggle-member-form').addEventListener('click', () => {
        const formContainer = document.getElementById('member-form-container');
        const toggleBtn = document.getElementById('toggle-member-form');
        
        if (formContainer.style.display === 'none') {
            formContainer.style.display = 'block';
            toggleBtn.textContent = '- Hide Form';
        } else {
            formContainer.style.display = 'none';
            toggleBtn.textContent = '+ Add New Member';
        }
    });
    
    // Handle member form submission
    document.getElementById('add-member-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const memberData = {
            gymId: parseInt(document.getElementById('member-gym-id').value),
            firstName: document.getElementById('member-first-name').value,
            lastName: document.getElementById('member-last-name').value,
            email: document.getElementById('member-email').value,
            phoneNumber: document.getElementById('member-phone').value,
            dateOfBirth: document.getElementById('member-dob').value,
            joinDate: document.getElementById('member-join-date').value,
            membershipType: document.getElementById('member-type').value,
            fitnessGoal: document.getElementById('member-goal').value,
            membershipStatus: document.getElementById('member-status').value,
            favoriteEquipment: document.getElementById('member-equipment').value
        };
        
        try {
            await createMember(memberData);
            alert('Member added successfully!');
            document.getElementById('add-member-form').reset();
            document.getElementById('member-form-container').style.display = 'none';
            document.getElementById('toggle-member-form').textContent = '+ Add New Member';
        } catch (error) {
            console.error('Error creating member:', error);
            alert('Failed to add member');
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
            <p><strong>ID: ${gym.id}</strong></p>
            <p>${gym.city}, ${gym.state}</p>
            <p>Type: ${gym.gymType || 'N/A'}</p>
            <p>Rate: $${gym.monthlyRate || 'N/A'}/month</p>
            <div class="card-actions">
                <button class="edit-btn" data-id="${gym.id}">Edit</button>
                <button class="delete-btn" data-id="${gym.id}">Delete</button>
            </div>
        `;
        
        // Click card to view members (but not when clicking buttons)
        gymCard.addEventListener('click', (e) => {
            if (!e.target.classList.contains('edit-btn') && !e.target.classList.contains('delete-btn')) {
                loadMembersForGym(gym.id, gym.name);
            }
        });
        
        // Edit button handler
        gymCard.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editGym(gym);
        });
        
        // Delete button handler
        gymCard.querySelector('.delete-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete ${gym.name}?`)) {
                try {
                    await deleteGym(gym.id);
                    alert('Gym deleted successfully!');
                    await loadGyms();
                } catch (error) {
                    console.error('Error deleting gym:', error);
                    alert('Failed to delete gym');
                }
            }
        });
        
        gymList.appendChild(gymCard);
    });
}

// Edit gym function
function editGym(gym) {
    // Fill form with current gym data
    document.getElementById('gym-name').value = gym.name;
    document.getElementById('gym-address').value = gym.address || '';
    document.getElementById('gym-city').value = gym.city || '';
    document.getElementById('gym-state').value = gym.state || '';
    document.getElementById('gym-phone').value = gym.phoneNumber || '';
    document.getElementById('gym-hours').value = gym.operatingHours || '';
    document.getElementById('gym-equipment').value = gym.numberOfEquipment || '';
    document.getElementById('gym-type').value = gym.gymType || '';
    document.getElementById('gym-rate').value = gym.monthlyRate || '';
    
    // Show form
    document.getElementById('gym-form-container').style.display = 'block';
    document.getElementById('toggle-gym-form').textContent = '- Hide Form';
    
    // Change form submission to update instead of create
    const form = document.getElementById('add-gym-form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        
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
            await updateGym(gym.id, gymData);
            alert('Gym updated successfully!');
            form.reset();
            document.getElementById('gym-form-container').style.display = 'none';
            document.getElementById('toggle-gym-form').textContent = '+ Add New Gym';
            
            // Reset form to create mode
            resetGymForm();
            
            await loadGyms();
        } catch (error) {
            console.error('Error updating gym:', error);
            alert('Failed to update gym');
        }
    };
}

// Reset gym form to create mode
function resetGymForm() {
    const form = document.getElementById('add-gym-form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        
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
            form.reset();
            document.getElementById('gym-form-container').style.display = 'none';
            document.getElementById('toggle-gym-form').textContent = '+ Add New Gym';
            await loadGyms();
        } catch (error) {
            console.error('Error creating gym:', error);
            alert('Failed to add gym');
        }
    };
}

// Loads members for a specific gym
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
            <div class="card-actions">
                <button class="edit-btn" data-id="${member.id}">Edit</button>
                <button class="delete-btn" data-id="${member.id}">Delete</button>
            </div>
        `;
        
        // Edit button handler
        memberCard.querySelector('.edit-btn').addEventListener('click', () => {
            editMember(member);
        });
        
        // Delete button handler
        memberCard.querySelector('.delete-btn').addEventListener('click', async () => {
            if (confirm(`Are you sure you want to delete ${member.firstName} ${member.lastName}?`)) {
                try {
                    await deleteMember(member.id);
                    alert('Member deleted successfully!');
                    await loadMembersForGym(member.gymId, document.getElementById('selected-gym-name').textContent.replace('Members of ', ''));
                } catch (error) {
                    console.error('Error deleting member:', error);
                    alert('Failed to delete member');
                }
            }
        });
        
        memberList.appendChild(memberCard);
    });
}

// Edit member function
function editMember(member) {
    // Fill form with current member data
    document.getElementById('member-gym-id').value = member.gymId;
    document.getElementById('member-first-name').value = member.firstName;
    document.getElementById('member-last-name').value = member.lastName;
    document.getElementById('member-email').value = member.email || '';
    document.getElementById('member-phone').value = member.phoneNumber || '';
    document.getElementById('member-dob').value = member.dateOfBirth;
    document.getElementById('member-join-date').value = member.joinDate;
    document.getElementById('member-type').value = member.membershipType;
    document.getElementById('member-goal').value = member.fitnessGoal || '';
    document.getElementById('member-status').value = member.membershipStatus;
    document.getElementById('member-equipment').value = member.favoriteEquipment || '';
    
    // Show form
    document.getElementById('member-form-container').style.display = 'block';
    document.getElementById('toggle-member-form').textContent = '- Hide Form';
    
    // Change form submission to update instead of create
    const form = document.getElementById('add-member-form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const memberData = {
            gymId: parseInt(document.getElementById('member-gym-id').value),
            firstName: document.getElementById('member-first-name').value,
            lastName: document.getElementById('member-last-name').value,
            email: document.getElementById('member-email').value,
            phoneNumber: document.getElementById('member-phone').value,
            dateOfBirth: document.getElementById('member-dob').value,
            joinDate: document.getElementById('member-join-date').value,
            membershipType: document.getElementById('member-type').value,
            fitnessGoal: document.getElementById('member-goal').value,
            membershipStatus: document.getElementById('member-status').value,
            favoriteEquipment: document.getElementById('member-equipment').value
        };
        
        try {
            await updateMember(member.id, memberData);
            alert('Member updated successfully!');
            form.reset();
            document.getElementById('member-form-container').style.display = 'none';
            document.getElementById('toggle-member-form').textContent = '+ Add New Member';
            
            // Reset form to create mode
            resetMemberForm();
            
            await loadMembersForGym(member.gymId, document.getElementById('selected-gym-name').textContent.replace('Members of ', ''));
        } catch (error) {
            console.error('Error updating member:', error);
            alert('Failed to update member');
        }
    };
}

// Reset member form to create mode
function resetMemberForm() {
    const form = document.getElementById('add-member-form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const memberData = {
            gymId: parseInt(document.getElementById('member-gym-id').value),
            firstName: document.getElementById('member-first-name').value,
            lastName: document.getElementById('member-last-name').value,
            email: document.getElementById('member-email').value,
            phoneNumber: document.getElementById('member-phone').value,
            dateOfBirth: document.getElementById('member-dob').value,
            joinDate: document.getElementById('member-join-date').value,
            membershipType: document.getElementById('member-type').value,
            fitnessGoal: document.getElementById('member-goal').value,
            membershipStatus: document.getElementById('member-status').value,
            favoriteEquipment: document.getElementById('member-equipment').value
        };
        
        try {
            await createMember(memberData);
            alert('Member added successfully!');
            form.reset();
            document.getElementById('member-form-container').style.display = 'none';
            document.getElementById('toggle-member-form').textContent = '+ Add New Member';
        } catch (error) {
            console.error('Error creating member:', error);
            alert('Failed to add member');
        }
    };
}