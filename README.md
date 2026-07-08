# SigPaaS

`sigPaaS` combines a web frontend with Solidity/Hardhat project files. The repository is organized for building, testing, and documenting a decentralized application workflow.

## Features

- Application routes/pages and reusable React components
- Frontend build configuration for a modern web app
- Smart contract source, deployment, or test workflow

## Tech Stack

- Next.js
- React
- TypeScript/JavaScript
- Solidity
- Hardhat

## Project Structure

- `README.md` - project documentation
- `backend` - backend service code
- `frontend` - frontend application code

## Getting Started

### Prerequisites

- Node.js 18+
- A configured Web3 wallet or RPC endpoint when deploying contracts

### Setup

```bash
git clone https://github.com/ENZOMOTIVE/sigPaaS.git
cd sigPaaS
```

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
npm run dev
```

## Available Commands

- `backend/package.json` - scripts: `test`
- `frontend/package.json` - scripts: `dev`, `build`, `start`, `lint`

## Configuration

- Create a local `.env` file for secrets, API keys, RPC URLs, private keys, bot tokens, or database credentials.
- Keep `.env` files out of version control and document required variable names as the project stabilizes.

## Testing and Quality

- From `backend`, run `npm test`.
- From `frontend`, run `npm run lint`.
- From `frontend`, run `npm run build`.
- Run the Hardhat test suite if the repo includes contract tests.

## Roadmap

- Keep setup instructions aligned with the actual project workflow.
- Add screenshots, architecture notes, or API examples as the implementation grows.
- Document deployment steps once the hosting target is finalized.

## Contributing

1. Create a feature branch.
2. Make focused changes and update documentation when behavior changes.
3. Run the relevant checks before opening a pull request.

## License

No license file is currently included. Add one before distributing or reusing this project publicly.
