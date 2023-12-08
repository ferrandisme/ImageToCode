'use client'

import { Button } from '@/components/ui/button'
import { DragAndDrop } from './draganddrop'
import { Form } from './form'
import { useState } from 'react'
import { FormApiKey } from './formApiKey'

const STEPS = {
	INITIAL: 'INITIAL',
	LOADING: 'LOADING',
	PREVIEW: 'PREVIEW',
	ERROR: 'ERROR',
}

async function* streamReader(res: Response) {
	const reader = res.body?.getReader()
	const decoder = new TextDecoder()

	if (!reader) return

	while (true) {
		const { done, value } = await reader.read()
		const chunk = decoder.decode(value)
		yield chunk
		if (done) break
	}
}

export default function Home() {
	const [apiKey, setApiKey] = useState('')
	const [result, setResult] = useState('')
	const [step, setStep] = useState(STEPS.INITIAL)

	const toBase64 = (file: File) => {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = (error) => reject(error)
		})
	}

	const transformToCode = async (body: string) => {
		setStep(STEPS.LOADING)
		const res = await fetch('/api/generate-code-from-image', {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok || res.body == null) {
			setStep(STEPS.ERROR)
			throw new Error('Error generating code')
		}

		setStep(STEPS.PREVIEW)

		// read data streaming
		for await (const chunk of streamReader(res)) {
			setResult((actual) => actual + chunk)
		}
	}

	const tranformUrlToCode = async (url: string) => {
		transformToCode(JSON.stringify({ url, apiKey }))
	}

	const tranformImageToCode = async (file: File) => {
		const img = await toBase64(file)
		transformToCode(JSON.stringify({ img, apiKey }))
	}

	const copyCode = () => {
		navigator.clipboard.writeText(result)
	}

	return (
		<div>
			<div className="heigh-screen">
				<aside className="flex flex-col justify-between p-4 bg-blue-800">
					<header className="text-center">
						<h1 className="text-3xl font-semibold">Image2Code</h1>
						<h2 className="text-sm opacity-75">From an Image to Code using OpenAI GPT Vision</h2>
						<section> {/*TODO Filters*/}</section>
					</header>
				</aside>
				<main className="">
					<section className="max-w-5xl mx-auto p-10">
						{step === STEPS.LOADING && (
							<div role="status">
								<svg
									aria-hidden="true"
									className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
								<span className="sr-only">Loading...</span>
							</div>
						)}
						{step === STEPS.INITIAL && (
							<div className="flex flex-col gap-4">
								{(!apiKey || apiKey.length < 10) && <FormApiKey updateKey={setApiKey} />}
								{apiKey && apiKey.length >= 10 && (
									<>
										<p>Drag and drop and image or paste an url</p>
										<DragAndDrop tranformImageToCode={tranformImageToCode} />
										<Form tranformUrlToCode={tranformUrlToCode} />
									</>
								)}
							</div>
						)}
						{step === STEPS.PREVIEW && (
							<div className="rounded  h-fullflex flex-col gap-4">
								<iframe
									srcDoc={result}
									className="w-full h-full hiframe border-2 rounded border-gray-700 aspect-video"
								/>
								<Button onClick={copyCode}>Copy code</Button>
								<pre>
									<code>{result}</code>
								</pre>
							</div>
						)}
					</section>
				</main>
			</div>
			<footer className="text-center">
				<a href="https://ferrandis.me" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
					Created by Adrian Ferrandis
				</a>
			</footer>
		</div>
	)
}
