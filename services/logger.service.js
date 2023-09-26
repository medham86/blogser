const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf,errors,json} = format;

const logFormat = printf(({level,message,timestamp,stack})=>{

    let logMessage = `${timestamp} | ${level.toLocaleUpperCase()} | ${stack || (typeof message == 'object') ? JSON.stringify(message) : message}`

    return logMessage
})

const getLogger = (fileName) =>{
    const logger = createLogger({
        format : combine(
            timestamp({format : 'YYYY-MM-DD  HH:MM:SS'}),
            errors({stack: true}),
            json(),
            logFormat
        ),
        transports : [
            new transports.File({filename : `./logs/${fileName}.log`}),
            new transports.File({filename : `./logs/all.log`}),
            new transports.Console()
        ]
    });

    return logger
}


module.exports = getLogger



