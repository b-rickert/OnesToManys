const { createApp } = Vue;

createApp({
    data() {
        return {
            gyms: [],
            members: [],
            selectedGymName: 'Select a gym to view members',
            selectedGymId: null,
            showAddGymForm: false,
            showAddMemberForm: false,
            newGym: {
                name: '',
                address: '',
                city: '',
                state: '',
                phoneNumber: '',
                operatingHours: '',
                numberOfEquipment: null,
                gymType: '',
                monthlyRate: null
            },
            newMember: {
                gymId: null,
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
            },
            apiBaseUrl: 'http://localhost:8080/api'
        }
    },
    
    mounted() {
        this.fetchGyms();
    },
    
    methods: {
        // Fetch all gyms
        async fetchGyms() {
            try {
                const response = await fetch(`${this.apiBaseUrl}/gyms`);
                this.gyms = await response.json();
            } catch (error) {
                console.error('Error fetching gyms:', error);
                alert('Failed to load gyms');
            }
        },
        
        // Create a new gym
        async createGym() {
            try {
                const response = await fetch(`${this.apiBaseUrl}/gyms`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newGym)
                });
                
                if (response.ok) {
                    alert('Gym added successfully!');
                    this.resetGymForm();
                    this.showAddGymForm = false;
                    await this.fetchGyms();
                }
            } catch (error) {
                console.error('Error creating gym:', error);
                alert('Failed to add gym');
            }
        },
        
        // Edit gym (placeholder - we'll add edit forms later if needed)
        editGym(gym) {
            alert(`Edit functionality: Would edit ${gym.name}`);
            // For now, just show an alert. Full edit can be added like vanilla JS
        },
        
        // Delete a gym
        async deleteGym(id, name) {
            if (!confirm(`Are you sure you want to delete ${name}?`)) return;
            
            try {
                const response = await fetch(`${this.apiBaseUrl}/gyms/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    alert('Gym deleted successfully!');
                    await this.fetchGyms();
                }
            } catch (error) {
                console.error('Error deleting gym:', error);
                alert('Failed to delete gym');
            }
        },
        
        // Load members for a specific gym
        async loadMembers(gymId, gymName) {
            try {
                this.selectedGymId = gymId;
                this.selectedGymName = `Members of ${gymName}`;
                const response = await fetch(`${this.apiBaseUrl}/gyms/${gymId}/members`);
                this.members = await response.json();
            } catch (error) {
                console.error('Error loading members:', error);
                alert('Failed to load members');
            }
        },
        
        // Create a new member
        async createMember() {
            try {
                const response = await fetch(`${this.apiBaseUrl}/members`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newMember)
                });
                
                if (response.ok) {
                    alert('Member added successfully!');
                    this.resetMemberForm();
                    this.showAddMemberForm = false;
                    
                    // Reload members if a gym is selected
                    if (this.selectedGymId) {
                        await this.loadMembers(this.selectedGymId, this.selectedGymName.replace('Members of ', ''));
                    }
                }
            } catch (error) {
                console.error('Error creating member:', error);
                alert('Failed to add member');
            }
        },
        
        // Edit member (placeholder)
        editMember(member) {
            alert(`Edit functionality: Would edit ${member.firstName} ${member.lastName}`);
        },
        
        // Delete a member
        async deleteMember(id, firstName) {
            if (!confirm(`Are you sure you want to delete ${firstName}?`)) return;
            
            try {
                const response = await fetch(`${this.apiBaseUrl}/members/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    alert('Member deleted successfully!');
                    
                    // Reload members for current gym
                    if (this.selectedGymId) {
                        await this.loadMembers(this.selectedGymId, this.selectedGymName.replace('Members of ', ''));
                    }
                }
            } catch (error) {
                console.error('Error deleting member:', error);
                alert('Failed to delete member');
            }
        },
        
        // Reset gym form
        resetGymForm() {
            this.newGym = {
                name: '',
                address: '',
                city: '',
                state: '',
                phoneNumber: '',
                operatingHours: '',
                numberOfEquipment: null,
                gymType: '',
                monthlyRate: null
            };
        },
        
        // Reset member form
        resetMemberForm() {
            this.newMember = {
                gymId: null,
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
            };
        }
    }
}).mount('#app');