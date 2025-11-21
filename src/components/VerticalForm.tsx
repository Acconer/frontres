'use client'

import React, { ReactNode } from 'react'

interface VerticalFormProps {
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
	children: ReactNode
}

const VerticalForm = ({  children }: VerticalFormProps) => {
	
	return (
		<form noValidate>
			{children}
		</form>
	)
}

export default VerticalForm
