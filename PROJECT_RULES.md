# ACCA Project Rules

## Architecture
- Feature-based folder structure
- Shared components in src/components/common
- API calls only through src/redux/api
- Auth section api call from src/rudux/api/authApi.ts
- No direct fetch in components

## UI Rules
- Use shedcn component
- Use shedcn Button component
- Use existing FormInput component
- Use existing FormSelect component
- Use existing FormTextarea component
- Use existing FormFileInput component
- Follow Tailwind utility classes

## Naming Convention
- Components: PascalCase
- Hooks: useSomething
<!-- - Files: kebab-case -->

## State Management
- Use Redux toolkit

## Forms
- Always use React Hook Form
- Always use Zod validation

1. Analyze existing project.
2. Search for reusable components.
3. Search for similar pages.
4. Reuse existing patterns.
5. Explain what is being reused.
6. Generate code.
