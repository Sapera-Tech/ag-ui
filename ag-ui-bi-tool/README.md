# AG-UI Business Intelligence Tool

A business intelligence tool built on top of the AG-UI protocol, demonstrating how to create an agent-based BI application that can process natural language queries and generate visualizations.

## Overview

This project showcases how to use the AG-UI protocol to build a business intelligence tool that:

1. Accepts natural language queries from users
2. Processes these queries using a custom agent implementation
3. Generates visualizations based on the query intent
4. Streams results back to the client using AG-UI events

The implementation follows the AG-UI protocol's event-based architecture, making it compatible with any AG-UI client.

## Architecture

The application consists of the following components:

- **Mastra Agent**: A TypeScript implementation of the AG-UI AbstractAgent that processes queries and generates responses
- **Express Server**: A simple HTTP server that handles API requests and streams responses using Server-Sent Events (SSE)
- **Web Client**: A browser-based UI that allows users to enter queries and view results

### Event Flow

1. User submits a query through the web interface
2. Server receives the query and creates a run input for the Mastra agent
3. Mastra agent processes the query and emits AG-UI events
4. Server streams these events back to the client
5. Client renders the events as text messages and visualizations

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ag-ui-bi-tool.git
   cd ag-ui-bi-tool
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your OpenAI API key and other configuration options.

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a natural language query in the input field, such as:
   - "Show me a bar chart of sales by region"
   - "Create a table of top 10 customers"
   - "Generate a map of store locations"

2. The system will process your query and return:
   - A text response explaining the analysis
   - A visualization based on the query intent (chart, table, or map)

## Implementation Details

### AG-UI Protocol Integration

This project demonstrates how to implement the AG-UI protocol for a business intelligence application:

- **Events**: Uses standard AG-UI events like TEXT_MESSAGE_START, TOOL_CALL_START, etc.
- **Streaming**: Implements streaming responses using the Observable pattern
- **Tool Calls**: Uses tool calls to generate visualizations

### Agent Implementation

The Mastra agent extends the AbstractAgent class from AG-UI and implements:

- Query intent analysis
- Data retrieval (simulated in this demo)
- Visualization generation
- Error handling

### Visualization Types

The system supports multiple visualization types:

- **Charts**: Bar charts, line charts, pie charts
- **Tables**: Tabular data with sorting and filtering
- **Maps**: Geographical data visualization (placeholder in this demo)

## Extending the Project

### Adding New Visualization Types

To add a new visualization type:

1. Update the `analyzeQueryIntent` method in `mastra-agent.ts` to detect the new type
2. Add rendering logic in the client's `renderVisualization` function
3. Implement the data generation in the agent's `generateVisualization` method

### Connecting to Real Data Sources

To connect to real data sources:

1. Create data source connectors in a new `src/data-sources` directory
2. Update the agent to use these connectors instead of mock data
3. Implement caching and query optimization as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- AG-UI Protocol for providing the foundation for agent-UI communication
- OpenAI for the language model capabilities
- Chart.js for visualization rendering