import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deep Reasoning',
  description: 'AI-powered deep reasoning and problem solving'
}

export default function ReasoningPage() {
  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Deep Reasoning Assistant</h1>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Solve complex problems with AI assistance. Get help with algorithms, system design, and architectural decisions.
        </p>
        {/* Chat interface will be added here */}
      </div>
    </div>
  )
} 