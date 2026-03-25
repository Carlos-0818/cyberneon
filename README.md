# CyberNeon

> CyberNeon 是一個以電腦零組件電商為主題的全端專案，目標是完成一套可 demo、可持續擴充的電商平台。

---

## Project Goal

- 建立一套具備完整購物流程的電商系統（Storefront + Admin）
- 採用業界常見架構設計（Client / Server 分離）
- 以 Phase-based 方式逐步升級為可維護、可擴充的專案

---

## Tech Stack

- Frontend: Vite + React + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- Validation: Zod

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

## Getting Started

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

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
