import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import '@/src/assets/index.scss';

import logo from "@/src/assets/image.png";
import FormAuth from './FormAuth';

interface AccountLayoutProps {
	pageImage?: string
	authTitle?: string
	helpText?: string
	bottomLinks?: ReactNode
	isCombineForm?: boolean
	children?: ReactNode
	hasForm?: boolean
}

const AuthLayout = ({ pageImage, authTitle, helpText, bottomLinks }: AccountLayoutProps) => {
	return (
		<>
			<div className="relative flex flex-col items-center justify-start">
				<div className="flex justify-center items-center">
					<div className="max-w-md px-4 mx-auto">
						<div className="card overflow-hidden">
							<div className="p-2 bg-primary flex">
								<Link href="/" className='mx-auto'>
									<Image src={logo} alt="logo" className="h-56 w-56 block dark:hidden" />
								</Link>
							</div>
							<div className="p-9">
								<div className="text-center mx-auto w-3/4">
									<h4 className={`${pageImage ? 'mt-9' : ''} text-dark/70 text-center text-lg font-bold dark:text-light/80 mb-2`}>{authTitle}</h4>
									<p className="text-gray-400 mb-9">{helpText}</p>
								</div>

								<FormAuth />
							</div>
						</div>

						{bottomLinks}
					</div>
				</div>
			</div>

			<footer className="absolute -bottom-14 inset-x-0">
				<p className="font-medium text-center p-6">{new Date().getFullYear()} © LowSolutions - Software Tech</p>
			</footer>
		</>
	)
}

export default AuthLayout
