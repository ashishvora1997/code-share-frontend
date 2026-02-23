# SharedCode

A **simple, elegant, and secure code sharing application** that allows users to create, share, and collaboratively edit code snippets via time-limited URLs. Perfect for quick collaboration, sharing snippets with friends, or debugging with teammates—without the hassle of accounts or logins.

**Live Demo:** [https://code-share-frontend.onrender.com](https://code-share-frontend.onrender.com)
---

## Features

* **Instant Code Sharing** – Generate a unique shareable URL in seconds
* **Collaborative Editing** – Anyone with the URL can view and edit in real time
* **Time-Limited Links** – Shares automatically expire after 24 hours
* **Real-Time Countdown** – See exactly how much time remains before a share expires
* **Clean UI** – Modern, responsive interface with optional syntax highlighting
* **No Authentication Required** – Share without accounts, emails, or logins

---

## How It Works

1. **Create a Share:** Paste your code into the editor on the homepage
2. **Generate a URL:** Click "Create Shareable Link" to generate a unique UUID-based URL
3. **Share the Link:** Anyone with the URL can view and edit the code
4. **Automatic Expiration:** The share becomes invalid after 24 hours

---

## Technology Stack

* **Frontend:** React + TypeScript + Vite
* **Styling:** Tailwind CSS
* **Database:** PostgreSQL
* **Icons:** Lucide React

---

## Database Schema

The application uses a single table: `code_shares`

| Column       | Type        | Description                               |
| ------------ | ----------- | ----------------------------------------- |
| `id`         | UUID        | Unique identifier for each share          |
| `code`       | TEXT        | The shared code content                   |
| `created_at` | TIMESTAMPTZ | When the share was created                |
| `expires_at` | TIMESTAMPTZ | Expiration time (24 hours after creation) |

---

## Security

* Row Level Security (RLS) enabled on all tables
* Public access for creating and reading **non-expired shares**
* Automatic cleanup of expired shares
* No sensitive user data is stored

---

## Getting Started

### Prerequisites

* Node.js 18+ installed
* PostgreSQL for database

### Installation

```bash
# Clone the repository
git clone https://github.com/ashishvora1997/code-share-frontend.git

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── NewShare.tsx       # Create new code shares
│   └── ShareEditor.tsx    # View and edit existing shares
├── lib/
│   └── api/
│       └── axiosInstance.ts     # Axios setup
├── App.tsx                # Main app with routing logic
└── main.tsx               # Entry point
public/
├── logo.svg
└── preview.png
index.html                 # Application HTML template
```

---

## Usage Examples

### Creating a New Share

1. Visit the homepage
2. Paste your code into the editor
3. Click **"Create Shareable Link"**
4. Share the generated URL

### Editing a Share

1. Open a share URL
2. Edit the code in the editor
3. Click **"Save Changes"**
4. Changes are visible to everyone with the link

### Copying the Share Link

Click the **"Copy Link"** button to copy the current URL to your clipboard

---

## Automatic Cleanup

Expired shares are automatically removed:

1. **On Access:** Loading a share triggers expired entries cleanup
2. **Database Function:** PostgreSQL function handles bulk cleanup

---

## Limitations

* Shares expire after exactly 24 hours
* No user authentication or ownership
* No version history or undo functionality
* Syntax highlighting is not enabled by default (can be added)

---

## Future Enhancements

* Syntax highlighting for multiple languages
* Password-protected shares
* Custom expiration times
* View-only mode
* Download code as file
* Dark/light theme toggle
* Code execution for supported languages

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to submit pull requests or open issues.

---

## License

This project is licensed under the **MIT License** – free to use for any purpose.

---

**Live Demo:** [https://code-share-frontend.onrender.com](https://code-share-frontend.onrender.com)
