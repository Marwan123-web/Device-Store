import React, { useState } from 'react'
import EditableInput from '../Shared/EditableInput';

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });

    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setPasswords((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div>
        <EditableInput
          label="Old Password"
          value={passwords.oldPassword}
          onChange={handleChange}
          type="password"
          name="oldPassword"
        />
        <EditableInput
          label="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
          type="password"
          name="newPassword"
        />
      </div>
    );
}

export default ChangePassword
