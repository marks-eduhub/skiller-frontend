# Waape - NextJS Template

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Development

To get started, clone this repo and run `yarn` to install all dependencies.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Utilities

This repo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [ShadCN UI](https://shadcn.com/) for UI components
- [React Hot Toast](https://react-hot-toast.com/) for toast notifications
- [React Icons](https://react-icons.github.io/react-icons/) for icons

### Recommended Optional Utilities

- [React Query](https://react-query.tanstack.com/) for data fetching with Rest API
- [React Apollo Client](https://www.apollographql.com/docs/react/) for data fetching with GraphQL
- [React Hook Form](https://react-hook-form.com/) for forms
- [Formik](https://formik.org/) for forms

## Deployment

We have setup Vercel API and GitHub Actions for you to deploy your app to Vercel.

Setup the following GitHub Action Secrets in your repo:

- `VERCEL_ORG_ID` - Your Vercel Organization ID
- `VERCEL_PROJECT_ID` - Your Vercel Project ID
- `VERCEL_TOKEN` - Your Vercel Token
- `SLACK_BOT_TOKEN` - Your Slack Bot Token


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
