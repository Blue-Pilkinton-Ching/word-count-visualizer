# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

This is a **SvelteKit 5** application with **TypeScript** and **TailwindCSS v4**.

Key technologies:

- **SvelteKit 5** with the new runes-based reactivity system
- **TypeScript** for type safety
- **TailwindCSS v4** (with Vite plugin) for styling
- **Vite** as the build tool
- **pnpm** as the package manager (note the `.npmrc` and `pnpm-lock.yaml`)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking and validation
pnpm check
pnpm check:watch  # Watch mode

# Linting and formatting
pnpm lint      # Run prettier check + eslint
pnpm format    # Format code with prettier
```

## Architecture

### Project Structure

- **`src/routes/`** - SvelteKit file-based routing
- **`src/lib/`** - Reusable components and utilities (accessible via `$lib` alias)
- **`src/app.css`** - Global styles with TailwindCSS import
- **`src/app.html`** - HTML template
- **`static/`** - Static assets

### Current Implementation

- Minimal layout in `src/routes/+layout.svelte` with basic header
- Empty main page at `src/routes/+page.svelte`
- Project appears to be in early development stage

## Configuration Details

### Code Style

- **Prettier**: Uses tabs, single quotes, no trailing commas, 100 char width
- **ESLint**: TypeScript + Svelte rules with prettier integration
- Formatted code should follow the prettier configuration in `.prettierrc`

### SvelteKit Config

- Uses `@sveltejs/adapter-auto` for deployment
- Vite preprocessing enabled
- Standard SvelteKit 5 setup

### Build Tools

- **Vite** with SvelteKit and TailwindCSS plugins
- **TypeScript** configuration extends SvelteKit defaults
- **pnpm** for package management with esbuild optimization

## Development Notes

- This project uses **Svelte 5** syntax with runes (`$props()`, etc.)
- TailwindCSS v4 is configured via Vite plugin (not traditional config file)
- The project structure follows standard SvelteKit conventions
- Currently minimal implementation - main page and layout are mostly empty
