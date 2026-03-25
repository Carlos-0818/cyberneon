# CyberNeon

## 專案簡介

CyberNeon 是一個全端電商平台，包含前台購物與後台管理系統。

目前為 Phase 1 Demo 版本，目標為建立完整電商流程（Product → Cart → Order），並保留後續升級空間。

---

## Demo

目前尚未部署，將於後續補上：

- Frontend
- Backend

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma
- Zod (Validation)
- JWT (Authentication)

### Frontend

- React (Vite)
- Tailwind CSS (UI Blocks)

---

## Project Structure

```
cyberneon
├─ client           # 前端（React + Vite）
├─ server           # 後端（Express + Prisma）
│   ├─ controllers
│   ├─ routes
│   ├─ middlewares
│   ├─ validations
│   └─ utils
└─ docs             # API / 文件
```

---

## 功能列表

### 前台（Public）

- 商品列表（搜尋 / 分類 / 排序 / 分頁）
- 商品詳情
- 分類列表
- 註冊 / 登入

### 使用者（Private）

- 取得個人資料
- 建立訂單
- 查看訂單列表
- 查看訂單詳情

### 後台（Admin）

- 商品管理（CRUD）
- 分類管理（CRUD）
- 訂單管理（查看 / 更新狀態）

---

## 權限設計（RBAC）

| Role  | 權限                                   |
| ----- | -------------------------------------- |
| user  | 前台操作 + 訂單                        |
| admin | 後台管理（product / order / category） |

---

## API 回傳格式

所有 API 統一使用以下格式：

```json
{
  "success": true,
  "code": "OK",
  "message": "Success message",
  "data": {}
}
```

前端邏輯判斷以 `code` 為主，`message` 僅作為顯示與除錯用途。

---

## Error Handling

錯誤統一格式：

```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Error message",
  "data": null
}
```

常見錯誤碼：

- OK
- VALIDATION_ERROR
- UNAUTHORIZED
- FORBIDDEN
- NOT_FOUND
- INTERNAL_ERROR

---

## 環境變數

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/cyberneon
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

## 安裝與啟動

```bash
npm install
npm run dev
```

---

## Demo 帳號（Admin）

```
admin@test.com / admintest
```

---

## Notes

本專案採用 Phase-based 開發：

- Phase 1：完成可 demo 電商流程（目前）
- Phase 2：重構為業界架構（service layer / RBAC 強化）
- Phase 3：導入 TypeScript + CI/CD

文件將隨專案逐步補齊。
