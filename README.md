# Kanban Board

A modern, responsive Kanban board application built with React, TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- **Node.js** 16.0.0 or higher
- **npm** 7.0.0 or higher (or yarn/pnpm)

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, Vite, UI components, and the mock API server.

Note: Axios is included in the project dependencies and is used as the HTTP client in the frontend API client (`src/lib/mock-api.ts`). No extra installation step is required beyond `npm install`.

### 2. Configure TypeScript Path Alias (if needed)

The project uses TypeScript path aliases (e.g., `@/` for the `src/` directory). The configuration is already set up in `tsconfig.app.json`. If you encounter import errors, ensure the path alias is properly configured:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Development

### Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:8080` with hot module reloading (HMR).

### Run Mock API Server (in a separate terminal)

```bash
npm run mock
```

This starts `json-server` on port 4000, which simulates a backend API. It watches `db.json` and exposes REST endpoints at `http://localhost:4000/tasks`.

**Note:** You can customize the API URL in `.env` file:

```env
VITE_MOCK_API_URL=http://localhost:4000
```

Variables prefixed with `VITE_` are automatically injected by Vite.

### Run Both Servers Concurrently

Open two terminals and run:

- Terminal 1: `npm run dev`
- Terminal 2: `npm run mock`

Alternatively, run both with a single command (starts the Vite dev server and the mock API concurrently):

```bash
npm run dev:all
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Script            | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start the development server with HMR   |
| `npm run build`   | Build the application for production    |
| `npm run preview` | Preview the production build locally    |
| `npm run mock`    | Start the mock API server (json-server) |
| `npm run lint`    | Run ESLint to check code quality        |
| `npm run dev:all` | Start dev server and mock API together  |

## Project Structure

```
src/
├── components/
│   ├── kanban/           # Kanban board components
│   │   ├── AddTaskDialog.tsx
│   │   ├── EditTaskDialog.tsx
│   │   ├── KanbanColumn.tsx
│   │   └── TaskCard.tsx
│   └── ui/               # Reusable UI components
├── hooks/
│   ├── use-tasks.ts      # Tasks data management hook
│   └── use-toast.ts      # Toast notifications hook
├── lib/
│   ├── kanban-types.ts   # TypeScript type definitions
│   ├── mock-api.ts       # Mock API client
│   └── utils.ts          # Utility functions
├── pages/
│   ├── Index.tsx         # Main kanban page
│   └── NotFound.tsx      # 404 page
├── App.tsx               # Root component
└── main.tsx              # Application entry point
```

## Technology Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with PostCSS
- **UI Components:** shadcn/ui (Radix UI)
- **State Management:** React Hooks
- **Mock Backend:** json-server
- **Code Quality:** ESLint
- **HTTP Client:** Axios

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Organize tasks by status (Todo, In Progress, Done)
- ✅ Set task priorities (Low, Medium, High)
- ✅ Responsive design for all screen sizes
- ✅ Real-time synchronization with mock API
- ✅ Smooth animations and transitions

## Troubleshooting

### Import Errors

If you see errors like "Cannot find module '@/...'", ensure `tsconfig.app.json` includes the path alias configuration (see Installation step 2).

### Port Already in Use

- Dev server default: `8080` (configurable in `vite.config.ts`)
- Mock API default: `4000` (configurable when running `npm run mock`)

If ports are in use, you can change them or stop conflicting processes.

### Module Not Found Errors

Run `npm install` again to ensure all dependencies are properly installed.
