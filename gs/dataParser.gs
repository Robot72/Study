/** Extended functionality **/
Object.assign = function (target, source){
  if (!target || !source)
    throw new Error("Invalid arguments.");
  for (var property in source)
    if (source.hasOwnProperty(property))
      target[property] = source[property];
  return target;
};

/** Options/Data **/
var data = [];
var apiUrl = 'http://domain.luya/admin/'
var entities = {
  bones: 'api-module-model'  
};
var searchQueryByName = 'search?ngrestCallType=list&fields=name';
var searchQueryById = 'search?ngrestCallType=list&fields=id';
var fetchOptions = {
  'contentType': 'application/json',
  'headers': {
     'Authorization': 'Bearer tokenToken010342350'
   }
};
var luyaResponsePattern = ')]}\',\n';

/**
 * The function parses all google sheets data from "General directory" list
 */
function dataParser() {
  var range = [0];
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = spreadSheet.getSheetByName('General directory');
  
  data = sheet.getDataRange().getValues();  
  var addedRows = 0; 
  var passedRows = 0;
  
  var scriptProperties = PropertiesService.getScriptProperties();
  var startRow = scriptProperties.getProperty('currentIndex') ? scriptProperties.getProperty('currentIndex') : 150;
  //var startRow = 7;
  
  for (var i = startRow; i < data.length; i++) {    
    scriptProperties.setProperty("currentIndex", i);
    
    fillLocation(i);
    fillBones(i);
        
    passedRows += 1;
  }
  
  Logger.log('ADDED ROWS: ' + addedRows + ' ALL passed rows: ' + passedRows);
  var recipient = Session.getActiveUser().getEmail();
  var subject = 'Data parser';
  var body = Logger.getLog();
  MailApp.sendEmail(recipient, subject, body);
}

/**
 * Get location by id from GoogleSheets and send it to website backend
 */
function fillLocation(i) {
  var tableData = data;
  var index = Math.round(Number(i));   
  var name = tableData[index][3];
  var code = tableData[index][4];
  var type = tableData[index][5];
  
  if (
    name !== '' && 
    code !== '' && 
    type !== '' &&
    type === 'Location'
  ) {  
    
    var boneName = getRelatedCell(index, 0);
    var boneId = getParentIdByName(boneName);
    
    var queryData = {
      'name': name,
      'code': String(code),
      'parent': Number(boneId),
      'image_url': 1
    };
  
    var options = Object.assign({
      'payload': JSON.stringify(queryData),
      'method': 'post',
      'muteHttpExceptions': true
    }, fetchOptions);
    
    var requestUrl = apiUrl + entities.bones;
    var response = UrlFetchApp.fetch(requestUrl, options);
    Logger.log(response);
  }
}

/**
 * Get bone by id from GoogleSheets and send it to website backend
 */
function fillBones(i) {
  var tableData = data;
  var index = Math.round(Number(i)); 
  var firstScreenName = tableData[index][0];
  var firstScreenNumber = tableData[index][1];
  var firstScreenType = tableData[index][2];
      
  if (
    firstScreenName !== '' && 
    firstScreenNumber !== '' && 
    firstScreenType !== '' && 
    !isExistBone(firstScreenName) && 
    firstScreenType === 'Bone'
  ) {      
    var queryData = {
      'name': firstScreenName,
      'code': String(firstScreenNumber),
      'parent': 1,
      'image_url': 1
    };
  
    var options = Object.assign({
      'payload': JSON.stringify(queryData),
      'method': 'post',
      'muteHttpExceptions': true
    }, fetchOptions);
    
    var requestUrl = apiUrl + entities.bones;
    var response = UrlFetchApp.fetch(requestUrl, options);
    addedRows += 1;
  }
}

/**
 * Check by name the bone exists or not exists on backend
 */
function getParentIdByName(name) {
  var data = {
    'query': name,   
  };
  
  var options = Object.assign({
    'payload': JSON.stringify(data),
    'method': 'post'
  }, fetchOptions);
    
  var requestUrl = apiUrl + entities.bones + '/' + searchQueryById;
  var response = UrlFetchApp.fetch(requestUrl, options);  
  var content = response.getContentText();
  content = content.replace(luyaResponsePattern, '');
  var result = JSON.parse(content);
 // var id = result[0]['id'];

  if (Array.isArray(result) && result.length > 0) {
    return result[0]['id'];
  } else {
    return [];
  }
}

/**
 * Check by name the bone exists or not exists on backend
 */
function isExistBone(name) {
  var data = {
    'query': name,   
  };
  
  var options = Object.assign({
    'payload': JSON.stringify(data),
    'method': 'post'
  }, fetchOptions);
    
  var requestUrl = apiUrl + entities.bones + '/' + searchQueryByName;
  var response = UrlFetchApp.fetch(requestUrl, options);  
  var content = response.getContentText();
  content = content.replace(luyaResponsePattern, '');
  var result = JSON.parse(content);

  if (Array.isArray(result) && result.length > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * Get cell value
 */
function cellVal(cellAddress) {
  var cell = SpreadsheetApp.getActiveSheet().getRange(cellAddress);
  return (cell.isPartOfMerge() ? cell.getMergedRanges()[0].getCell(1, 1) : cell).getValue();
}

/**
 * Get related data for current cell. It may be parent category or parent entity.
 */ 
function getRelatedCell(currentLine, relatedColumn) {
  for (var i = currentLine; i >= 1; i--) {
    if (data[i][relatedColumn]) {
      return data[i][relatedColumn];
    }
  }
  
  return '';
}
