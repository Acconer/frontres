'use client'

import { AuthContainer, AuthLayout } from '@/src/components/AuthPageLayout'
import { validationToken } from '@/src/helpers';
import { useGlobal } from '@/src/store/global/store';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

const LoginPage = () => {
  const setErrors = useGlobal(state => state.setErrors);

  useEffect(() => {
    const getResult = async () => {
      const solved = await validationToken();
      if (solved.errors) {
        setErrors(solved.errors);

        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }

        setTimeout(() => {
          setErrors([]);
        }, 1500);
        return;
      }

      if (solved.user) {
        redirect('/dashboard');
      }
    }
    getResult();
  }, [])

  return (
    <AuthContainer>
      <AuthLayout authTitle="Iniciar Sesión" helpText="Ingresa tu correo y contraseña proporcionado">
      </AuthLayout>
    </AuthContainer>
  )
}

export default LoginPage
