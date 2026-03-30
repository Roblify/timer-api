export default {
  fetch(request) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowed = [
      "https://easterbunnytracker.org",
      "https://www.easterbunnytracker.org"
    ];

    if (origin && !allowed.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": origin || "*",
      "Vary": "Origin"
    };

    if (url.pathname === "/time") {
      const now = new Date();
      const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(now.getUTCDate()).padStart(2, "0");
      const yyyy = now.getUTCFullYear();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mi = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      return new Response(`${mm}/${dd}/${yyyy} ${hh}:${mi}:${ss}`, { headers: corsHeaders });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }
};
