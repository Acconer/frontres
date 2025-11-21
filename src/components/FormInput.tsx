/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputHTMLAttributes, ReactNode } from 'react'

import { Control } from 'react-hook-form'
import PasswordInput from './PasswordInput'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	type?: string
	name: string
	placeholder?: string
	register?: any
	errors?: any
	control?: Control<any>
	className?: string
	labelContainerClassName?: string
	labelClassName?: string
	containerClass?: string
	refCallback?: any
	children?: ReactNode
	rows?: number
}

const FormInput = ({ label, type, name, placeholder, register, errors, className, labelClassName, labelContainerClassName, containerClass, refCallback, children, rows, ...otherProps }: FormInputProps) => {
	const Tag = type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input'
	return (
		<>
			{type === 'hidden' ? (
				<input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />
			) : (
				<>
					{type === 'password' ? (
						<>
							<div className={containerClass ?? ''}>
								{label && (
									<div className={labelContainerClassName ?? ''}>
										<label className={labelClassName ?? ''} htmlFor={name}>
											{label}
										</label>
										{children}
									</div>
								)}
								<PasswordInput name={name} placeholder={placeholder} refCallback={refCallback} errors={errors} register={register} className={className} />
								{errors && errors[name] && (
									<>
										<div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
											<i className="mgc_warning_fill text-xl text-red-500" />
										</div>
										<p className="text-xs text-red-600 mt-2"> {errors[name]['message']}</p>
									</>
								)}
							</div>
						</>
					) : (
						<>
							{type === 'textarea' ? (
								<>
									<div className={`${containerClass ?? ''} relative`}>
										{label ? (
											<label className={labelClassName ?? ''} htmlFor={name}>
												{label}
											</label>
										) : null}
										<Tag
											placeholder={placeholder}
											name={name}
											id={name}
											rows={rows}
											ref={(r: HTMLInputElement) => {
												if (refCallback) refCallback(r)
											}}
											className={`${className} ${errors && errors[name] ? 'border-red-500 focus:border-red-500 text-red-700  pe-10' : ''}`}
											{...(register ? register(name) : {})}
											{...otherProps}
											autoComplete={name}
										/>
									</div>
								</>
							) : (
								<>
									{type === 'select' ? (
										<>
											<div className={`${containerClass ?? ''} relative`}>
												{label && (
													<label className={labelClassName ?? ''} htmlFor={name}>
														{label}
													</label>
												)}
												<Tag
													name={name}
													id={name}
													ref={(r: HTMLSelectElement) => {
														if (refCallback) refCallback(r)
													}}
													className={className}
													{...(register ? register(name) : {})}
													{...otherProps}
													autoComplete={name}
												>
													{children}
												</Tag>
											</div>
										</>
									) : (
										<>
											{type === 'checkbox' || type === 'radio' ? (
												<>
													<div className={containerClass ?? ''}>
														<div className="flex items-center">
															<input
																type={type}
																name={name}
																id={name}
																ref={(r: HTMLInputElement) => {
																	if (refCallback) refCallback(r)
																}}
																className={`${className} ${errors && errors[name] ? 'border-red-500 focus:border-red-500 text-red-700  pe-10' : ''}`}
																{...(register ? register(name) : {})}
																{...otherProps}
															/>
															<label className={labelClassName ?? ''} htmlFor={name}>
																{label}
															</label>
														</div>
													</div>
												</>
											) : (
												<>
													<div className={containerClass ?? ''}>
														{label && (
															<label className={labelClassName ?? ''} htmlFor={name}>
																{label}
															</label>
														)}
														<div className="relative">
															<input
																type={type}
																placeholder={placeholder}
																name={name}
																id={name}
																ref={(r: HTMLInputElement) => {
																	if (refCallback) refCallback(r)
																}}
																className={`${className} ${errors && errors[name] ? 'border-red-500 focus:border-red-500 text-red-700  pe-10' : ''}`}
																{...(register ? register(name) : {})}
																{...otherProps}
																autoComplete={name}
															/>
															{errors && errors[name] && (
																<div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
																	<i className="ri-error-warning-fill text-xl text-red-500" />
																</div>
															)}
														</div>
														{errors && errors[name] && <p className="text-xs text-red-600 mt-2">{errors[name]['message']}</p>}
														{children ? children : null}
													</div>
												</>
											)}
										</>
									)}
								</>
							)}
						</>
					)}
				</>
			)}
		</>
	)
}

export default FormInput
