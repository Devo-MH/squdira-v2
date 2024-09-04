Here’s the complete `README.md` file for your project, including the wallet-based login, JWT handling, and refresh token details.

### **README.md**:

```markdown
# Squdira Web3 Platform

## Overview

Squdira is a Web3 gaming platform that allows users to authenticate using their Ethereum wallet and securely interact with various Web3 games. The platform uses **JWT** and **refresh token** mechanisms for authentication, ensuring a seamless and secure experience for users.

### Key Features
- **Wallet-based Login**: Users log in using their Ethereum wallet (e.g., MetaMask).
- **JWT Authentication**: Short-lived access tokens are generated for secure API access.
- **Refresh Tokens**: Refresh tokens allow users to maintain their session for up to 7 days without needing to re-login.
- **Protected Routes**: Access to certain routes is restricted and requires valid authentication.

---

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (Atlas or local instance)
- MetaMask or any Ethereum wallet

### Environment Variables

Create a `.env` file in the `server` directory with the following configuration:

```plaintext
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
MONGO_URI=your_mongo_database_uri
NODE_ENV=development  # or production for live environments
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/squdira.git
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Start the server**:
   ```bash
   cd ../server
   node server.js
   ```

5. **Start the React client**:
   ```bash
   cd ../client
   npm start
   ```

---

## API Documentation

### Wallet Login

**POST** `/api/users/wallet-login`

- **Description**: Authenticates the user using their wallet address.
- **Request Body**:
  ```json
  {
    "walletAddress": "0xYourWalletAddress"
  }
  ```
- **Response**:
  - Access token (JWT) in response body.
  - Refresh token in HTTP-only cookie.

### Get User Data (Protected Route)

**GET** `/api/users/user-data`

- **Description**: Fetches the logged-in user's profile information.
- **Headers**:
  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```
- **Response**:
  ```json
  {
    "walletAddress": "0xYourWalletAddress",
    "username": "user_123abc",
    "email": "user_123abc@example.com"
  }
  ```

### Refresh Token

**POST** `/api/users/refresh-token`

- **Description**: Refreshes the access token using the refresh token stored in cookies.
- **Response**:
  - New access token (JWT).

---

## Frontend Overview

### Authentication Flow

1. Users log in by connecting their Ethereum wallet (e.g., MetaMask).
2. Upon successful login, the platform generates an access token (JWT) and a refresh token.
3. The access token is stored client-side and is used for authenticated API requests.
4. The refresh token is stored in an HTTP-only cookie and used to refresh the access token when it expires.

### Protected Routes

Certain routes, such as the user profile, are protected and require a valid JWT token. If the token is missing or expired, the user is redirected to the login page.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT for access tokens, refresh tokens for session persistence
- **Ethereum Wallet Integration**: MetaMask

---

## Development

### Running the Client and Server

To run both the client and server in development mode:

1. Start the **server**:
   ```bash
   cd server
   node server.js
   ```

2. Start the **client**:
   ```bash
   cd ../client
   npm start
   ```

---

## Future Features

- **Tournament Integration**: Add the ability to create and join Web3 gaming tournaments.
- **Game Discovery**: Enhance the game discovery process by integrating more games and providing better search/filter options.
- **Marketplace**: Implement an in-game asset marketplace where users can trade NFTs and game-related assets.
- **Social Features**: Add social features such as friend lists, messaging, and player leaderboards.

---

## Contributing

Feel free to open issues or submit pull requests for any bugs or features you'd like to contribute!

---

## License

This project is licensed under the MIT License.
```

---


Let me know if you need any further help!