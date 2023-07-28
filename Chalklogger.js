import chalk from 'chalk';
import moment from 'moment';
import fs from 'fs';



const logLevels = ['debug', 'info', 'warn', 'error'];

class Chalklogger {
  constructor(options = {}) {
    
    this.logLevel = options.logLevel || 'info';
    this.dateFormat = options.dateFormat || 'YYYY-MM-DD HH:mm:ss';
    this.fileOutput = options.fileOutput || 'logs.log';
    this.storeConsoleLogs = options.storeConsoleLogs || false;
    this.priority = options.priority;
    this.label = options.label;

    this.consoleLog = console.log;
    // console.log = (...args) => {
    //   this.handleConsoleLog(args);
    // };
  }

  shouldLog(level) {
    return logLevels.indexOf(level) >= logLevels.indexOf(this.logLevel);
  }
   filterEscapeSequences(logMessage) {
    const escapeSequenceRegex = /\x1B\[[0-9;]*[JKmsu]/g;

    const filteredMessage = logMessage.replace(escapeSequenceRegex, '');
  
    return filteredMessage;
  }
  formatLog(level, message) {
    const timestamp = moment().format(this.dateFormat);
    const logMessage = `[${level.toUpperCase()}] [${timestamp}] ${message}`;
    
    switch (level) {
      case 'debug':
        return chalk.gray(logMessage);
      case 'info':
        return chalk.blue(logMessage);
      case 'warn':
        return chalk.yellow(logMessage);
      case 'error':
        return chalk.red(logMessage);
      default:
        return logMessage;
    }
  }

//   log(level, message) {
//     const formattedLog = this.formatLog(level, message);

//     if (this.shouldLog(level)) {
//       this.consoleLog(formattedLog);
  
//       if (this.fileOutput) {
//         fs.appendFileSync(this.fileOutput, `${this.filterEscapeSequences(formattedLog)}\n`);
//       }
//     }
//   }
log(level, message) {
    const formattedLog = this.formatLog(level, message);
  
    if (this.shouldLog(level)) {
      if (this.storeConsoleLogs) {
        let consoleLogMessage = formattedLog;
  
        // if (this.priority && this.label) {
        //   consoleLogMessage += `\n\n[Priority: ${this.priority}, Label: ${this.label}]`;
        // }
  
        this.consoleLog(consoleLogMessage);
      }
  
      if (this.fileOutput && this.storeConsoleLogs) {
        let fileLogMessage = '';
  
        if (this.priority && this.label) {
          fileLogMessage += `[Priority: ${this.priority}, Label: ${this.label}]\n`;
        }

            fileLogMessage += ` ${formattedLog}`;
            if (this.priority && this.label) {
                fileLogMessage += `\n\n`;
              }
  
        fs.appendFileSync(this.fileOutput, `${this.filterEscapeSequences(fileLogMessage)}\n`);
      }
    }
  }
  
//   handleConsoleLog(args) {
//     const message = args
//       .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg))
//       .join(' ');
//     if (this.storeConsoleLogs) {
//       let formattedLog = ''


//       if (this.fileOutput) {
//         fs.appendFileSync(this.fileOutput, `${formattedLog}\n`);
//       }
//     }

//     this.consoleLog(...args);
//   }

  debug(message) {
    this.log('debug', message);
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }

}

export default Chalklogger;

