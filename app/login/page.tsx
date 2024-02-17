"use client";

import TextField from "@mui/material/TextField"
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import { Button, Checkbox, InputAdornment, Stack, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

interface InputProps {
  username: string
  password: string
}

// Страница Авторизации
const LoginPage = () => {
  // стейт для кнопки,для управления 
  const [pending, setPending] = useState(false)
  // инпуты
  const [input, setInput] = useState<InputProps>({
    username: '',
    password: ''
  })

  const onSubmit = async () => {
    try {
      // после нажатия кнопку переводим в режим disabled
      setPending(true)
      // тип аутентификации credentials, необходимые данные для отправки username и password
      const result = await signIn("credentials", {
        username: input.username,
        password: input.password,
        // redirect при успешной авторизации
        redirect: true,
        callbackUrl: "/"
      })
    } catch (error) {
      setPending(false)
    }
  }

  // onChange для инпута
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 items-center justify-center bg-gradient-to-b from-blue-300 to-blue-500 ">
      <div className="md:w-[450px] md:h-[600px]  md:p-[55px] w-[300px] h-[500px] p-[40px] flex flex-col items-center justify-between bg-white rounded-xl shadow-md">
        <Stack alignItems={'center'} gap={1}>
          <Image
            src='/xxs.png'
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <p className="text-[32px] text-blue-400">Sign In</p>
        </Stack>
        <Box>
          <TextField
            name="username"
            placeholder="Username"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            sx={{ width: '100%', marginBottom: '50px' }}
            onChange={handleInput}
          />
          <TextField
            name="password"
            placeholder="Password"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: '100%' }}
            onChange={handleInput}
          />
          <Stack direction={'row'} alignItems={'center'} marginRight={'auto'} width={'full'} marginTop={'30px'}>
            <Checkbox />
            <p>Keep me signed in</p>
          </Stack>
        </Box>
        <button
          className={`rounded-2xl p-[15px]  w-full text-white ${pending ? 'bg-gray-500' : 'bg-blue-600'}`} disabled={pending}
          onClick={onSubmit}
        >SIGN IN
        </button>
        <p className="opacity-50 cursor-pointer">Forgot Password?</p>
      </div>
      <p className="text-white cursor-pointer">Not a member? Sign up</p>
    </div>
  )
}

export default LoginPage
