"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";
import { VariablesProvider } from "@/context/Variables";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <UserProvider>
        <VariablesProvider>{children}</VariablesProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default Providers;
