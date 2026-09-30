# Arcane Tome — API Endpoints

Endpoints backing the UI in `ArcaneTome.Client` and the entities in [erd.md](./erd.md). Server: `ArcaneTome.Server` (ASP.NET Core minimal APIs, `/api` route group).

## Conventions

- **Base path**: `/api` (already proxied by `vite.config.ts` in dev).
- **Auth**: session cookie, not a bearer token. `POST /api/auth/login` sets an `httpOnly`, `Secure`, `SameSite=Strict` cookie; the client never reads or stores a token in JS (avoids XSS token theft). All endpoints below except `auth/register`, `auth/login`, and `auth/password-reset-request` require the session cookie and return `401` (ProblemDetails) if it is missing/expired.
- **Errors**: RFC 7807 `application/problem+json` (`title`, `status`, `detail`, `errors`) — matches `AddProblemDetails()`/`UseExceptionHandler()` already configured in `Program.cs`.
- **Dates**: ISO 8601 UTC strings on the wire (e.g. `"2026-03-25T17:12:00Z"`). The `*_epoch`/`*_date_key` columns in erd.md are storage/index optimizations only and are never serialized to clients.
- **Money**: JSON number in major units with up to 4 decimal places (`326.80`), always paired with a `currencyCode` (ISO 4217).
- **Pagination**: `page` (1-based) and `pageSize` query params; paged responses wrap items as `{ items, page, pageSize, totalCount }`.
- **Field casing**: request/response JSON is `camelCase`; it maps to the `snake_case` columns in erd.md at the data-access layer.

## Auth

### `POST /api/auth/register`
Create-account form (first name, last name, email, password, terms).

Request
```json
{ "firstName": "Mira", "lastName": "Vale", "email": "mira@example.com", "password": "arcane123" }
```
Response `201`
```json
{ "id": "usr_01H...", "name": "Mira Vale", "email": "mira@example.com", "monthlySavingsRate": 0 }
```
Errors: `409` (email already registered), `422` (validation).
Tables: `users`.

### `POST /api/auth/login`
Matches the existing `AuthService.signIn` contract (`authService.ts`) exactly — response shape must not change.

Request
```json
{ "email": "mira@example.com", "password": "arcane123" }
```
Response `200`
```json
{ "id": "usr_01H...", "name": "Mira Vale", "email": "mira@example.com", "monthlySavingsRate": 70.5 }
```
Errors: `401` `{ "title": "Invalid email or password.", "status": 401 }`.
Tables: `users`.

### `POST /api/auth/logout`
Clears the server-side session; client's `signOut()` should call this in API mode in addition to clearing local state.
Response `204`. No body.

### `POST /api/auth/password-reset-request`
"Forgot password?" link. Always returns `202` regardless of whether the email exists (prevents account enumeration).

Request
```json
{ "email": "mira@example.com" }
```
Response `202`, empty body.

## Users (Settings page)

### `GET /api/users/me`
Response `200`
```json
{
  "id": "usr_01H...", "firstName": "Mira", "lastName": "Vale", "email": "mira@arcane.tome",
  "avatarUrl": null, "currencyCode": "CAD", "monthlySavingsRate": 70.5,
  "weeklySummaryEnabled": true, "budgetRemindersEnabled": true
}
```
Tables: `users`.

### `PATCH /api/users/me`
Partial update from the Profile/Preferences form.

Request (any subset)
```json
{ "firstName": "Mira", "lastName": "Vale", "email": "mira@arcane.tome", "currencyCode": "CAD", "weeklySummaryEnabled": false, "budgetRemindersEnabled": true }
```
Response `200`: updated user object (same shape as `GET /api/users/me`). Errors: `409` if email already taken.

### `POST /api/users/me/photo`
`multipart/form-data`, field `photo` (jpg/png, ≤ 2 MB — matches `PhotoPage`).
Response `200`
```json
{ "avatarUrl": "https://.../avatars/usr_01H....jpg" }
```
Errors: `413` (too large), `415` (unsupported type).

