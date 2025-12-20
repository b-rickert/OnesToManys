import React from 'react';

function MemberList({ members, onEdit, onDelete }) {
  if (members.length === 0) {
    return <p>No members found for this gym</p>;
  }

  return (
    <div id="member-list">
      {members.map(member => (
        <div key={member.id} className="member-card">
          <h3>{member.firstName} {member.lastName}</h3>
          <p>Email: {member.email || 'N/A'}</p>
          <p>Type: {member.membershipType}</p>
          <p>Status: {member.membershipStatus}</p>
          <div className="card-actions">
            <button className="edit-btn" onClick={() => onEdit(member)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(member.id, member.firstName)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberList;