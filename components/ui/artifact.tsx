import React, { ReactNode } from 'react'
import { ResizablePanel } from './resizable'
import { Card } from './card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Button } from './button'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ArtifactType } from '../artifact-chat-interface'
import { Code, X } from 'lucide-react'

interface ArtifactProps {
  artifacts: ArtifactType[];
  selectedArtifact: ArtifactType | undefined;
  setSelectedArtifact: (artifact: ArtifactType | undefined) => void;
}

const Artifact: React.FC<ArtifactProps> = ({
  artifacts,
  selectedArtifact,
  setSelectedArtifact
}) => {
  return (
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
  )
}

export default Artifact;
