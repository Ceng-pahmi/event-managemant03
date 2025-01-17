"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../components/ui/tabs";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { Mail, Lock, User } from "lucide-react";
import React from "react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const url = "http://localhost:5000/api/users/login";

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const body = {
      email,
      password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success : ", data);
      } else {
        console.error("Error : ", data.message);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const url = "http://localhost:5000/api/users/register";

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const first_name = (formData.get("first_name") as string) || "";
    const last_name = (formData.get("last_name") as string) || "";
    const referralCode = (formData.get("referralCode") as string) || "";

    const body = {
      email,
      password,
      first_name,
      last_name,
      referralCode,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("success : ", data);
      } else {
        console.error("error : ", data.message);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setIsLoading(false);
    }
  };
}
