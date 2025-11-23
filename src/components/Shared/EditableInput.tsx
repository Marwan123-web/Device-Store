import { useState } from "react";

const EditableInput = ({
  label,
  type = "text",
  value,
  onChange,
  name,
}: {
  label: string;
  type?: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex items-center">
        <input
          type={type}
          value={value}
          disabled={!isEditing}
          onChange={onChange}
          name={name}
          className={`flex-1 border rounded px-3 py-2 focus:outline-none ${
            isEditing
              ? "border-blue-500 focus:border-blue-600 bg-white"
              : "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
          }`}
        />
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          aria-label={isEditing ? "Save" : "Edit"}
        >
          {isEditing ? "💾" : "✏️"}
        </button>
      </div>
    </div>
  );
};

export default EditableInput;
