import { Request, Response } from 'express';
import { Message } from '../agent/types';

/**
 * Extended Express Request with query property
 */
export interface QueryRequest extends Request {
  body: {
    query: string;
    [key: string]: any;
  };
}

/**
 * Interface for creating a run input for the Mastra agent
 */
export interface AgentRunInput {
  threadId: string;
  runId: string;
  state: any;
  messages: Message[];
  tools: any[];
  context: any[];
  forwardedProps: any;
}

/**
 * Factory function to create a user message
 */
export function createUserMessage(content: string): Message {
  return {
    id: `msg-${Date.now()}`,
    role: 'user',
    content: content
  };
}

/**
 * Factory function to create a run input for the Mastra agent
 */
export function createRunInput(query: string): AgentRunInput {
  return {
    threadId: `thread-${Date.now()}`,
    runId: `run-${Date.now()}`,
    state: {},
    messages: [createUserMessage(query)],
    tools: [],
    context: [],
    forwardedProps: {}
  };
}