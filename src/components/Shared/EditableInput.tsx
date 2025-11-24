import { useState, useEffect } from "react";

const EditableInput = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  onSave,
  Editable = false,
  refresh = false, // boolean to trigger refresh
}: {
  label: string;
  type?: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: () => void;
  Editable?: boolean;
  refresh?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(Editable);
  const [showPassword, setShowPassword] = useState(false);

  const handleButtonClick = () => {
    if (isEditing && onSave) {
      onSave();
    }
    setIsEditing(!isEditing);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Reset states when refresh changes
  useEffect(() => {
    setIsEditing(Editable);
    setShowPassword(false);
  }, [refresh, Editable]);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex items-center">
        <input
          type={inputType}
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

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}

        <button
          type="button"
          onClick={handleButtonClick}
          className={
            "ml-2 text-blue-500 hover:text-blue-700 focus:outline-none " +
            (Editable ? "hidden" : "")
          }
          aria-label={isEditing ? "Save" : "Edit"}
        >
          {isEditing ? "💾" : "✏️"}
        </button>
      </div>
    </div>
  );
};

export default EditableInput;
