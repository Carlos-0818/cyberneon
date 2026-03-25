# CyberNeon

## 專案簡介

CyberNeon 是一個全端電商平台，包含前台購物與後台管理系統。

採用前後端分離架構（React + Express），已完成實際部署，具備完整電商流程：

Browse → Cart → Checkout → Order → Admin 管理

---

## Live Demo

- Frontend: https://cyberneon.vercel.app
- Backend: https://cyberneon-server.onrender.com

### Demo Account

Admin:

- email: admin@test.com
- password: admintest

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
- Axios

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: Railway (PostgreSQL)

---

## Structure

```
cyberneon
├─ client
├─ server
└─ docs
```

## Features

### Storefront

- 商品瀏覽（list / detail / category）
- 購物車與 Checkout 流程
- 使用者訂單管理

### Admin

- 商品 CRUD 管理
- 訂單管理與狀態更新

---

## Architecture

- 前後端分離（Client / Server）
- RESTful API
- JWT Auth + RBAC
- 統一 API Response：{ success, code, message, data }

---

## 環境變數

### Server

```env
# server
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
```

### client

```env
VITE_API_BASE_URL=
```

---

## 安裝與啟動

```bash
npm install
npm run dev
```

---

## Notes

此專案目前為 Phase 1（MVP）版本，
完成基本電商流程（商品瀏覽 → 下單 → 訂單管理），
已完成前後端部署（Vercel / Render / Railway）。
後續將逐步進行結構優化與功能擴充。
尚未整合金流 / 圖片上傳（Phase 2 規劃）。
