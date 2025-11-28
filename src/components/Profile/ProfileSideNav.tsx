import React, { useState } from "react";
import Orders from "./Orders";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";
import SideNav from "../Shared/SideNav";
import { resetUser } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManageOrders from "./ManageOrders";

const ProfileSideNav = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(resetUser());
    navigate("/");
  };
  let content;
  if (activeTab === "profile") content = <UpdateProfile />;
  else if (activeTab === "password") content = <ChangePassword />;
  else if (activeTab === "orders") content = <Orders />;
  else if (activeTab === "manage orders") content = <ManageOrders />;
  else if (activeTab === "logout") logout();

  return (
    <div className="flex mx-2 mt-10 border rounded shadow-lg">
      <SideNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">{content}</main>
    </div>
  );
};

export default ProfileSideNav;
