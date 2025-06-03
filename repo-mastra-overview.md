# Repository Overview and Mastra Agents

This repository contains the source code and documentation for **AG-UI**, an open protocol for connecting AI agents to front‑end applications. It includes SDKs, example applications, and demonstration tools for building AG‑UI compatible agents and clients.

## Repository Structure

- **typescript-sdk** and **python-sdk** – SDKs that implement the AG‑UI protocol.
- **dojo** – An interactive viewer showcasing CopilotKit agent demos.
- **ag-ui-bi-tool** – A demo business intelligence application demonstrating how to build an agent‑powered workflow using AG‑UI.

## Mastra Agents

The repository currently includes a Mastra agent implementation used in the Business Intelligence Tool:

- `ag-ui-bi-tool/src/agent/mastra-agent.ts` – A TypeScript class (`MastraAgent`) that extends the `AbstractAgent` from AG‑UI. It processes natural language queries, generates synthetic data visualizations (charts, tables, maps), and emits AG‑UI events for streaming responses.
- `ag-ui-bi-tool/src/server/index.ts` – Instantiates the Mastra agent and exposes an HTTP endpoint that streams AG‑UI events to the web client using Server‑Sent Events.

This Mastra agent serves as a reference for integrating Mastra with the AG‑UI protocol. It can be extended to incorporate real data sources or additional analysis logic.

