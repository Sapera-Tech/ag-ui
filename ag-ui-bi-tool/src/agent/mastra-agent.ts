import { AbstractAgent, RunAgentInput, EventType, BaseEvent, Message, RunStartedEvent, RunFinishedEvent, RunErrorEvent } from "./types";
import { Observable } from "rxjs";
import config from "../config";
import OpenAI from "./openai-mock";

/**
 * MastraAgent is a TypeScript-based agent implementation that:
 * 1. Processes natural language queries
 * 2. Coordinates data retrieval from various sources
 * 3. Performs analysis using built-in functions and LLM capabilities
 * 4. Generates visualizations based on data and query intent
 * 5. Emits AG-UI compatible events for frontend communication
 */
export class MastraAgent extends AbstractAgent {
  private openai: OpenAI;
  
  constructor() {
    super();
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }

  protected run(input: RunAgentInput): Observable<BaseEvent> {
    return new Observable<BaseEvent>((observer) => {
      // Extract the user's query from the messages
      const userMessages = input.messages.filter((msg: Message) => msg.role === 'user');
      const lastUserMessage = userMessages[userMessages.length - 1];
      
      if (!lastUserMessage || !lastUserMessage.content) {
        this.handleError(observer, "No user query found");
        return;
      }

      const query = lastUserMessage.content;
      const messageId = Date.now().toString();
      const runId = input.runId;
      const threadId = input.threadId;

      // Start the run
      observer.next({
        type: EventType.RUN_STARTED,
        threadId,
        runId,
        timestamp: Date.now(),
      } as RunStartedEvent);

      // Process the query
      this.processQuery(query, messageId, observer)
        .then(() => {
          // Complete the run
          observer.next({
            type: EventType.RUN_FINISHED,
            threadId,
            runId,
            timestamp: Date.now(),
          } as RunFinishedEvent);
          observer.complete();
        })
        .catch((error) => {
          this.handleError(observer, error.message);
        });
    });
  }

  private async processQuery(
    query: string, 
    messageId: string, 
    observer: any
  ): Promise<void> {
    try {
      // Start the text message
      observer.next({
        type: EventType.TEXT_MESSAGE_START,
        messageId,
        role: "assistant",
        timestamp: Date.now(),
      });

      // Analyze the query to determine intent
      const intent = await this.analyzeQueryIntent(query);
      
      // Send initial response
      observer.next({
        type: EventType.TEXT_MESSAGE_CONTENT,
        messageId,
        delta: `I'm analyzing your query: "${query}"\n\n`,
        timestamp: Date.now(),
      });

      // Simulate data retrieval and analysis
      observer.next({
        type: EventType.TEXT_MESSAGE_CONTENT,
        messageId,
        delta: `Based on your query, I've identified the intent as: ${intent.type}\n\n`,
        timestamp: Date.now(),
      });

      // Generate visualization if needed
      if (intent.requiresVisualization) {
        await this.generateVisualization(intent, messageId, observer);
      }

      // End the text message
      observer.next({
        type: EventType.TEXT_MESSAGE_END,
        messageId,
        timestamp: Date.now(),
      });
    } catch (error: any) {
      this.handleError(observer, error.message);
    }
  }

  private async analyzeQueryIntent(query: string): Promise<{
    type: string;
    requiresVisualization: boolean;
    visualizationType?: string;
    chartType?: string;
  }> {
    // In a real implementation, this would use the OpenAI API to analyze the query
    // For now, we'll use a more comprehensive rule-based approach
    
    const queryLower = query.toLowerCase();
    
    // Chart detection
    if (
      queryLower.includes('chart') ||
      queryLower.includes('graph') ||
      queryLower.includes('plot') ||
      queryLower.includes('bar') ||
      queryLower.includes('line') ||
      queryLower.includes('pie') ||
      queryLower.includes('compare') ||
      queryLower.includes('trend') ||
      queryLower.includes('distribution')
    ) {
      // Determine chart type
      let chartType = 'bar'; // Default chart type
      
      if (queryLower.includes('line') || queryLower.includes('trend') || queryLower.includes('over time')) {
        chartType = 'line';
      } else if (queryLower.includes('pie') || queryLower.includes('distribution') || queryLower.includes('breakdown')) {
        chartType = 'pie';
      }
      
      return {
        type: 'visualization',
        requiresVisualization: true,
        visualizationType: 'chart',
        chartType
      };
    }
    // Map detection
    else if (
      queryLower.includes('map') ||
      queryLower.includes('location') ||
      queryLower.includes('geographic') ||
      queryLower.includes('region') ||
      queryLower.includes('territory')
    ) {
      return {
        type: 'visualization',
        requiresVisualization: true,
        visualizationType: 'map'
      };
    }
    // Table detection
    else if (
      queryLower.includes('table') ||
      queryLower.includes('list') ||
      queryLower.includes('top') ||
      queryLower.includes('bottom') ||
      queryLower.includes('ranking')
    ) {
      return {
        type: 'visualization',
        requiresVisualization: true,
        visualizationType: 'table'
      };
    }
    // Default to chart for any query that mentions data
    else if (
      queryLower.includes('sales') ||
      queryLower.includes('revenue') ||
      queryLower.includes('profit') ||
      queryLower.includes('customer') ||
      queryLower.includes('product') ||
      queryLower.includes('performance')
    ) {
      return {
        type: 'visualization',
        requiresVisualization: true,
        visualizationType: 'chart'
      };
    }
    // Fallback to information
    else {
      return {
        type: 'information',
        requiresVisualization: false
      };
    }
  }

