function exportSheetAsXlsx(sheet_name, email_subject) {
  let ss = SpreadsheetApp.getActive();
  let ssId = ss.getId();
  let sheetId = ss.getSheetByName(sheet_name).getSheetId();
  let url = `https://docs.google.com/spreadsheets/d/${ssId}/export?format=xlsx&gid=${sheetId}`;
  let params = { method: "GET", headers: { "authorization": "Bearer " + ScriptApp.getOAuthToken() } };
  let response = UrlFetchApp.fetch(url, params).getBlob().setName(sheet_name);
  let email = Session.getActiveUser().getEmail();
  //let subject = 'LV FCI - Daily summary'
  MailApp.sendEmail(email, email_subject, '', {
    attachments: {
      fileName: `${sheet_name}.xlsx`,
      content: response.getBytes(),
      mimeType: "application/xlsx",
    }
  });
}