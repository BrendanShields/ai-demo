"use client"

import * as React from "react"
import { File, Folder } from 'lucide-react'

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
const sampleDiff = `@@ -1,7 +1,7 @@
 import React from 'react';
 
 const Button = ({ children, onClick }) => {
-  return <button onClick={onClick}>{children}</button>;
+  return <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>{children}</button>;
 };
 
 export default Button;`

export function PRDiffTool() {
  const [open, setOpen] = React.useState(true)
  const [selectedFile, setSelectedFile] = React.useState(null)

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
        <SidebarProvider className="h-[90vh]">
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
              {selectedFile && (
                <>
                  <h3 className="mb-2 text-sm font-medium">Diff:</h3>
                  <pre className="rounded bg-gray-100 p-4 text-sm">
                    <code>{sampleDiff}</code>
                  </pre>
                </>
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

