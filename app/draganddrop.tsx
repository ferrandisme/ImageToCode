'use client'

import { Dropzone, ExtFile } from '@files-ui/react'
import { error } from 'console'

export const DragAndDrop = ({ tranformImageToCode }: { tranformImageToCode: (file: File) => Promise<void> }) => {
	const updateFiles = (files: ExtFile[]) => {
		const file = files[0].file
		if (file) {
			tranformImageToCode(file)
		}
	}

	return (
		<Dropzone
			header={false}
			footer={false}
			maxFiles={1}
			label="Drop file or click for upload"
			accept="image/*"
			onChange={updateFiles}
		/>
	)
}
