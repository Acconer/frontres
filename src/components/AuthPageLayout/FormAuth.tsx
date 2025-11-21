'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import FormInput from '../FormInput';
import { useAuth } from '@/src/store/auth/store';
import { useGlobal } from '@/src/store/global/store';
import { ErrorSchema } from '@/src/Objects';

interface ILoginFunction {
  email: string;
  password: string;
  setErrors: (errors: []) => void;
}

async function login({ email, password, setErrors }: ILoginFunction) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  try {
    const response = await axios.post(url, { email, password });
    return response.data;
  } catch (error: any) {
    setErrors(error.response?.data?.errors || []);
  }
}

const FormAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setErrors = useGlobal((state) => state.setErrors);
  const errors = useGlobal((state) => state.errors || []);
  const setSucess = useGlobal((state) => state.setSucess as (success: { msg: string }[]) => void);
  const sucess = useGlobal((state) => state.sucess || []);

  const email = useAuth((state) => state.email);
  const password = useAuth((state) => state.password);
  const setEmail = useAuth((state) => state.setEmail);
  const setPassword = useAuth((state) => state.setPassword);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await login({ email, password, setErrors });

    if (!data) {
      setTimeout(() => setErrors([]), 3000);
      setIsLoading(false);
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', `Bearer ${data.token}`);
    }

    setErrors([]);
    setSucess([{ msg: 'Iniciando tu sesión...' }]);
    setEmail('');
    setPassword('');

    setTimeout(() => {
      setSucess([]);
      router.push('/dashboard');
    }, 2000);
  };

  const parsedErrors = ErrorSchema.safeParse(errors);

  return (
    <form className="space-y-6" onSubmit={submit}>
      {parsedErrors.success && parsedErrors.data.length > 0 && (
        <div className="mb-6">
          {parsedErrors.data.map((error, index) => (
            <div
              key={index}
              className="bg-danger/10 text-danger border border-danger/20 text-sm rounded-md py-3 px-5 mb-2"
            >
              <div className="flex items-center gap-1.5">
                <i className="ri-close-circle-line text-base"></i>
                <p className="text-sm">
                  Error: <span className="font-bold text-xs">{error.msg}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {sucess.length > 0 && (
        <div className="bg-success/10 text-success border border-success/20 text-sm rounded-md py-3 px-5 mb-2">
          <div className="flex items-center gap-1.5">
            <i className="ri-check-line text-base"></i>
            <p className="text-sm">
              Éxito: <span className="font-bold text-xs">{sucess[0].msg}</span>
            </p>
          </div>
        </div>
      )}

      <FormInput
        label="Correo Electrónico"
        type="email"
        name="username"
        className="form-input"
        placeholder="Ingresalo acá!"
        containerClass="mb-6 space-y-2"
        labelClassName="font-semibold text-gray-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormInput
        label="Contraseña"
        type="text"
        name="password"
        placeholder="Ingresa acá!"
        className="form-input rounded-e-none"
        containerClass="mb-6 space-y-2"
        labelClassName="font-semibold text-gray-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="text-center my-10">
        <button
          className="btn bg-primary text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </div>
    </form>
  );
};

export default FormAuth;
