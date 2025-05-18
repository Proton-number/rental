"use client";

import { useEffect } from "react";
import { initAuthListener } from "./utils/initAuthListener";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initAuthListener();
  }, []);

  return <>{children}</>;
}
