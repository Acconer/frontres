/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import {useState} from 'react';

interface PasswordInputProps {
    name: string
    placeholder?: string
    refCallback?: any
    errors: any
    control?: any
    register?: any
    className?: string
}

/* Password Input */
const PasswordInput = ({ name, placeholder, refCallback, errors, register, className }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <>
            <div className="flex items-center">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    ref={(r: HTMLInputElement) => {
                        if (refCallback) refCallback(r)
                    }}
                    className={`${className} ${errors && errors[name] ? 'border-red-500 text-red-700 -me-px' : ''}`}
                    {...(register ? register(name) : {})}
                    autoComplete={name}
                />
                <span
                    className="px-3 py-1 border rounded-e-md -ms-px dark:border-white/10"
                    onClick={() => {
                        setShowPassword(!showPassword)
                    }}
                >
                    <i className={`${showPassword ? 'ri-eye-close-line' : 'ri-eye-line'} text-lg`}></i>
                </span>
            </div>
        </>
    )
}

export default PasswordInput