### `PUT /api/users/me/password`
Request
```json
{ "currentPassword": "••••••••", "newPassword": "••••••••" }
```
Response `204`. Errors: `400` `{ "title": "Current password is incorrect." }`, `422` (policy: 8+ chars, one uppercase — matches `PasswordPage` rules).

## Accounts

### `GET /api/accounts`
Response `200`
```json
[
  { "id": "acc_everyday", "name": "Everyday spending", "accountType": "everyday", "last4Digits": "4820", "balance": 8245.60, "currencyCode": "CAD", "iconGlyph": "$", "colorTone": "blue", "isPrimary": true }
]
```
Tables: `accounts`.

### `GET /api/accounts/summary`
Backs the Accounts page balance strip.
Response `200`
```json
{ "totalBalance": 12640.50, "currencyCode": "CAD", "changePercent": 8.2 }
```

### `POST /api/accounts`
"Add account" modal (name, type, starting balance).

Request
```json
{ "name": "Emergency fund", "accountType": "savings", "startingBalance": 0 }
```
Response `201`: created account (same shape as list item). Errors: `422` (`accountType` not one of `everyday|savings|goal`).

### `GET /api/accounts/{accountId}/members`
Response `200`
```json
[{ "userId": "usr_02", "name": "Alex", "role": "member" }]
```
Tables: `account_members`.

### `POST /api/accounts/{accountId}/members`
"Add account member" (+) invite.

Request
```json
{ "email": "alex@example.com", "role": "member" }
```
Response `201`: created membership. Errors: `404` (no user with that email), `409` (already a member).

### `GET /api/accounts/{accountId}/activity`
Query: `page`, `pageSize`. Backs "Recent account activity".
Response `200`
```json
{
  "items": [{ "id": "txn_01", "label": "Salary deposit", "occurredAt": "2026-03-25T00:00:00Z", "amount": 6500.00, "positive": true, "icon": "+", "colorTone": "green" }],
  "page": 1, "pageSize": 20, "totalCount": 3
}
```

## Categories

### `GET /api/categories`
Static lookup for the expense-category picker.
Response `200`
```json
[{ "id": 1, "code": "grocery", "displayName": "Grocery", "iconGlyph": "⌁", "colorTone": "grocery" }]
```
Tables: `categories`.

## Transactions

### `GET /api/transactions`
Query: `accountId?`, `categoryId?`, `type? (income|expense|transfer)`, `from`, `to`, `groupBy? (day)`, `page`, `pageSize`.
When `groupBy=day` (Expenses page), items are bucketed to match the UI's "Today" / "Monday, 23 March 2026" sections.

Response `200` (`groupBy=day`)
```json
{
  "groups": [
    { "label": "Today", "items": [
      { "id": "txn_10", "category": "Grocery", "detail": "Belanja di pasar", "occurredAt": "2026-03-25T17:12:00Z", "amount": -326.80, "currencyCode": "CAD", "icon": "⌁", "colorTone": "sky" }
    ]}
  ]
}
```
Tables: `transactions`.

### `POST /api/transactions`
"Add expense" form.

Request
```json
{ "accountId": "acc_everyday", "categoryId": 1, "merchant": "Pasar Minggu", "amount": 326.80, "occurredAt": "2026-03-25", "note": "", "isRecurring": false }
```
Response `201`: created transaction. Errors: `422` (`amount <= 0`, unknown `categoryId`/`accountId`).

### `GET /api/transactions/activity-chart`
Query: `granularity (day|month)`, `from`, `to`, `type? (income|outcome)` — powers `ActivityChart`/`spendingBars` (day) and the dashboard Income/Outcome monthly chart (month).
Response `200`
```json
{ "bars": [{ "label": "Jan", "value": 58 }, { "label": "Feb", "value": 30 }] }
```

### `GET /api/transactions/category-breakdown`
Query: `from`, `to`. Powers `SummaryPanel`, the dashboard spending legend, and the Summary page "Top categories".
Response `200`
```json
[{ "categoryId": 2, "label": "Shopping", "amount": 1378.20, "percentage": 49, "colorTone": "gold" }]
```

