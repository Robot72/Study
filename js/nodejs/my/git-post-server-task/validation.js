'use strict';

let path = require('path');
let fs = require('fs');

/**
 * Проверка на верный путь к файлу
 * 
 * @param {string} filePath имя файла, или относительный путь к файлу
 * @param {string} direcotry директория в которой будет осуществлен поиск и проверка
 * на существование файла
 * @returns {object} объект валидатор
 */
function isValidPath(filePath, directory) {
  
  try {
    
    filePath = decodeURIComponent(filePath);
    
    let parsedPath = path.parse(filePath);
    
    if( parsedPath.dir != '/' ) {
      return {
        valid: false,
        statusCode: 400,
        message: 'Please, do not go to subdirectory.'
      };
    }
    
    filePath = path.join(directory, filePath);
    
    if( filePath.indexOf(directory) != 0) {
      return {
        valid: false,
        statusCode: 404,
        message: 'File not found'
      };
    }
    
    let stat = fs.statSync(filePath);
    if( !stat.isFile() ) {
      return {
        valid: false,
        statusCode: 404,
        message: 'File not found'
      };
    }
    
    return {
      valid: true,
      statusCode: 200,
      filePath: filePath
    };
    
    /**
     * В данном случае не смог сделать асинхронную реализацию данной функции.
     * Предполагаю, что можно сделать при помощи Promise
    fs.stat(filePath, (error, stats) => {
      if(error || !stats.isFile()) {
        console.error('File not found');
      }
    });*/
    
  } catch (e) {
    
    return {
      valid: false,
      statusCode: 400,
      message: e.message
    };
    
  }
  
  
};

module.exports.isValidPath = isValidPath;