  private async generateVisualization(
    intent: { type: string; visualizationType?: string; chartType?: string },
    messageId: string,
    observer: any
  ): Promise<void> {
    // Generate a tool call for the visualization
    const toolCallId = `tool-${Date.now()}`;
    const toolCallName = intent.visualizationType || 'chart';

    // Start the tool call
    observer.next({
      type: EventType.TOOL_CALL_START,
      toolCallId,
      toolCallName,
      parentMessageId: messageId,
      timestamp: Date.now(),
    });

    // Generate synthetic data based on visualization type
    let sampleData;
    
    switch (toolCallName) {
      case 'chart':
        sampleData = this.generateChartData(intent.chartType || 'bar');
        break;
      case 'table':
        sampleData = this.generateTableData();
        break;
      case 'map':
        sampleData = this.generateMapData();
        break;
      default:
        sampleData = this.generateChartData(intent.chartType || 'bar');
    }

    // Send the tool call arguments
    observer.next({
      type: EventType.TOOL_CALL_ARGS,
      toolCallId,
      delta: JSON.stringify(sampleData),
      timestamp: Date.now(),
    });

    // Add explanation in the text message
    observer.next({
      type: EventType.TEXT_MESSAGE_CONTENT,
      messageId,
      delta: `I've generated a ${toolCallName} visualization based on your query. This uses synthetic data for demonstration purposes.\n\n`,
      timestamp: Date.now(),
    });

    // End the tool call
    observer.next({
      type: EventType.TOOL_CALL_END,
      toolCallId,
      timestamp: Date.now(),
    });
  }

  private generateChartData(chartType: string = 'bar') {
    // Generate random data for chart visualization
    const regions = ['North', 'South', 'East', 'West'];
    const products = ['Electronics', 'Clothing', 'Food', 'Home Goods'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    
    let data = [];
    let options = {
      title: 'Business Data Visualization',
      xAxis: 'category',
      yAxis: 'value',
    };
    
    // Generate data based on chart type
    if (chartType === 'bar') {
      // For bar charts - category comparison
      const categories = Math.random() > 0.5 ? regions : products;
      data = categories.map(category => ({
        category,
        value: Math.floor(Math.random() * 100) + 10
      }));
      options.title = 'Business Data Comparison';
    }
    else if (chartType === 'line') {
      // For line charts - time series data
      data = months.map(month => ({
        category: month,
        value: Math.floor(Math.random() * 100) + 10
      }));
      
      // Add a second data series for line charts
      const secondSeries = Math.random() > 0.5 ? 'Revenue' : 'Orders';
      const firstSeries = 'Sales';
      
      // Transform data to have multiple series
      data = [
        {
          name: firstSeries,
          data: months.map(month => ({
            x: month,
            y: Math.floor(Math.random() * 100) + 20
          }))
        },
        {
          name: secondSeries,
          data: months.map(month => ({
            x: month,
            y: Math.floor(Math.random() * 80) + 10
          }))
        }
      ];
      
      options.title = 'Business Data Trend';
      options.xAxis = 'x';
      options.yAxis = 'y';
    }
    else if (chartType === 'pie') {
      // For pie charts - distribution data
      const categories = Math.random() > 0.5 ? regions : products;
      
      // Generate values that sum to 100 for percentage representation
      let remaining = 100;
      data = categories.map((category, index) => {
        // Last item gets the remainder to ensure sum is 100
        if (index === categories.length - 1) {
          return { category, value: remaining };
        }
        
        // Generate a random portion of the remaining percentage
        const value = Math.floor(Math.random() * (remaining / 2)) + 1;
        remaining -= value;
        return { category, value };
      });
      
      options.title = 'Business Data Distribution';
    }
    else {
      // Default fallback to bar chart
      const categories = Math.random() > 0.5 ? regions : products;
      data = categories.map(category => ({
        category,
        value: Math.floor(Math.random() * 100) + 10
      }));
    }
    
    return {
      type: 'chart',
      chartType,
      data,
      options,
    };
  }

  private generateTableData() {
    // Generate random data for table visualization
    const customers = [
      { name: 'Acme Corp', revenue: 125000, orders: 45, satisfaction: 4.8 },
      { name: 'Globex Inc', revenue: 98000, orders: 32, satisfaction: 4.5 },
      { name: 'Initech', revenue: 145000, orders: 52, satisfaction: 4.2 },
      { name: 'Umbrella Corp', revenue: 210000, orders: 78, satisfaction: 4.7 },
      { name: 'Stark Industries', revenue: 180000, orders: 65, satisfaction: 4.9 }
    ];
    
    return {
      type: 'table',
      data: customers,
      options: {
        title: 'Customer Data',
      },
    };
  }

  private generateMapData() {
    // Generate random data for map visualization
    const locations = [
      { name: 'New York', lat: 40.7128, lng: -74.0060, value: 235 },
      { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, value: 187 },
      { name: 'Chicago', lat: 41.8781, lng: -87.6298, value: 156 },
      { name: 'Houston', lat: 29.7604, lng: -95.3698, value: 142 },
      { name: 'Phoenix', lat: 33.4484, lng: -112.0740, value: 128 }
    ];
    
    return {
      type: 'map',
      data: locations,
      options: {
        title: 'Location Data',
        centerLat: 39.8283,
        centerLng: -98.5795,
        zoom: 4
      },
    };
  }

  private handleError(observer: any, errorMessage: string): void {
    observer.next({
      type: EventType.RUN_ERROR,
      message: errorMessage,
      timestamp: Date.now(),
    } as RunErrorEvent);
    observer.complete();
  }
}