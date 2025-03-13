import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

const TARGET_API_URL = "https://api.example.com";

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path === "/forward" && req.method === "POST") {
    try {
      const body = await req.json();
      console.log("Received request body:", body);

      const targetResponse = await fetch(`${TARGET_API_URL}/endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const targetData = await targetResponse.json();

      return new Response(JSON.stringify({
        status: "success",
        data: targetData,
        message: "Request forwarded by Grok",
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error forwarding request:", error);
      return new Response(JSON.stringify({
        status: "error",
        message: "Failed to forward request",
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response(JSON.stringify({
    message: "Welcome to Grok's API Forwarding Platform!",
    availableEndpoints: ["/forward"],
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

console.log("Grok API Forwarding Platform running on http://localhost:8000");
serve(handleRequest, { port: 8000 });
