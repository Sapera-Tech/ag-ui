import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

interface Config {
  server: {
    port: number;
    nodeEnv: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  openai: {
    apiKey: string;
  };
  security: {
    jwtSecret: string;
    sessionSecret: string;
  };
  logging: {
    level: string;
  };
}

const config: Config = {
  server: {
    port: parseInt(process.env.PORT || '7000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'bi_tool',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
    sessionSecret: process.env.SESSION_SECRET || 'default_session_secret',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

// Validate required configuration
if (!config.openai.apiKey) {
  console.warn('Warning: OPENAI_API_KEY is not set. LLM features will not work.');
}

if (config.security.jwtSecret === 'default_jwt_secret' && config.server.nodeEnv === 'production') {
  console.error('Error: JWT_SECRET must be set in production environment.');
  process.exit(1);
}

if (config.security.sessionSecret === 'default_session_secret' && config.server.nodeEnv === 'production') {
  console.error('Error: SESSION_SECRET must be set in production environment.');
  process.exit(1);
}

export default config;