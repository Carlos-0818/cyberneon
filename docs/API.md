# API Documentation

## Overview

Base URL:

```txt
http://localhost:5000/api
```

所有 API 統一回傳格式：

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Success message",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Error message",
  "data": null
}
```

前端邏輯判斷以 `code` 為主，`message` 僅作為顯示與除錯用途。

---

## Authentication

需要登入的 API 請在 header 帶入：

```txt
Authorization: Bearer <token>
```

---

## Auth

### POST /auth/signup

建立使用者帳號。

### Request Body

```json
{
  "email": "user01@test.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Signup successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user01@test.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

---

### POST /auth/login

使用者登入。

### Request Body

```json
{
  "email": "user01@test.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "OK",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user01@test.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

---

## Users

### GET /users/me

取得目前登入使用者資料。

### Headers

```txt
Authorization: Bearer <token>
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "OK",
  "data": {
    "id": "user_id",
    "email": "user01@test.com",
    "role": "user"
  }
}
```

---

## Categories

### GET /categories

取得前台分類列表（僅回傳 active 分類）。

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": "category_id",
      "name": "CPU",
      "slug": "cpu",
      "description": "桌機處理器相關商品",
      "status": "active",
      "createdAt": "2026-03-01T10:00:00.000Z",
      "updatedAt": "2026-03-01T10:00:00.000Z"
    }
  ]
}
```

---

## Products

### GET /products

取得前台商品列表。

### Query Params

| Name     | Type   | Description                                                      |
| -------- | ------ | ---------------------------------------------------------------- |
| page     | number | 分頁頁碼，預設 1                                                 |
| limit    | number | 每頁筆數，預設 12                                                |
| keyword  | string | 商品關鍵字搜尋（name / slug / brand）                            |
| category | string | 分類 slug                                                        |
| sort     | string | 排序方式：latest / price_asc / price_desc / name_asc / name_desc |

### Example

```
GET /api/products?page=1&limit=12&category=cpu&keyword=amd&sort=price_desc
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Products fetched successfully",
  "data": {
    "products": [
      {
        "id": "product_id",
        "name": "AMD Ryzen 7 7800X3D",
        "slug": "amd-ryzen-7-7800x3d",
        "brand": "AMD",
        "price": 12990,
        "stock": 7,
        "images": [],
        "specs": {
          "coreCount": "8",
          "threadCount": "16"
        },
        "description": "熱門遊戲向高階處理器",
        "status": "active",
        "categoryId": "category_id",
        "category": {
          "id": "category_id",
          "name": "CPU",
          "slug": "cpu"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 20,
      "totalPages": 2
    }
  }
}
```

---

### GET /products/:slug

取得前台商品詳情（僅可查看 active 商品）。

### Example

```
GET /api/products/amd-ryzen-7-7800x3d
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Product fetched successfully",
  "data": {
    "id": "product_id",
    "name": "AMD Ryzen 7 7800X3D",
    "slug": "amd-ryzen-7-7800x3d",
    "brand": "AMD",
    "price": 12990,
    "stock": 7,
    "images": [],
    "specs": {
      "coreCount": "8",
      "threadCount": "16"
    },
    "description": "熱門遊戲向高階處理器",
    "status": "active",
    "categoryId": "category_id",
    "category": {
      "id": "category_id",
      "name": "CPU",
      "slug": "cpu"
    }
  }
}
```

---

## Orders

### POST /orders

建立訂單。

### Headers

```txt
Authorization: Bearer <token>
```

### Request Body

```json
{
  "items": [
    {
      "productId": "product_id_1",
      "quantity": 2
    },
    {
      "productId": "product_id_2",
      "quantity": 1
    }
  ],
  "recipientName": "Carlos",
  "recipientPhone": "0912345678",
  "shippingAddress": "台北市信義區市府路 1 號",
  "note": "請白天送達"
}
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Order created successfully",
  "data": {
    "id": "order_id",
    "orderNumber": "ORD-1710000000000",
    "status": "pending",
    "totalAmount": 25980,
    "recipientName": "Carlos",
    "recipientPhone": "0912345678",
    "shippingAddress": "台北市信義區市府路 1 號",
    "note": "請白天送達",
    "userId": "user_id",
    "items": [
      {
        "id": "order_item_id",
        "productId": "product_id_1",
        "productName": "AMD Ryzen 7 7800X3D",
        "productSlug": "amd-ryzen-7-7800x3d",
        "unitPrice": 12990,
        "quantity": 2,
        "subtotal": 25980
      }
    ]
  }
}
```

---

### GET /orders

取得目前登入使用者的訂單列表。

### Headers

```txt
Authorization: Bearer <token>
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Orders fetched successfully",
  "data": [
    {
      "id": "order_id",
      "orderNumber": "ORD-1710000000000",
      "status": "pending",
      "totalAmount": 25980,
      "items": []
    }
  ]
}
```

---

### GET /orders/:id

取得目前登入使用者的訂單詳情。

### Headers

```txt
Authorization: Bearer <token>
```

### Success Response

```json
{
  "success": true,
  "code": "OK",
  "message": "Order fetched successfully",
  "data": {
    "id": "order_id",
    "orderNumber": "ORD-1710000000000",
    "status": "pending",
    "totalAmount": 25980,
    "items": [
      {
        "id": "order_item_id",
        "productId": "product_id",
        "productName": "AMD Ryzen 7 7800X3D",
        "productSlug": "amd-ryzen-7-7800x3d",
        "unitPrice": 12990,
        "quantity": 2,
        "subtotal": 25980
      }
    ]
  }
}
```

---

## Admin Categories

以下 API 需具備 admin 權限。

### GET /admin/categories

取得後台分類列表。

---

### GET /admin/categories/:id

取得後台分類詳情。

---

### POST /admin/categories

建立分類。

### Request Body

```json
{
  "name": "Motherboard",
  "slug": "motherboard",
  "description": "主機板相關商品",
  "status": "active"
}
```

---

### PATCH /admin/categories/:id

更新分類。

---

### DELETE /admin/categories/:id

刪除分類。

---

## Admin Products

以下 API 需具備 admin 權限。

### GET /admin/products

取得後台商品列表。

### Query Params

| Name     | Type   | Description    |
| -------- | ------ | -------------- |
| page     | number | 分頁頁碼       |
| limit    | number | 每頁筆數       |
| keyword  | string | 商品關鍵字搜尋 |
| category | string | 分類 slug      |
| status   | string | 商品狀態篩選   |

---

### GET /admin/products/:id

取得後台商品詳情。

---

### POST /admin/products

建立商品。

---

### PATCH /admin/products/:id

更新商品。

---

### DELETE /admin/products/:id

刪除商品。

---

## Admin Orders

以下 API 需具備 admin 權限。

### GET /admin/orders

取得後台訂單列表。

### Query Params

| Name        | Type   | Description  |
| ----------- | ------ | ------------ |
| page        | number | 分頁頁碼     |
| limit       | number | 每頁筆數     |
| status      | string | 訂單狀態篩選 |
| orderNumber | string | 訂單編號搜尋 |

---

### GET /admin/orders/:id

取得後台訂單詳情。

---

### PATCH /admin/orders/:id/status

更新訂單狀態。

### Request Body

```json
{
  "status": "paid"
}
```

---

## Notes

- Phase 1 以可 demo、可展示、可持續擴充為目標。
- Cart 暫時由前端 localStorage 管理，後端在 checkout 時重新驗證商品與庫存。
- 訂單建立時會建立 OrderItem snapshot，避免商品資料變動影響歷史訂單。
