'use client'

import { Input } from '@/components/ui/input'

export const FormApiKey = ({ updateKey }: { updateKey: (url: string) => void }) => {
	// <form className="relative w-full flex-center"></form>
	return (
		<div className="flex flex-col gap-4">
			<p>Paste your OpenAI api key:</p>
			<form>
				<Input
					name="openapitoken"
					id="openapitoken"
					type="password"
					placeholder="Your api token"
					onChange={(value) => updateKey(value.target.value)}
				></Input>
				<a
					className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
					href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key"
					target="_blank"
				>
					No api key ? Get one here
				</a>
			</form>
		</div>
	)
}
