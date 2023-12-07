'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Form = ({ tranformUrlToCode }: { tranformUrlToCode: (url: string) => void }) => {
	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={(evt) => {
				evt.preventDefault()

				const form = evt.currentTarget as HTMLFormElement
				const url = form.elements.namedItem('url') as HTMLInputElement

				tranformUrlToCode(url.value)
			}}
		>
			<Label htmlFor="url">Image URL</Label>
			<Input name="url" id="url" type="url" placeholder="https:://your-screenshoot/image.png"></Input>
			<span></span>
			<div className="flex justify-center ">
				<Button className="max-w-min">Generate image code</Button>
			</div>
		</form>
	)
}
