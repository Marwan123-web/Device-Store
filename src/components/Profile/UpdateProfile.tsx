import React, { useState } from "react";
import EditableInput from "../Shared/EditableInput";
import { useDispatch, useSelector } from "react-redux";
import { useMutationFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { updateUser } from "../../redux/user/slice";

const UpdateProfile = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // useMutationFetch for calling login API
  const mutation = useMutationFetch({
    url: "auth/update",
    method: "PUT",
  });

  const updateProfile = () => {
    const { email, name } = profile;
    mutation.mutate(
      { email, name },
      {
        onSuccess: (data) => {
          dispatch(updateUser({ email, name }));
          toast.success(t("shared.updatedSuccessfully"));
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message?.[lang] || t("auth.loginFailed");
          toast.error(errorMessage);
          console.error("Login failed:", error);
        },
      }
    );
  };

  return (
    <div>
      <EditableInput
        label="Name"
        value={profile.name}
        onChange={handleChange}
        type="text"
        name="name"
        onSave={updateProfile}
      />
      <EditableInput
        label="Email"
        value={profile.email}
        onChange={handleChange}
        type="email"
        name="email"
        onSave={updateProfile}
      />
    </div>
  );
};

export default UpdateProfile;
