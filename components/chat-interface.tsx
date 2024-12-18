import React, { useState } from 'react';
import { SendHorizontal, Code, X } from 'lucide-react';

// UI Components
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AIInput from './ui/ai-input';

// Types
type Artifact = {
  id: string;
  content: string;
  type: string;
  language?: string;
  title?: string;
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  artifact?: Artifact;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact>();

  const artifacts = messages
    .filter(msg => msg.artifact)
    .map(msg => msg.artifact!);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Here\'s a sample code artifact.',
        sender: 'assistant',
        timestamp: new Date(),
        artifact: {
          id: 'sample-code',
          title: 'Example Code',
          content: `function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result); // 8`,
          type: 'code',
          language: 'javascript',
        },
      };
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full w-full flex">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={70} minSize={30} className="w-full">
          <Card className="h-full w-full rounded-none border-0">
            <ScrollArea className="h-[calc(100%-4rem)] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                        }`}
                    >
                      {message.content}
                    </div>

                    {message.artifact && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedArtifact(message.artifact)}
                        className="mt-2 flex items-center gap-2"
                      >
                        <Code className="w-4 h-4" />
                        {message.artifact.title || 'View Artifact'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex">
              <AIInput />
            </div>
          </Card>
        </ResizablePanel>
                
        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20} className="w-full">
          <Card className="h-full w-full rounded-none border-0">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Artifacts</h2>
            </div>

            <Tabs defaultValue="current" className="flex-grow flex flex-col h-[calc(100%-4rem)]">
              <TabsList className="px-4 border-b">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="all">All Artifacts</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="flex-grow p-4 mt-0">
                {selectedArtifact ? (
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">
                        {selectedArtifact.title || 'Artifact'}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedArtifact(undefined)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <ScrollArea className="flex-grow">
                      <pre className="p-4 rounded-lg bg-muted">
                        <code className={`language-${selectedArtifact.language || 'plaintext'}`}>
                          {selectedArtifact.content}
                        </code>
                      </pre>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select an artifact to view
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="flex-grow p-4 mt-0">
                <ScrollArea className="h-full">
                  {artifacts.length > 0 ? (
                    <div className="space-y-4">
                      {artifacts.map((artifact) => (
                        <Card
                          key={artifact.id}
                          className="p-4 cursor-pointer hover:bg-accent"
                          onClick={() => setSelectedArtifact(artifact)}
                        >
                          <div className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            <span>{artifact.title || 'Untitled Artifact'}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      No artifacts available
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChatInterface;