// Example login route (backend)
const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // ← MUST be true on Render (HTTPS)
  sameSite: "strict",  // or "lax" if frontend/backend alag domains
  maxAge: 7 * 24 * 60 * 60 * 1000
});

return res.status(200).json({ success: true, user });