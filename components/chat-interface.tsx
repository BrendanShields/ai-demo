import React, { ReactNode, useRef, useState } from 'react';
import { useActions } from "ai/rsc";
import { motion } from "framer-motion";

// UI Components
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AIInput from './ui/ai-input';
import { useScrollToBottom } from './hooks/use-scroll-to-bottom';
import { Message } from './ui/messages';
import Artifact from './ui/artifact';

// Types
export type ArtifactType = {
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
  artifact?: ArtifactType;
};

type SuggestedAction = {
  title: string;
  label: string;
  action: string;
};

interface ChatInterfaceProps {
  showArtifactPanel?: boolean;
  suggestedActions: SuggestedAction[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  showArtifactPanel = false,
  suggestedActions
}) => {
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactType | undefined>();
  const [messages, setMessages] = useState<Array<ReactNode>>([]);
  const [input, setInput] = useState<string>("");
  const [messagesContainerRef, messagesEndRef] =
  useScrollToBottom<HTMLDivElement>();

  const inputRef = useRef<HTMLInputElement>(null);
  
  const artifacts = messages
    .map((msg: any) => msg.props?.artifact)
    .filter((artifact): artifact is ArtifactType => artifact != null);

  return (
    <div className="h-full w-full flex">
          <Card className="h-full w-full rounded-none border-0">
            <ScrollArea className="h-[calc(100%-4rem)] p-4">
              <div className="flex flex-row justify-center pb-20 h-dvh bg-white dark:bg-zinc-900">
                <div className="flex flex-col justify-between gap-4">
                  <div
                    ref={messagesContainerRef}
                    className="flex flex-col gap-3 h-full w-dvw items-center overflow-y-scroll"
                  >
                    {messages.length === 0 && (
                      <motion.div className="h-[350px] px-4 w-full md:w-[500px] md:px-0 pt-20">
                        <div className="border rounded-lg p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
                          <p>
                            You can ask me to generate any website or component.
                          </p>
                        </div>
                      </motion.div>
                    )}
                    {messages.map((message) => message)}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 w-full px-4 md:px-0 mx-auto md:max-w-[500px] mb-4">
                    {messages.length === 0 &&
                      suggestedActions.map((action: { title: string; label: string; action: string }, index: number) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.01 * index }}
                          key={index}
                          className={index > 1 ? "hidden sm:block" : "block"}
                        >
                          <button
                            onClick={async () => {
                              setMessages((messages) => [
                                ...messages,
                                <Message
                                  key={messages.length}
                                  role="user"
                                  content={action.action}
                                />,
                              ]);
                              const response: ReactNode = await sendMessage(
                                action.action,
                              );
                              setMessages((messages) => [...messages, response]);
                            }}
                            className="w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
                          >
                            <span className="font-medium">{action.title}</span>
                            <span className="text-zinc-500 dark:text-zinc-400">
                              {action.label}
                            </span>
                          </button>
                        </motion.div>
                      ))}
                  </div>

                  <form
                    className="flex flex-col gap-2 relative items-center"
                    onSubmit={async (event) => {
                      event.preventDefault();

                      setMessages((messages) => [
                        ...messages,
                        <Message key={messages.length} role="user" content={input} />,
                      ]);
                      setInput("");

                      const response: ReactNode = await sendMessage(input);
                      setMessages((messages) => [...messages, response]);
                    }}
                  >
                    <input
                      ref={inputRef}
                      className="bg-zinc-100 rounded-md px-2 py-1.5 w-full outline-none dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300 md:max-w-[500px] max-w-[calc(100dvw-32px)]"
                      placeholder="Send a message..."
                      value={input}
                      onChange={(event) => {
                        setInput(event.target.value);
                      }}
                    />
                  </form>
                </div>
              </div>

            </ScrollArea>

            <div className="flex">
              <AIInput />
            </div>
          </Card>
    </div>
  );
};

export default ChatInterface;