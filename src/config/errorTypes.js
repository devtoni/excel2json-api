export const errorType = err => ({
  error: { error_code: 1, err_desc: err },
  corruptedFile: { error_code: 1, err_desc: 'Corrupted excel file' },
  noProcessed: { error_code: 1, err_desc: err, data: null },
  noFile: { error_code: 1, err_desc: 'No file passed' },
})
