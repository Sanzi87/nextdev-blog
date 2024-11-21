# Next.js Blog

A Simple and Modern Blog Built with Next.js 15, TypeScript, and a Powerful Tech Stack

## Live Demo

Experience the live version of the blog at: [nextdev-solutions.com](https://nextdev-solutions.com)

## About the Project

This project is a simple coding blog built with the latest technologies, designed to provide a seamless experience for both users and developers. It leverages the capabilities of Next.js 15 and TypeScript to deliver high performance, scalability, and developer-friendly features.

## Key Features

- **Authentication:** Secure user authentication via OAuth with next-auth (supports Google and GitHub login).
- **Database Connection:** Robust data handling powered by prisma.
- **Email Functionality:** Integrated email sending with nodemailer.
- **Notifications:** Real-time user feedback via react-toastify.
- **Form Handling:** Advanced form validation using react-hook-form and zod.
- **Recaptcha Integration:** Bot protection with next-recaptcha-v3.
- **Code Highlighting:** Enhanced blog posts with syntax highlighting (react-syntax-highlighter) and copy functionality (react-copy-to-clipboard).
- **Icons and UI Design:** Simple, responsive design using tailwindcss, daisyui, and react-icons.
- **Markdown Support:** Easy content creation and rendering with react-markdown.

## Tech Stack

- Framework: Next.js 15
- Language: TypeScript
- Database: Prisma
- Authentication: NextAuth.js
- Styling: Tailwind CSS and daisyUI

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js: v22.8.6 or later
- npm: v7 or later
- PostgreSQL/MySQL Database (or any Prisma-supported database)

Clone the repository:

```bash
git clone https://github.com/Sanzi87/nextdev-blog
cd your-project-name
```

## Installation

Install dependencies:

```bash
npm install
```

Create the .env file:
In the root directory, create a file named .env and add the following rows and replace placeholder values with your credentials:

```ini
#DB
DATABASE_URL="your_database_url"
NEXTAUTH_URL="your_nextauth_url"
NEXTAUTH_SECRET="your_nextauth_secret"

#AUTHENTICATION
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_ID="your_github_id"
GITHUB_SECRET="your_github_secret"

#ANALYTICS
NEXT_PUBLIC_GOOGLE_ANALYTICS="your_google_analytics_id"

#RECAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITEKEY="your_recaptcha_sitekey"
RECAPTCHA_SECRETKEY="your_recaptcha_secretkey"

#MAILER
NODEMAILER_USR="your_email_username"
NODEMAILER_PASS="your_email_password"
NODEMAILER_FROM="your_email_from_address"
NODEMAILER_HOST="your_email_host"
NODEMAILER_PORT="your_email_port"
NODEMAILER_MAILTO="recipient_email_address"
```

## Run the Development Server

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

## Build for Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Dependencies

Here’s a breakdown of the major dependencies used in this project:

- **Authentication:** next-auth
- **Database:** prisma
- **Mail Sender:** nodemailer
- **Notifications:** react-toastify
- **HTTP Requests:** axios
- **Form Validation:** react-hook-form, zod
- **Recaptcha:** next-recaptcha-v3
- **Code Highlighting:** react-syntax-highlighter, react-copy-to-clipboard
- **Icons:** react-icons
- **Styling:** tailwindcss, daisyui
- **Markdown Rendering:** react-markdown

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Sanzi87/nextdev-blog/blob/main/LICENSE.md) file for details.

## Enjoy building with the power of Next.js and TypeScript!
