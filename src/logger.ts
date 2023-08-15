import * as winston from 'winston';
import { config } from './config';

// Logger configuration
const logConfiguration = {
    level:config.log_level,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(log => `${log.timestamp} [${log.level}]: ${log.message}`)
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(log => `${log.timestamp} [${log.level}]: ${log.message}`)
            )
        }),
        new winston.transports.File({
            filename: 'logs/app.log',
            format: winston.format.json()
        })
    ]
};

// Create and export the logger
const logger = winston.createLogger(logConfiguration);

export default logger;
