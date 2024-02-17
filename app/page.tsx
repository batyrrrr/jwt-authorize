"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Header from "./header";
import { getServerSession } from "next-auth";
import { handler } from "./(auth)/api/auth/[...nextauth]/route";

export default function Home() {
  const { data: session } = useSession();
  // данные о сессии
  console.log({ session });

  // компонент хедер который отображает кнопки Войти или Выйти по ситуации
  return (
    <Header />
  );
}
