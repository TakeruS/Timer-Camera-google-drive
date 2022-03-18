function doPost(e) {
  const FOLDER_ID = "";//Upload FolderID
  const SEETID = "";
  const SHEETNAME = "";//Log Sheet Name
  try{
    var data = Utilities.base64Decode(e.parameters.data);
    var nombreArchivo = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd_HHmmss")+".jpg";
    var blob = Utilities.newBlob(data, e.parameters.mimetype, nombreArchivo );
    // Save the photo to Google Drive
    var folder = DriveApp.getFolderById(FOLDER_ID);
    var file = folder.createFile(blob);
    var ss = SpreadsheetApp.openById(SEETID).getSheetByName(SHEETNAME);
    ss.getRange(ss.getLastRow()+1,1,1,3).setValues([[new Date(),e.parameters.bat,file.getUrl()]]);
    return ContentService.createTextOutput('OK');
  }catch(e){
    Logger.log(e);
  }
}
