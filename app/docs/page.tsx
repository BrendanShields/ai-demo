import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation Copilot',
  description: 'AI-powered documentation assistance'
}

export default function DocsPage() {
  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Documentation Assistant</h1>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Get help understanding documentation, frameworks, and libraries. Ask questions about any tech documentation.
        </p>
        {/* Chat interface will be added here */}
      </div>
    </div>
  )
} 