import express from 'express';
import cors from 'cors';
import { MastraAgent } from '../agent/mastra-agent';
import config from '../config';
import { QueryRequest, createRunInput } from './types';

// Create Express server
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

// Create Mastra agent instance
const mastraAgent = new MastraAgent();

// Define routes
app.post('/api/query', async (req: QueryRequest, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    // Create a run input with the query
    const runInput = createRunInput(query);
    
    // Set up SSE for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Subscribe to agent events and forward them to the client
    // @ts-ignore - We're ignoring the protected access warning
    const subscription = (mastraAgent as any).run(runInput).subscribe({
      next: (event: any) => {
        res.write(`data: ${JSON.stringify(event)}\n\n`);
      },
      error: (error: Error) => {
        console.error('Error in agent run:', error);
        res.write(`data: ${JSON.stringify({ 
          type: 'RUN_ERROR', 
          message: error.message 
        })}\n\n`);
        res.end();
      },
      complete: () => {
        res.end();
      }
    });
    
    // Handle client disconnect
    req.on('close', () => {
      subscription.unsubscribe();
    });
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.server.nodeEnv} mode`);
});