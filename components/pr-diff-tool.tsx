"use client"

import * as React from "react"
import { File, Folder, Send } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

// Sample data structure for the file tree
const fileTree = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "components", type: "folder", children: [
        { name: "Button.tsx", type: "file" },
        { name: "Input.tsx", type: "file" },
      ]},
      { name: "pages", type: "folder", children: [
        { name: "index.tsx", type: "file" },
        { name: "about.tsx", type: "file" },
      ]},
      { name: "styles", type: "folder", children: [
        { name: "globals.css", type: "file" },
      ]},
    ],
  },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
]

// Sample diff data
const sampleDiff = `import React from 'react';

const Button = ({ children, onClick }) => {
-  return <button onClick={onClick}>{children}</button>;
+  return (
+    <button
+      className="px-4 py-2 bg-blue-500 text-white rounded"
+      onClick={onClick}
+    >
+      {children}
+    </button>
+  );
};

export default Button;`

// Sample improvements summary
const sampleImprovements = [
  "Added styling to the button component",
  "Improved readability by breaking the JSX into multiple lines",
  "Used template literals for className to improve maintainability"
]

export function PRDiffTool() {
  const [open, setOpen] = React.useState(true)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [chatInput, setChatInput] = React.useState("")

  const renderFileTree = (items) => {
    return items.map((item) => {
      if (item.type === "folder") {
        return (
          <Collapsible key={item.name}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <Folder className="mr-2" />
                {item.name}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenu className="ml-4">
                {renderFileTree(item.children)}
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        )
      } else {
        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton onClick={() => setSelectedFile(item.name)}>
              <File className="mr-2" />
              {item.name}
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      }
    })
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the chat message to a backend or AI service
    console.log("Chat message submitted:", chatInput)
    setChatInput("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Open PR Diff</Button>
      </DialogTrigger>
      <DialogContent className="max-w-full max-h-[90vh] w-[90vw] overflow-hidden p-0">
        <DialogTitle className="sr-only">Pull Request Diff</DialogTitle>
        <DialogDescription className="sr-only">
          View and compare changes in the pull request.
        </DialogDescription>
        <SidebarProvider className="h-[90vh] flex">
          <Sidebar collapsible="none" className="w-64 border-r">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>{renderFileTree(fileTree)}</SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center border-b px-4">
              <h2 className="text-lg font-semibold">
                {selectedFile || "Select a file"}
              </h2>
            </header>
            <div className="flex-1 overflow-auto p-4">
              <h3 className="mb-2 text-sm font-medium">Diff:</h3>
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                showLineNumbers
                wrapLines
                lineProps={(lineNumber) => {
                  const style: React.CSSProperties = { display: 'block' }
                  if (sampleDiff.split('\n')[lineNumber - 1].startsWith('+')) {
                    style.backgroundColor = 'rgba(0, 255, 0, 0.2)'
                  } else if (sampleDiff.split('\n')[lineNumber - 1].startsWith('-')) {
                    style.backgroundColor = 'rgba(255, 0, 0, 0.2)'
                  }
                  return { style }
                }}
              >
                {sampleDiff}
              </SyntaxHighlighter>
              <h3 className="mt-4 mb-2 text-sm font-medium">Improvements:</h3>
              <ul className="list-disc pl-5">
                {sampleImprovements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
            <div className="border-t p-4">
              <h3 className="mb-2 text-sm font-medium">Ask a question about the code:</h3>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your question here..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

