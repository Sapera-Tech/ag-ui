# AG-UI Business Intelligence Tool - Example Queries

This document provides example queries that can be used with the AG-UI Business Intelligence Tool to generate different types of visualizations. The tool uses a mock implementation of the OpenAI API, so it will generate sample visualizations based on predefined data.

## Chart Visualizations

### Bar Charts

1. **Show me a bar chart of sales by region**
   - Generates a bar chart showing sales data across different regions
   - Sample data includes regions like North, South, East, West

2. **Create a bar chart comparing revenue by product category**
   - Generates a bar chart comparing revenue across product categories
   - Sample data includes categories like Electronics, Clothing, Food, Home Goods

3. **Display monthly sales for Q1 as a bar chart**
   - Generates a bar chart showing sales for January, February, and March
   - Sample data includes monthly sales figures

### Line Charts

1. **Show me a line chart of website traffic over the past week**
   - Generates a line chart showing daily website traffic
   - Sample data includes daily visitor counts

2. **Create a line chart of customer growth over the past year**
   - Generates a line chart showing customer acquisition over time
   - Sample data includes monthly customer counts

3. **Display a line chart of stock price trends**
   - Generates a line chart showing stock price movements
   - Sample data includes daily stock prices

### Pie Charts

1. **Show me a pie chart of market share by company**
   - Generates a pie chart showing market share distribution
   - Sample data includes companies and their respective market shares

2. **Create a pie chart of budget allocation by department**
   - Generates a pie chart showing budget distribution across departments
   - Sample data includes departments and their budget allocations

3. **Display a pie chart of sales by product category**
   - Generates a pie chart showing sales distribution across product categories
   - Sample data includes product categories and their sales figures

## Table Visualizations

1. **Show me a table of top 10 customers by revenue**
   - Generates a table listing customers and their revenue contributions
   - Sample data includes customer names and revenue figures

2. **Create a table of inventory levels by product**
   - Generates a table showing products and their current inventory levels
   - Sample data includes product names and inventory counts

3. **Display a table of employee performance metrics**
   - Generates a table showing employee performance data
   - Sample data includes employee names and various performance metrics

## Map Visualizations

1. **Show me a map of store locations**
   - Generates a map visualization showing store locations
   - Sample data includes location coordinates

2. **Create a map of customer density by region**
   - Generates a map showing customer density across regions
   - Sample data includes regions and customer counts

3. **Display a map of sales performance by territory**
   - Generates a map showing sales performance across territories
   - Sample data includes territories and sales figures

## How to Use These Queries

1. Start the AG-UI Business Intelligence Tool server:
   ```
   cd ag-ui-bi-tool
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter one of the example queries in the input field and click "Submit Query"

4. The tool will process your query and generate a visualization based on the query intent

## Notes on Synthetic Data

The tool uses synthetic data to generate visualizations. The data is predefined in the Mastra agent implementation and is designed to demonstrate the capabilities of the AG-UI protocol for business intelligence applications.

For real-world usage, you would need to:
1. Connect to actual data sources
2. Implement data retrieval logic
3. Configure the agent to use real data instead of synthetic data