## Cards

### `GET /api/cards`
Response `200`
```json
[{ "id": "card_01", "bankName": "National Bank", "last4Digits": "3090", "expiresMonth": 9, "expiresYear": 2024 }]
```
Tables: `cards`.

### `POST /api/cards`
"+" add card on the dashboard.

Request
```json
{ "accountId": "acc_everyday", "bankName": "National Bank", "last4Digits": "3090", "expiresMonth": 9, "expiresYear": 2028 }
```
Response `201`: created card.

## Goals

### `GET /api/goals`
Query: `accountId?` (e.g. the Accounts page "Savings progress" widget filters to the rainy-day fund's `accountId`).
Response `200`
```json
[{ "id": "goal_01", "name": "Buy Iphone 15", "targetAmount": 1200.00, "savedAmount": 360.00, "progressPercent": 30, "deadline": "2024-05-08", "colorTone": "yellow" }]
```
Tables: `goals` (`progressPercent` computed, never stored).

### `POST /api/goals`
Request
```json
{ "name": "Trip to Spain", "targetAmount": 3600.00, "accountId": null, "deadline": "2024-08-16", "colorTone": "violet" }
```
Response `201`: created goal.

### `PATCH /api/goals/{goalId}`
Contribute to / update a goal (e.g. after a transfer into a goal account).

Request
```json
{ "savedAmount": 400.00 }
```
Response `200`: updated goal. Sets `isAchieved = true` server-side once `savedAmount >= targetAmount`.

## Budgets (Settings → "Budget reminders")

### `GET /api/budgets?period=2026-03`
Response `200`
```json
[{ "categoryId": 2, "label": "Shopping", "limitAmount": 1500.00, "spentAmount": 1378.20, "remainingAmount": 121.80 }]
```
Tables: `budgets` (`spentAmount` joined live from `transactions`).

### `PUT /api/budgets/{categoryId}?period=2026-03`
Upsert a category's monthly limit.

Request
```json
{ "limitAmount": 1500.00 }
```
Response `200`: updated budget row.

## Saving tips

### `GET /api/saving-tips`
Response `200`
```json
[{ "number": "01", "title": "Give every dollar a role", "body": "Move your planned savings first...", "colorTone": "gold" }]
```
Tables: `saving_tips`.

### `GET /api/saving-tips/summary`
Backs the hero stat block ("CA$500 suggested monthly reserve", "42% of your current goal").
Response `200`
```json
{ "suggestedMonthlyReserve": 500.00, "currencyCode": "CAD", "goalProgressPercent": 42 }
```

## Notifications

### `GET /api/notifications`
Query: `unreadOnly?`, `page`, `pageSize`. Backs the sidebar profile badge count.
Response `200`
```json
{ "items": [{ "id": "note_01", "message": "Budget limit reached for Shopping.", "isRead": false, "createdAt": "2026-03-24T09:00:00Z" }], "unreadCount": 4, "page": 1, "pageSize": 20, "totalCount": 4 }
```
Tables: `notifications`.

### `PATCH /api/notifications/{notificationId}`
Request
```json
{ "isRead": true }
```
Response `204`.

## Reports (Summary page)

### `GET /api/reports/summary?period=this-month|last-month|this-year`
Response `200`
```json
{
  "income": { "amount": 18500.00, "changePercent": 12.4 },
  "expenses": { "amount": 5859.50, "changePercent": 4.8 },
  "setAside": { "amount": 3240.00, "changePercent": 18.1 }
}
```
Reuses `GET /api/transactions/activity-chart` (trend chart) and `GET /api/transactions/category-breakdown` (top categories) for the rest of the page — no duplicate endpoints needed.

### `GET /api/reports/insight?period=this-month`
Response `200`
```json
{ "headline": "Your spending has a rhythm.", "body": "Most of your spending happens in the first half of the month." }
```

### `GET /api/reports/export?period=this-month&format=csv`
Response `200`, `Content-Type: text/csv`, `Content-Disposition: attachment; filename="arcane-tome-summary-2026-03.csv"`.
