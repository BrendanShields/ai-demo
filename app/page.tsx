'use client'

import { experimental_useObject } from 'ai/react';
import { artifactResponseSchema } from './api/generate-component/route';
import ArtifactChatInterface from '@/components/artifact-chat-interface';

export default function Page() {
  const { isLoading, stop, object, submit } = experimental_useObject({
    headers: { 'X-Custom-Header': 'CustomValue' },
    api: '/api/generate-component',
    schema: artifactResponseSchema,
  });

  const suggestedActions = [
    {
      title: "Create a landing page",
      label: "Generate a modern landing page",
      action: "Create a landing page for a SaaS product"
    },
    {
      title: "Build a form",
      label: "Generate a form component",
      action: "Create a contact form with validation"
    }
  ];

  return (
    <div className="h-full p-4">
      <ArtifactChatInterface
        suggestedActions={suggestedActions} 
        artifact={object?.artifact} 
        message={object?.message} 
        isLoading={isLoading}
        stop={stop}
        submit={submit}
      />
    </div>
  );
}