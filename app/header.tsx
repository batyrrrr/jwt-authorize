"use client";
import { Button } from "@mui/material";
import { getSession, signIn, signOut, useSession } from "next-auth/react";


export default function Header() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="bg-gradient-to-b shadow-lg p-2 flex gap-5 ">
      <div className="ml-auto flex gap-2">
        {/* если новый пользователь, отоброжать кнопку Войти, в другом случае вывод данных на экран */}
        {session?.user ? (
          <>
            <p className="text-sky-600"> {session.user.email}</p>
            <p className="text-sky-600"> {session.user.jwt}</p>
            <Button variant="outlined"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="outlined"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}