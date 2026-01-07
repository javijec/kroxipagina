# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a Next.js 15 application using the App Router with Puck (@measured/puck) for visual page building. The project uses:
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode disabled for Next.js compatibility)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Page Builder**: Puck for visual page editing
- **Data Storage**: JSON file-based (database.json) - replace with real database in production

## Development Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint (uses custom config)

# Testing
# No test framework currently configured
# To add tests: install jest/vitest and configure accordingly
```

## Code Style Guidelines

### Imports
- Use ES6 import/export syntax
- External libraries first, then internal modules
- Example:
```typescript
import { ReactNode } from "react";
import { NextResponse } from "next/server";
import { getPage } from "../../lib/get-page";
```

### TypeScript
- Use interfaces for object shapes, types for unions/primitives
- Leverage Puck's generic types (`Data`, `Config`)
- Use proper typing for Next.js params (Promise-based)
- Example:
```typescript
type Props = {
  HeadingBlock: { title: string };
  GridBlock: {};
};

export default async function Page({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  // ...
}
```

### Components
- Use functional components with React 19 patterns
- Add "use client" directive for client-side components
- Separate client components into dedicated files when needed
- Example:
```typescript
"use client";

import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";

export function Client({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
```

### File Structure
- `/app` - Next.js App Router pages and layouts
- `/app/puck` - Puck editor routes and API
- `/lib` - Utility functions and data access
- `puck.config.tsx` - Puck component configuration
- Follow Next.js App Router conventions for routing

### Styling
- Use Tailwind CSS v4 utility classes
- Import styles with `@import "tailwindcss"`
- Use className prop for styling
- For dynamic styles, combine with inline styles when necessary
- Example:
```typescript
<div className="text-4xl font-bold p-4">
  <h1>{title}</h1>
</div>
```

### Error Handling
- Use Next.js `notFound()` for missing pages
- Implement try-catch for async operations
- Return proper Next.js responses in API routes
- Example:
```typescript
if (!data) {
  return notFound();
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    // ...
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### Naming Conventions
- **Components**: PascalCase (HeadingBlock, GridBlock)
- **Functions**: camelCase (getPage, generateMetadata)
- **Variables**: camelCase (puckPath, existingData)
- **Files**: kebab-case for utilities, PascalCase for components

### API Routes
- Use Next.js App Router API routes in `/app/*/api/route.ts`
- Implement proper HTTP methods (GET, POST, etc.)
- Use NextResponse for consistent responses
- Handle JSON parsing with error handling
- Example:
```typescript
export async function POST(request: Request) {
  const payload = await request.json();
  // Process data
  revalidatePath(payload.path);
  return NextResponse.json({ status: "ok" });
}
```

## Puck-Specific Patterns

### Component Configuration
- Define components in `puck.config.tsx` with proper TypeScript types
- Use `fields` for component properties
- Implement `defaultProps` for initial values
- Use `render` for component output
- Example:
```typescript
export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: { title: { type: "text" } },
      defaultProps: { title: "Heading" },
      render: ({ title }) => (
        <div className="text-4xl font-bold p-4">
          <h1>{title}</h1>
        </div>
      ),
    },
  },
};
```

### Data Structure
- Use Puck's `Data` type for page data
- Structure data with root.props for page-level properties
- Access data through utility functions in `/lib`

### DropZone Usage
- Use DropZone components for nested layouts
- Define zone names consistently
- Apply proper styling with Tailwind classes

## Development Notes

### Static vs Dynamic Rendering
- Public pages use `export const dynamic = "force-static"`
- Editor pages use `export const dynamic = "force-dynamic"`
- This enables static generation for public pages while keeping editor dynamic

### Middleware Configuration
- `/edit` routes are rewritten to `/puck` routes via middleware
- Direct `/puck` access is redirected to root
- This provides clean URLs for editing

### Database Integration
- Current implementation uses JSON file storage
- Replace `getPage` and API routes with real database calls
- Maintain the same interface for compatibility

### Security Considerations
- Add authentication to `/edit` routes before production
- Validate all user inputs in API routes
- Implement proper authorization for page editing

## Testing Guidelines

When adding tests:
- Use Jest or Vitest for unit/integration testing
- Test component rendering with React Testing Library
- Mock API routes for component testing
- Test Puck configuration separately
- Example test structure to be added:
```
/__tests__/
  /components/
  /lib/
  /puck.config.test.tsx
```

## Common Issues

1. **TypeScript Errors**: Ensure proper typing for Next.js params (Promise-based)
2. **Styling Issues**: Check Tailwind CSS v4 syntax and imports
3. **Puck Editor**: Verify middleware configuration for `/edit` routes
4. **Static Generation**: Ensure `force-static` is set for public pages
5. **API Routes**: Handle async operations properly with error boundaries

## Linting

- ESLint uses custom configuration (`eslint-config-custom`)
- Run `npm run lint` before commits
- Fix any linting issues before submitting changes