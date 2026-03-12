# CyberNeon

> CyberNeon 是一個以電腦零組件電商為主題的全端專案，目標是完成一套可 demo、可持續擴充的電商平台。

---

## Tech Stack

- Frontend: Vite + React + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- Validation: Zod

---

## Project Structure

```
cyberneon
├─ client
├─ server
└─ docs
```

---

## Features

### Storefront

- 前台商品瀏覽
- 商品詳情
- 購物車
- 建立訂單

### Admin

- Admin 商品管理
- Admin 訂單管理

### System

- JWT Auth
- RBAC

---

## API Response Format

所有 API 統一使用以下格式：

```json
{
  "success": true,
  "code": "OK",
  "message": "Products fetched successfully",
  "data": {}
}
```

---

## Notes

此專案目前為 Phase 1 開發中版本，README 與 docs 會隨功能逐步補齊。
