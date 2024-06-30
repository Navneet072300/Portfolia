"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { account, ID } from "@/appwrite/auth";

interface User {
  name: string;
  email: string;
  password: string;
  // Add other properties as needed
}

const LoginPage = () => {
  return (
    <div>
      <Button>LoginIn</Button>
    </div>
  );
};

export default LoginPage;
