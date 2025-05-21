import { NextResponse } from "next/server";

export const CustomErrorResponse = (message: string, code: HttpStatusCode) =>
  NextResponse.json(
    { error: message },
    { status: code, statusText: getStatusText(code) }
  );

export type HttpStatusCode =
  | 100 // Continue
  | 101 // Switching Protocols
  | 200 // OK
  | 201 // Created
  | 202 // Accepted
  | 204 // No Content
  | 301 // Moved Permanently
  | 302 // Found
  | 304 // Not Modified
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 405 // Method Not Allowed
  | 429 // Too Many Requests
  | 500 // Internal Server Error
  | 501 // Not Implemented
  | 502 // Bad Gateway
  | 503; // Service Unavailable

// Helper function to get status text based on code
const getStatusText = (code: HttpStatusCode): string => {
  switch (code) {
    case 200:
      return "OK";
    case 201:
      return "Created";
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 500:
      return "Internal Server Error";
    case 502:
      return "Bad Gateway";
    case 503:
      return "Service Unavailable";
    // Add more cases as needed
    default:
      return "Unknown Status";
  }
};
