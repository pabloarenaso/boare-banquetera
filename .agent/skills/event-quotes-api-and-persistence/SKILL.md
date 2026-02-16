---
name: event-quotes-api-and-persistence
description: Establishes architectural patterns for the backend API and database persistence of the event quotation system.
---

# Event Quotes API & Persistence Skill

This skill defines the backend standards for handling event quotes, ensuring stability, security, and scalability.

## Architecture Guidelines

Adopt a **Clean Architecture** approach to keep the core domain independent of frameworks.

1.  **Domain Layer**: Entities (`Event`, `Quote`) and Business Logic (`PricingEngine`). No framework dependencies.
2.  **Application Layer**: Use Cases (`CreateQuote`, `ApproveQuote`). Orchestrates data flow.
3.  **Infrastructure Layer**: Database implementations (`Prisma`), Web Server (`Express`/`NestJS`), External Services (`EmailService`).

## API Contracts (OpenAPI / TypeScript)

Define strict contracts.

### Endpoints

#### Public (Unauthenticated)
*   `POST /api/v1/quotes/draft`: Creates a new quote based on user input. Returns a `draftId`.
*   `GET /api/v1/config/:slug`: Returns the public configuration for the UI (branding, menu options).

#### Internal (Authenticated - Backoffice)
*   `GET /api/v1/admin/quotes`: List quotes with pagination and filters (`?status=sent&date=2026-02`).
*   `GET /api/v1/admin/quotes/:id`: Get full details including cost breakdown.
*   `PATCH /api/v1/admin/quotes/:id`: Update status or modify line items.
*   `POST /api/v1/admin/quotes/:id/send`: Trigger email dispatch.

## Database & Persistence

### Recommendation
Use **Prisma ORM** (or Drizzle) with a **PostgreSQL** database for robust relational data integrity.

### Schema Guidelines

```prisma
model Quote {
  id          String   @id @default(uuid())
  eventDate   DateTime
  guestCount  Int
  status      QuoteStatus @default(DRAFT)
  
  // Relations
  clientId    String
  client      Client @relation(fields: [clientId], references: [id])
  
  items       QuoteItem[]
  
  // Snapshot data (Don't rely on Catalog for historical quotes!)
  totalPrice  Int
  taxAmount   Int
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model QuoteItem {
  id          String @id @default(uuid())
  quoteId     String
  quote       Quote  @relation(fields: [quoteId], references: [id])
  
  name        String // Snapshot name
  quantity    Int
  unitPrice   Int    // Snapshot price
  cost        Int    // Snapshot cost
}
```

**Critical Rule**: Always snapshot prices and names in `QuoteItem` at the time of creation. If the global Menu price changes later, historical quotes must NOT change.

## Security

*   **Public API**: Rate limit aggressively. Validate inputs with `Zod`.
*   **Internal API**: Protect with JWT or Session Auth. Ensure Role-Based Access Control (RBAC) if multiple staff members exist.
