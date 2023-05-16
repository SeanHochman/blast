import React from "react";
import { useSession } from "next-auth/react";
import { Form } from "./Form";

export const NewBlastForm = () => {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return <Form />;
};
