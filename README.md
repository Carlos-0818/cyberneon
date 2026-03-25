# CyberNeon

## 專案簡介

CyberNeon 是一個全端電商平台，包含前台購物與後台管理系統。

目前為 Phase 1 Demo 版本，目標為建立完整電商流程（Product → Cart → Order），並保留後續升級空間。

---

## Project Goal

- 建立一套具備完整購物流程的電商系統（Storefront + Admin）
- 採用業界常見架構設計（Client / Server 分離）
- 以 Phase-based 方式逐步升級為可維護、可擴充的專案

---

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

## Core Features

### Storefront

- 前台首頁
- 商品瀏覽
- 商品詳情
- 購物車
- Checkout / 建立訂單
- 我的訂單 / 訂單詳情

### Admin

- Admin Dashboard
- Admin 商品管理
- Admin 訂單管理
- 訂單狀態更新

### System

- JWT Auth
- RBAC
- 統一 API response 格式
- Zod validation

---

## Demo Flow

### Storefront Flow

1. 瀏覽首頁與商品列表
2. 查看商品詳情
3. 加入購物車
4. 登入 / 註冊
5. 進行 Checkout 並建立訂單
6. 前往我的訂單查看訂單資訊

### Admin Flow

1. Admin 登入後台
2. 管理商品資料
3. 查看訂單列表
4. 查看訂單詳情
5. 更新訂單狀態

---

## Project Structure

```
cyberneon
├─ client
├─ server
└─ docs
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

## API Response Format

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

## Demo Account

## Admin

- email: admin@test.com
- password: admintest

---

## Demo Account

### Admin

- email: admin@test.com
- password: admintest

---

## Notes

此專案目前為 Phase 1（MVP）版本，
已完成基本電商流程（商品瀏覽 → 下單 → 訂單管理），
後續將逐步進行結構優化與功能擴充。
