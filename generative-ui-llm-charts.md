# Generative UI with LLM Driven Charts

This document describes how generative UI components in the AG-UI BI Tool transform LLM analysis into structured visualizations.

## 1. Overview

The tool uses the AG-UI protocol to stream events between the Mastra-based agent and the frontend. When the agent completes an analysis, it issues a **TOOL_CALL** with parameters describing the chart to render (type, labels, data series). The frontend listens for these events and builds charts dynamically.

## 2. Data Flow

1. User submits a natural language question (e.g., "Show quarterly sales by region").
2. The agent parses the request and queries data sources (Supabase, CSV, etc.).
3. Results are analyzed with an LLM to generate insights and chart specifications.
4. The agent emits a `TOOL_CALL_START` event with chart metadata followed by `TOOL_CALL_DELTA` events streaming the data points.
5. The frontend's generative UI component receives the stream and progressively constructs the chart using a library like Chart.js or ECharts.
6. When streaming completes, a `TOOL_CALL_END` event finalizes the visualization.

## 3. Chart Specification

The structured chart payload typically includes:

- `type`: bar, line, pie, scatter, etc.
- `title`: human readable title.
- `labels`: array of category labels.
- `series`: array of numeric data arrays.
- `options`: optional visualization settings (colors, axis titles).

The agent may generate this structure directly or via prompt templates that ensure the LLM outputs valid JSON.

## 4. Frontend Component Behavior

1. Listen for AG-UI tool call events specific to visualization.
2. As delta messages arrive, merge them into the chart data state.
3. Re-render the chart on each update for a streaming effect.
4. Provide user controls to switch visualization types or download results.

## 5. Benefits

- **Interactive**: Charts update in real time as the agent streams data.
- **Flexible**: Any chart type can be generated as long as the payload follows the schema.
- **Extensible**: Additional UI elements (tables, maps) can reuse the same pattern.

