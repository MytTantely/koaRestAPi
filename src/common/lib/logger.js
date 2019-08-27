const winston = require('winston')
const winstonCb = require('winston-couchbase-2');
// winston.add(new winstonCb(), 
//     {
//         level: 'db',
//         bucket: 'QWayDBException',
//         prefix: 'EXCEPTION::',
//         host: '127.0.0.1:8091',
//         expiry: 0
//     }
// );

// const optionsCouchbase = {
//     level: 'db',
//     bucket: 'QWayDBException',
//     prefix: 'EXCEPTION::',
//     host: '127.0.0.1:8091',
//     expiry: 0
// }
/**
level (default: info): level of the message this transport should log.
bucket (default: default): bucket where to store logs.
prefix (default: wl::): prefix of your keys.
host (default: 127.0.0.1:8091): address of the couchbase server.
expiry (default: 0): when the log should expire (seconds)
 */

const path = require('path')

const logErrorFile = path.join(__dirname, '..', '..', '..', 'logs', 'error.log')

const myCustomLevels = {
    levels: {
        db: 0,
        error: 1,
        warn: 2,
        info: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    }
}

const Logger = winston.createLogger({
    levels: myCustomLevels.levels,
    // level: 'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winstonCb({
            level: 'db',
            bucket: 'QWayDBException',
            username: 'Administrator',
			password: 'password',
            prefix: 'EXCEPTION::',
            host: '127.0.0.1:8091',
            expiry: 0
        }),
        new winston.transports.File({ filename: logErrorFile, level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    Logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = (fileName) => {
    const myLogger = {
        error: (text, meta) => {
            if (meta) {
                Logger.error(fileName + '# ' + text, meta)
            } else {
                Logger.error(fileName + '# ' + text)
            }

        },
        db: (text, meta) => {
            if (meta) {
                Logger.log('db', fileName + '# ' + text, meta)
            } else {
                Logger.log('db', fileName + '# ' + text)
            }

        },
        warn: (text) => {
            Logger.warn(fileName + '# ' + text)
        },
        info: (text) => {
            Logger.info(fileName + '# ' + text)
        }
    }

    return myLogger
}