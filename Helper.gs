function addNewRow(spreadsheet_name, content, copy) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log(spreadsheet.getUrl());

  var sheet = spreadsheet.getSheetByName(spreadsheet_name);
  var last_row = sheet.getLastRow();
  Logger.log(last_row);

  sheet.insertRowsAfter(last_row,1);
  
  sheet.getRange(last_row+1,1).setValue(content);
  if (copy){
    copy_paste_row_formula(spreadsheet_name, 2);
  }

}
function copy_paste_row_formula(spreadsheet_name, start_column){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(spreadsheet_name);
  var last_row = sheet.getLastRow()-1;

  for(var i = start_column; i <= sheet.getLastColumn();i++){
    var column = String.fromCharCode(i + 64);
    
    var source_index = column + last_row;
    Logger.log(spreadsheet_name + ":" + source_index);
    var value = sheet.getRange(source_index).getFormulaR1C1();
    
    var target_index = column + (last_row + 1);
    Logger.log(spreadsheet_name + ":" + target_index);
    sheet.getRange(target_index).setFormulaR1C1(value);
  }
}


function get_current_date() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}