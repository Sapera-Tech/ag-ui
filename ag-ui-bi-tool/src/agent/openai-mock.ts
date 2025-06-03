/**
 * This file contains a mock implementation of the OpenAI client.
 * It's used for development and testing purposes when the actual OpenAI API is not needed.
 */

class OpenAI {
  private apiKey: string;

  constructor(options: { apiKey: string }) {
    this.apiKey = options.apiKey;
  }

  /**
   * Mock implementation of the chat completions API
   */
  public chat = {
    completions: {
      create: async (params: any) => {
        // Mock response
        return {
          id: 'mock-completion-id',
          object: 'chat.completion',
          created: Date.now(),
          model: params.model || 'gpt-3.5-turbo',
          choices: [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: 'This is a mock response from the OpenAI API.',
              },
              finish_reason: 'stop',
            },
          ],
          usage: {
            prompt_tokens: 10,
            completion_tokens: 20,
            total_tokens: 30,
          },
        };
      },
    },
  };
}

export default OpenAI;