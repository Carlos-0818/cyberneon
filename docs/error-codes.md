# Error Codes

| code                 | message               | 說明                   |
| -------------------- | --------------------- | ---------------------- |
| OK                   | OK                    | 成功                   |
| VALIDATION_ERROR     | Validation failed     | 請求資料驗證失敗       |
| UNAUTHORIZED         | Unauthorized          | 未登入或 token 無效    |
| FORBIDDEN            | Forbidden             | 無權限操作             |
| NOT_FOUND            | Not found             | 找不到資源             |
| BAD_REQUEST          | Bad request           | 請求格式或參數錯誤     |
| CONFLICT             | Conflict              | 資料衝突               |
| UNPROCESSABLE_ENTITY | Unprocessable entity  | 資料語意正確但無法處理 |
| TOO_MANY_REQUESTS    | Too many requests     | 請求過於頻繁           |
| INTERNAL_ERROR       | Internal server error | 系統內部錯誤           |
