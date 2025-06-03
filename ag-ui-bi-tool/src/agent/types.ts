/**
 * This file contains type definitions for the Mastra agent implementation.
 * These types are used to ensure type safety when working with the AG-UI protocol.
 */

// Define the Message type
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool' | 'developer';
  content?: string;
  name?: string;
  toolCalls?: ToolCall[];
  toolCallId?: string;
}

// Define the ToolCall type
export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

// Define the Context type
export interface Context {
  description: string;
  value: string;
}

// Define the Tool type
export interface Tool {
  name: string;
  description: string;
  parameters: any; // JSON Schema for the tool parameters
}

// Define the RunAgentInput type
export interface RunAgentInput {
  threadId: string;
  runId: string;
  state: any;
  messages: Message[];
  tools: Tool[];
  context: Context[];
  forwardedProps: any;
}

// Define the EventType enum
export enum EventType {
  TEXT_MESSAGE_START = "TEXT_MESSAGE_START",
  TEXT_MESSAGE_CONTENT = "TEXT_MESSAGE_CONTENT",
  TEXT_MESSAGE_END = "TEXT_MESSAGE_END",
  TEXT_MESSAGE_CHUNK = "TEXT_MESSAGE_CHUNK",
  TOOL_CALL_START = "TOOL_CALL_START",
  TOOL_CALL_ARGS = "TOOL_CALL_ARGS",
  TOOL_CALL_END = "TOOL_CALL_END",
  TOOL_CALL_CHUNK = "TOOL_CALL_CHUNK",
  STATE_SNAPSHOT = "STATE_SNAPSHOT",
  STATE_DELTA = "STATE_DELTA",
  MESSAGES_SNAPSHOT = "MESSAGES_SNAPSHOT",
  RAW = "RAW",
  CUSTOM = "CUSTOM",
  RUN_STARTED = "RUN_STARTED",
  RUN_FINISHED = "RUN_FINISHED",
  RUN_ERROR = "RUN_ERROR",
  STEP_STARTED = "STEP_STARTED",
  STEP_FINISHED = "STEP_FINISHED",
}

// Define the BaseEvent type
export interface BaseEvent {
  type: EventType;
  timestamp?: number;
  rawEvent?: any;
}

// Define specific event types
export interface RunStartedEvent extends BaseEvent {
  type: EventType.RUN_STARTED;
  threadId: string;
  runId: string;
}

export interface RunFinishedEvent extends BaseEvent {
  type: EventType.RUN_FINISHED;
  threadId: string;
  runId: string;
}

export interface RunErrorEvent extends BaseEvent {
  type: EventType.RUN_ERROR;
  message: string;
  code?: string;
}

// Define the AbstractAgent class
export abstract class AbstractAgent {
  protected abstract run(input: RunAgentInput): any;
}