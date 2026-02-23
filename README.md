# Code Share

A simple and elegant code sharing application that allows users to create, share, and collaboratively edit code snippets with time-limited URLs.

## Features

- **Instant Code Sharing**: Create a new code share and get a unique shareable URL instantly
- **Collaborative Editing**: Anyone with the URL can view and edit the shared code
- **Time-Limited Links**: All shares automatically expire after 24 hours
- **Real-Time Countdown**: See exactly how much time remains before a share expires
- **Clean UI**: Modern, responsive design with syntax highlighting support
- **No Authentication Required**: Simple and frictionless sharing experience

## How It Works

1. **Create a Share**: Visit the homepage and paste your code into the editor
2. **Get a Unique URL**: Click "Create Shareable Link" to generate a unique URL with a UUID
3. **Share the Link**: Anyone with the URL can view and edit the code
4. **Automatic Expiration**: The share and its URL become invalid after 24 hours

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **Icons**: Lucide React

## Database Schema

The application uses a single table `code_shares`:

- `id` (UUID): Unique identifier for each share
- `code` (TEXT): The shared code content
- `created_at` (TIMESTAMPTZ): When the share was created
- `expires_at` (TIMESTAMPTZ): When the share expires (24 hours after creation)

## Security

- Row Level Security (RLS) enabled on all tables
- Public access for creating and reading non-expired shares
- Automatic cleanup of expired shares
- No sensitive data stored

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── NewShare.tsx       # Create new code shares
│   └── ShareEditor.tsx    # View and edit existing shares
├── lib/
│   └── api
|       └── axiosInstance.ts     # Axios setup
├── App.tsx                # Main app with routing logic
└── main.tsx              # Entry point
```

## Usage Examples

### Creating a New Share

1. Visit the homepage
2. Paste your code in the editor
3. Click "Create Shareable Link"
4. Share the generated URL with others

### Editing a Share

1. Open a share URL
2. Edit the code in the editor
3. Click "Save Changes" to update
4. Changes are visible to everyone with the link

### Copying the Share Link

Click the "Copy Link" button to copy the current URL to your clipboard

## Automatic Cleanup

The application automatically removes expired shares in two ways:

1. **On Access**: When loading a share, expired entries are cleaned up
2. **Database Function**: A PostgreSQL function handles bulk cleanup

## Limitations

- Shares expire after exactly 24 hours
- No user authentication or ownership
- No version history or undo functionality
- No syntax highlighting (can be added if needed)

## Future Enhancements

Potential features for future versions:

- Syntax highlighting for different programming languages
- Password protection for sensitive shares
- Custom expiration times
- View-only mode option
- Download code as file
- Dark/light theme toggle
- Code execution for supported languages

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for any purpose.
