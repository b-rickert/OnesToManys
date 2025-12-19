let currentEditingGymId = null;
let currentEditingMemberId = null;

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
            document.getElementById('gym-list').style.display = 'none';
        } else {
            formContainer.style.display = 'none';
            toggleBtn.textContent = '+ Add New Gym';
            document.getElementById('gym-list').style.display = 'grid';
        }
    });
    
    // Handle gym form submission (CREATE)
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
            document.getElementById('gym-list').style.display = 'grid';
            await loadGyms();
        } catch (error) {
            console.error('Error creating gym:', error);
            alert('Failed to add gym');
        }
    });
    
    // Handle EDIT gym form submission (UPDATE)
    document.getElementById('edit-gym-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const gymData = {
            name: document.getElementById('edit-gym-name').value,
            address: document.getElementById('edit-gym-address').value,
            city: document.getElementById('edit-gym-city').value,
            state: document.getElementById('edit-gym-state').value,
            phoneNumber: document.getElementById('edit-gym-phone').value,
            operatingHours: document.getElementById('edit-gym-hours').value,
            numberOfEquipment: parseInt(document.getElementById('edit-gym-equipment').value) || null,
            gymType: document.getElementById('edit-gym-type').value,
            monthlyRate: parseFloat(document.getElementById('edit-gym-rate').value) || null
        };
        
        try {
            await updateGym(currentEditingGymId, gymData);
            alert('Gym updated successfully!');
            cancelEditGym();
            await loadGyms();
        } catch (error) {
            console.error('Error updating gym:', error);
            alert('Failed to update gym');
        }
    });
    
    // Cancel edit gym button
    document.getElementById('cancel-edit-gym').addEventListener('click', cancelEditGym);
    
    // Toggle member form visibility
    document.getElementById('toggle-member-form').addEventListener('click', () => {
        const formContainer = document.getElementById('member-form-container');
        const toggleBtn = document.getElementById('toggle-member-form');
        
        if (formContainer.style.display === 'none') {
            formContainer.style.display = 'block';
            toggleBtn.textContent = '- Hide Form';
            document.getElementById('member-list').style.display = 'none';
        } else {
            formContainer.style.display = 'none';
            toggleBtn.textContent = '+ Add New Member';
            document.getElementById('member-list').style.display = 'grid';
        }
    });
    
    // Handle member form submission (CREATE)
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
            document.getElementById('member-list').style.display = 'grid';
        } catch (error) {
            console.error('Error creating member:', error);
            alert('Failed to add member');
        }
    });
    
    // Handle EDIT member form submission (UPDATE)
    document.getElementById('edit-member-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const memberData = {
            gymId: parseInt(document.getElementById('edit-member-gym-id').value),
            firstName: document.getElementById('edit-member-first-name').value,
            lastName: document.getElementById('edit-member-last-name').value,
            email: document.getElementById('edit-member-email').value,
            phoneNumber: document.getElementById('edit-member-phone').value,
            dateOfBirth: document.getElementById('edit-member-dob').value,
            joinDate: document.getElementById('edit-member-join-date').value,
            membershipType: document.getElementById('edit-member-type').value,
            fitnessGoal: document.getElementById('edit-member-goal').value,
            membershipStatus: document.getElementById('edit-member-status').value,
            favoriteEquipment: document.getElementById('edit-member-equipment').value
        };
        
        try {
            await updateMember(currentEditingMemberId, memberData);
            alert('Member updated successfully!');
            cancelEditMember();
        } catch (error) {
            console.error('Error updating member:', error);
            alert('Failed to update member');
        }
    });
    
    // Cancel edit member button
    document.getElementById('cancel-edit-member').addEventListener('click', cancelEditMember);
});

// Load and display all gyms
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
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
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
            showEditGymForm(gym);
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

// Show edit gym form
function showEditGymForm(gym) {
    currentEditingGymId = gym.id;
    
    // Fill form with current gym data
    document.getElementById('edit-gym-name').value = gym.name;
    document.getElementById('edit-gym-address').value = gym.address || '';
    document.getElementById('edit-gym-city').value = gym.city || '';
    document.getElementById('edit-gym-state').value = gym.state || '';
    document.getElementById('edit-gym-phone').value = gym.phoneNumber || '';
    document.getElementById('edit-gym-hours').value = gym.operatingHours || '';
    document.getElementById('edit-gym-equipment').value = gym.numberOfEquipment || '';
    document.getElementById('edit-gym-type').value = gym.gymType || '';
    document.getElementById('edit-gym-rate').value = gym.monthlyRate || '';
    
    // Hide main view, show edit view
    document.querySelector('.container').style.display = 'none';
    document.getElementById('edit-gym-section').style.display = 'block';
}

// Cancel edit gym
function cancelEditGym() {
    document.getElementById('edit-gym-section').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.getElementById('edit-gym-form').reset();
    currentEditingGymId = null;
}

// Load members for a specific gym
async function loadMembersForGym(gymId, gymName) {
    try {
        document.getElementById('selected-gym-name').textContent = `Members of ${gymName}`;
        const members = await getMembersByGymId(gymId);
        displayMembers(members, gymId, gymName);
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('member-list').innerHTML = '<p>Error loading members</p>';
    }
}

// Display members as cards
function displayMembers(members, gymId, gymName) {
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
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Edit button handler
        memberCard.querySelector('.edit-btn').addEventListener('click', () => {
            showEditMemberForm(member, gymId, gymName);
        });
        
        // Delete button handler
        memberCard.querySelector('.delete-btn').addEventListener('click', async () => {
            if (confirm(`Are you sure you want to delete ${member.firstName} ${member.lastName}?`)) {
                try {
                    await deleteMember(member.id);
                    alert('Member deleted successfully!');
                    await loadMembersForGym(gymId, gymName);
                } catch (error) {
                    console.error('Error deleting member:', error);
                    alert('Failed to delete member');
                }
            }
        });
        
        memberList.appendChild(memberCard);
    });
}

// Show edit member form
function showEditMemberForm(member, gymId, gymName) {
    currentEditingMemberId = member.id;
    
    // Fill form with current member data
    document.getElementById('edit-member-gym-id').value = member.gymId;
    document.getElementById('edit-member-first-name').value = member.firstName;
    document.getElementById('edit-member-last-name').value = member.lastName;
    document.getElementById('edit-member-email').value = member.email || '';
    document.getElementById('edit-member-phone').value = member.phoneNumber || '';
    document.getElementById('edit-member-dob').value = member.dateOfBirth;
    document.getElementById('edit-member-join-date').value = member.joinDate;
    document.getElementById('edit-member-type').value = member.membershipType;
    document.getElementById('edit-member-goal').value = member.fitnessGoal || '';
    document.getElementById('edit-member-status').value = member.membershipStatus;
    document.getElementById('edit-member-equipment').value = member.favoriteEquipment || '';
    
    // Store gym info to reload after edit
    document.getElementById('edit-member-section').dataset.gymId = gymId;
    document.getElementById('edit-member-section').dataset.gymName = gymName;
    
    // Hide main view, show edit view
    document.querySelector('.container').style.display = 'none';
    document.getElementById('edit-member-section').style.display = 'block';
}

// Cancel edit member
function cancelEditMember() {
    const gymId = document.getElementById('edit-member-section').dataset.gymId;
    const gymName = document.getElementById('edit-member-section').dataset.gymName;
    
    document.getElementById('edit-member-section').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.getElementById('edit-member-form').reset();
    currentEditingMemberId = null;
    
    // Reload the members list
    if (gymId) {
        loadMembersForGym(parseInt(gymId), gymName);
    }
}