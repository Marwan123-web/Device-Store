import React, { useState } from "react";
import EditableInput from "../Shared/EditableInput";
import { profile } from "console";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutationFetch } from "../../hooks/useFetch";
import { updateUser } from "../../redux/user/slice";

const ChangePassword = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag(prev => !prev);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // useMutationFetch for calling login API
  const mutation = useMutationFetch({
    url: "auth/update",
    method: "PUT",
  });
  const updateProfile = () => {
    const { newPassword: password, oldPassword } = passwords;
    if (password === oldPassword) {
      toast.error(t("shared.samePasswords"));
      return;
    }
    mutation.mutate(
      { password, oldPassword },
      {
        onSuccess: (data) => {
          dispatch(updateUser({ password, oldPassword }));
          toast.success(t("shared.updatedSuccessfully"));
          setPasswords({ oldPassword: "", newPassword: "" });
          triggerRefresh();
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
    <>
      <div>
        <EditableInput
          label="Old Password"
          value={passwords.oldPassword}
          onChange={handleChange}
          type="password"
          name="oldPassword"
          Editable={true}
          refresh={refreshFlag}
        />
        <EditableInput
          label="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
          type="password"
          name="newPassword"
          Editable={true}
          refresh={refreshFlag}
        />
      </div>
      <button
        type="submit"
        onClick={updateProfile}
        disabled={mutation.isPending}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {mutation.isPending ? t("shared.save") : t("shared.saving")}
      </button>
    </>
  );
};

export default ChangePassword;
