---
name: multi-catering-config
description: Enables the quotation system to serve multiple catering brands via configuration files, separating core logic from brand-specific data.
---

# Multi-Catering Config Skill

This skill ensures the system is multi-tenant capable, allowing valid deployment for different catering businesses without code changes.

## Core Principle

**Code is Engine. Config is Fuel.**
Never hardcode prices, brand names, or specific menu items in the React components or Node.js services.

## Configuration Structure

Organize configurations by "Business Slug".

`src/config/businesses/<slug>/`

### 1. `business.json` (Identity)
Contains static brand data.

```json
{
  "name": "Boare Banquetería",
  "slug": "boare",
  "contact": {
    "email": "contacto@boare.cl",
    "phone": "+56912345678",
    "website": "https://boare.cl"
  },
  "theme": {
    "primaryColor": "#D4AF37",
    "logoUrl": "/assets/boare/logo.png"
  },
  "notifications": {
    "emailSender": "Boare Cotizaciones <noreply@boare.cl>",
    "adminEmails": ["pablo@boare.cl"]
  }
}
```

### 2. `pricing.json` (Rules)
Contains the tunable parameters for the Pricing Engine.

```json
{
  "currency": "CLP",
  "taxRate": 0.19,
  "defaultMargin": 0.35,
  "rules": {
    "weekendSurcharge": 0.1,
    "minGuests": 15
  }
}
```

### 3. `catalog.json` (Products)
Defines the Menus and Add-ons available for this specific business.

## Implementation Guide

### Config Loader Pattern
Create a text-agnostic loader.

```typescript
// Example Implementation
import boareConfig from './businesses/boare/business.json';
import otherConfig from './businesses/other/business.json';

const configs = { boare: boareConfig, other: otherConfig };

export function getBusinessConfig(slug: string) {
  const config = configs[slug];
  if (!config) throw new Error(`Business ${slug} not found`);
  return config;
}
```

### UI Consumption
The UI should derive its look and content from the loaded config.
*   **Header**: Renders `config.theme.logoUrl`.
*   **Footer**: Renders `config.contact`.
*   **Theme**: Sets CSS variables based on `config.theme.primaryColor`.

### Email Templates
Do not hardcode email logic. Use templates that inject `business.name` and `business.contact` into the footer and subject lines.
