// src/lib/api.js
/**
 * Mock API function to simulate sending feedback.
 * Replace with your real backend or email service later.
 */
export async function sendFeedback({ name, email, message }) {
  console.log("Feedback submitted:", { name, email, message });
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Optional: You can integrate your real API later here
  // Example:
  // const res = await fetch("/api/feedback", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ name, email, message }),
  // });
  // if (!res.ok) throw new Error("Failed to send message");

  return { success: true };
}