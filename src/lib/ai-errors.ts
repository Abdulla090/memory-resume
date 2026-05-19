export function getAiErrorMessage(error: unknown, isKu: boolean, fallback?: string) {
  const raw = error instanceof Error ? error.message : String(error || "");
  const message = raw.toLowerCase();

  if (raw.includes("MISSING_API_KEY") || message.includes("missing_api_key")) {
    return isKu
      ? "کلیلی Gemini API دانەنراوە. لە ڕێکخستنەکان کلیل دابنێ یان GEMINI_API_KEY لە سێرڤەر دابنێ."
      : "Gemini API key is missing. Add one in Settings or configure GEMINI_API_KEY on the server.";
  }

  if (raw.includes("INVALID_API_KEY") || message.includes("invalid api key")) {
    return isKu
      ? "کلیلی API دروست نییە. تکایە کلیلەکە بپشکنە."
      : "The API key is invalid. Please check the key and try again.";
  }

  if (raw.includes("AI_RATE_LIMIT") || message.includes("rate limit")) {
    return isKu
      ? "سنوری بەکارهێنانی AI پڕ بووە. چەند خولەکێک چاوەڕێ بکە و دووبارە هەوڵ بدەرەوە."
      : "AI rate limit reached. Wait a moment and try again.";
  }

  if (
    raw.includes("AI_SERVICE_UNAVAILABLE") ||
    raw.includes("AI_REQUEST_FAILED") ||
    message.includes("api error") ||
    message.includes("500")
  ) {
    return isKu
      ? "خزمەتگوزاری AI لە ئێستادا وەڵام نادات. دووبارە هەوڵ بدەرەوە."
      : "The AI service is not responding right now. Please try again.";
  }

  if (raw && raw !== "[object Object]") return raw;
  return fallback ?? (isKu ? "هەڵەیەک ڕوویدا. دووبارە هەوڵ بدەرەوە." : "Something went wrong. Try again.");
}
