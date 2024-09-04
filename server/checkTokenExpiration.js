// checkTokenExpiration.js

// Your token
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRBZGRyZXNzIjoiMHg4NkE1OThiMzcxNzkxNWRDMjgxQjBjMzEzQjc0OTZDNUEyNjIyMDNDIiwiaWF0IjoxNzIzNjYxNjQ3LCJleHAiOjE3MjM2NjUyNDd9.7ajaqIxQWkZgvLBOdBel0QhayN9BkxOJyqhF-Zf-zPI";

// Decode the token manually
const base64Url = token.split('.')[1]; // Get the payload part
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

const decodedToken = JSON.parse(jsonPayload);

console.log("Decoded Token:", decodedToken);

// Check the expiration time
const expirationTime = decodedToken.exp;
const expirationDate = new Date(expirationTime * 1000);

console.log("Token Expiration Time:", expirationDate.toUTCString());

// Check if the token has expired
const currentTime = Math.floor(Date.now() / 1000);
if (currentTime > expirationTime) {
    console.log("The token has expired.");
} else {
    console.log("The token is still valid.");
}
