# Qualitiy

with Qualitiy you send clients info with confirmed purchase to meta resulting in a better meta ads results

<!-- Optional badges (build, license, version) -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Api** Can be implemented in your website using api
- **Ecommerce Integration** Algerian express api can be used to send data clients 
- **Meta api** Integrated with Meta Capi

## Getting Started

### Prerequisites

- Node.js >= 18 
- PostgreSql

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/username/project-name.git](https://github.com/username/project-name.git)
   cd backend
   npm install
   cd frontend
   cd frontend
   npm install
2.Set up .env variables
```bash
create a .env files in both /backend
//database
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
//better-auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
//google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
//chargily
CHARGILY_API_KEY=
//encryption
ENCRYPTION_KEY=
//meta
META_GRAPH_VERSION=
and /frontend/frontend
VITE_API_BASE_URL=http://localhost:3000
VITE_API_FRONTEND_URL=http://localhost:5173
```
3.Set up database (PostgreSql)
```bash
psql commands
-- Enable UUID extension if not already loaded (required for gen_random_uuid())
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: user (quoted because "user" is a reserved keyword in PostgreSQL)
CREATE TABLE public."user" (
    id text PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" boolean NOT NULL,
    image text,
    "createdAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL
);

-- Table: account
CREATE TABLE public.account (
    id text PRIMARY KEY,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp without time zone,
    "refreshTokenExpiresAt" timestamp without time zone,
    scope text,
    password text,
    "createdAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL
);

-- Table: session
CREATE TABLE public.session (
    id text PRIMARY KEY,
    "expiresAt" timestamp without time zone NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" text NOT NULL
);

-- Table: verification
CREATE TABLE public.verification (
    id text PRIMARY KEY,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL
);

-- Table: plans
CREATE TABLE public.plans (
    id serial PRIMARY KEY,
    name character varying(50) NOT NULL,
    price numeric NOT NULL DEFAULT 0.00,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: sellers
CREATE TABLE public.sellers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    api_key character varying(255),
    subscription_status character varying(50) DEFAULT 'inactive'::character varying,
    current_period_end timestamp with time zone,
    checkout_id text,
    user_id text NOT NULL,
    plan_id integer,
    webhook_secret text,
    mode character varying(20) DEFAULT 'manual'::character varying
);

-- Table: seller_integrations
CREATE TABLE public.seller_integrations (
    id serial PRIMARY KEY,
    seller_id uuid,
    provider_name character varying(50) NOT NULL,
    encrypted_credentials text NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    webhook_token text
);

-- Table: orders
CREATE TABLE public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id uuid,
    order_number character varying(100),
    tracking_number character varying(100),
    status character varying(50) DEFAULT 'pending'::character varying,
    amount numeric,
    currency character varying(10) DEFAULT 'DZD'::character varying,
    customer_phone character varying(50),
    client_ip character varying(50),
    user_agent text,
    fbp character varying(255),
    fbc character varying(255),
    order_timestamp bigint,
    created_at timestamp without time zone DEFAULT now(),
    meta_event_id character varying(255),
    meta_status character varying(50) DEFAULT 'pending'::character varying,
    meta_sent_at timestamp without time zone,
    meta_error text,
    carrier character varying(50),
    first_name character varying(100),
    family_name character varying(100),
    address text,
    wilaya text,
    commune text,
    product_list text
);



   
