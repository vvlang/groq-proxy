const ANTHROPIC_API_HOST = "api.anthropic.com";

Deno.serve(async (request) => {
  const url = new URL(request.url);
  url.host = ANTHROPIC_API_HOST;
  url.protocol = "https:"; // 确保使用HTTPS协议

  // 如果需要，可以在这里添加或修改请求头
  const headers = new Headers(request.headers);
  // 例如，添加API密钥
  // headers.append("Authorization", "Bearer YOUR_ANTHROPIC_API_KEY");

  const newRequest = new Request(url.toString(), {
    headers: headers,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });

  try {
    const response = await fetch(newRequest);
    // 如果需要，可以在这里处理响应
    return response;
  } catch (error) {
    // 处理错误情况
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

console.log("Deno Deploy proxy for Anthropic API is running...");
