"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { Button, type ButtonProps } from "@/components/atoms/Button/Button";

export type LogoutButtonProps = Omit<ButtonProps, "onClick" | "children">;

/** Tombol Logout: hapus status login lalu kembali ke halaman login. */
export function LogoutButton(props: LogoutButtonProps) {
  const router = useRouter();

  return (
    <Button
      hierarchy="secondary-outline"
      iconLeft="logout"
      {...props}
      onClick={() => {
        logout();
        router.replace("/login");
      }}
    >
      Logout
    </Button>
  );
}
