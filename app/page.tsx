import { Button } from '@/components/ui/button'
import { Form } from './form'

export default function Home() {
	return (
		<div className="grid grid-cols-[400px_1fr]">
			<aside className="flex flex-col justify-between min-h-screen p-4 bg-gray-900">
				<header className="text-center">
					<h1 className="text-3xl font-semibold">Image2Code</h1>
					<h2 className="text-sm opacity-75">From an Image to Code using OpenAI GPT last tech</h2>
				</header>
				<section> {/*Filters placeholder*/}</section>
			</aside>
			<main className="bg-gray-900">
				<section className="max-w-2xl mx-auto p-10">
					<Form />
				</section>
			</main>
			<footer>Created by Adrian Ferrandis</footer>
		</div>
	)
}
