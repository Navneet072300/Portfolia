"use client";

import { account, avatars, client } from "@/appwrite/auth";
import { Button } from "@/components/ui/button";
import { Flag } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [flagUrl, setFlagUrl] = useState<string>("");
  const [image, setImage] = useState<string>("");

  console.log({ user });

  const flag = avatars.getFlag(Flag.India).toString();
  const img = avatars.getInitials("Navneet").toString();

  useEffect(() => {
    async function getUser() {
      try {
        const userData = await account.get();
        setUser(userData);
        setFlagUrl(flag);
        setImage(img);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingUser(false);
      }
    }
    getUser();
  }, []);

  async function handleLogout() {
    try {
      await account.deleteSession("current");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (e) {
      console.error(e);
      toast.error("Failed to log out");
    }
  }

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <>
      <div>
        <h1>Home</h1>
        <Button type="button" onClick={handleLogout}>
          Logout
        </Button>
        <div className="my-3">
          <h6>UID: {user.$id}</h6>
          <h6>Name: {user.name}</h6>

          <h6>Email: {user.email}</h6>
          <h6>
            Email Verified:{" "}
            {user.emailVerification ? "Verified" : "Not Verified"}
          </h6>

          <h6>Registered on: {new Date(user.registration).toDateString()}</h6>
          <h6>Last accessed: {new Date(user.accessedAt).toDateString()}</h6>
          <h6>Status: {user.status ? "Active" : "Inactive"}</h6>
        </div>
        {flagUrl && <img src={flagUrl} alt="Country Flag" />}
        {img && <img src={img} alt="Country Flag" />}
      </div>
    </>
  );
};

export default HomePage;
