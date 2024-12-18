import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GitHub Copilot',
  description: 'AI-powered code completion and assistance'
}

export default function GitHubCopilotPage() {
  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitHub Copilot Assistant</h1>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Ask questions about your code, get explanations, and receive suggestions for improvements.
        </p>
        {/* Chat interface will be added here */}
      </div>
    </div>
  )
} 