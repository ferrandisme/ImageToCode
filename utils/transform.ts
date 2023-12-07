export const tranformUrlToCode = async (url: string) => {
	const res = await fetch('/api/generate-code-from-image', {
		method: 'POST',
		body: JSON.stringify({ url }),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok || res.body == null) {
		throw new Error('Error generating code')
	}

	// read data streaming

	const reader = res.body.getReader()
	const decoder = new TextDecoder()

	while (true) {
		const { done, value } = await reader.read()
		const chunk = decoder.decode(value)
		console.log(chunk)
		if (done) break
	}
}
