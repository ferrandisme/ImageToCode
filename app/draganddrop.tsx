'use client'

import { Dropzone, ExtFile } from '@files-ui/react'

export const DragAndDrop = () => {
	const updateFiles = (files: ExtFile[]) => {}

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
