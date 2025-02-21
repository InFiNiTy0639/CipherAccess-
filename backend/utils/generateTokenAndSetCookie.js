import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //csrf
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

// Cookies are small pieces of data stored in the browser and sent with HTTP requests.
// Using httpOnly, secure, and sameSite enhances security by limiting how and when the cookie is accessed or sent.


// Flow -:
// User logs in → Server checks credentials → Calls generateTokenAndSetCookie → Sets cookie in the response.
// User makes a request to a protected route → Cookie is sent automatically → Server verifies the JWT → Grants access if valid.


// Why Store a cookie?
// Automatic Handling: Browsers send cookies with every request to the domain, simplifying client-side logic.
// Security: httpOnly prevents JavaScript access, reducing XSS risks compared to storing in localStorage.