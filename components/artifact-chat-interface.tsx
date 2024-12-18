import React, { ReactNode, useRef, useState } from 'react';
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
};

type SuggestedAction = {
  title: string;
  label: string;
  action: string;
};

interface ArtifactChatInterfaceProps {
  artifact: string | undefined;
  suggestedActions: SuggestedAction[];
  message: string | undefined;
  isLoading: boolean;
  stop: () => void;
  submit: (input: any) => void;
}

const ArtifactChatInterface: React.FC<ArtifactChatInterfaceProps> = ({
  artifact,
  suggestedActions,
  message,
  isLoading,
  stop,
  submit
}) => {
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactType | undefined>();
  const [messages, setMessages] = useState<Array<ReactNode>>([]);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const inputRef = useRef<HTMLInputElement>(null);

  const artifacts = messages
    .map((msg: any) => msg.props?.artifact)
    .filter((artifact): artifact is ArtifactType => artifact != null);

  return (
    <div className="h-full w-full flex">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={artifact && artifact.length > 0 ? 70 : 100} minSize={30} className="w-full">
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
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="flex">
              <AIInput submit={submit} />
            </div>
          </Card>
        </ResizablePanel>

        {artifact && artifact.length > 0 && (
          <>
            <ResizableHandle />
            <Artifact
              artifacts={artifacts}
              selectedArtifact={selectedArtifact}
              setSelectedArtifact={setSelectedArtifact}
            />
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default ArtifactChatInterface;