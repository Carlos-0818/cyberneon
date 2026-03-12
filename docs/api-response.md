# API Response

所有 API 統一使用以下格式：

## Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Request completed successfully",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "data": null
}
```
