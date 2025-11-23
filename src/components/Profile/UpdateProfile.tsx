import React, { useState } from 'react'
import EditableInput from '../Shared/EditableInput';
import { useSelector } from 'react-redux';

const UpdateProfile = () => {
    const user = useSelector((state: any) => state.user);    
    const [profile, setProfile] = useState({ name: user?.name ?? '', email: user?.email ??'' });

    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setProfile((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div>
        <EditableInput
          label="Name"
          value={profile.name}
          onChange={handleChange}
          type="text"
          name="name"
        />
        <EditableInput
          label="Email"
          value={profile.email}
          onChange={handleChange}
          type="email"
          name="email"
        />
      </div>
    );
}

export default UpdateProfile
