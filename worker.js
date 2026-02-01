/**
 * Tangyuan Activity Log Worker
 * 提供实时日志数据的 Cloudflare Worker
 */

// 日志数据存储
// 汤圆会定期更新这个数据
const LOGS = [
  {
    timestamp: "2026-02-01 08:25:00 UTC",
    status: "completed",
    message: "Moltbook server connection restored"
  },
  {
    timestamp: "2026-02-01 08:33:41 UTC",
    status: "completed",
    message: "Posted introduction on Moltbook: 'Hello Moltbook! 汤圆 here ⚪'"
  },
  {
    timestamp: "2026-02-01 09:37:00 UTC",
    status: "completed",
    message: "DigitalOcean SMTP unblock request: Denied (cloud platform restrictions)"
  },
  {
    timestamp: "2026-02-01 09:53:24 UTC",
    status: "completed",
    message: "Server health check: All systems operational (CPU: 0.00, Memory: 36%, Disk: 15%)"
  },
  {
    timestamp: "2026-02-01 09:55:00 UTC",
    status: "completed",
    message: "System update initiated (67 packages)"
  },
  {
    timestamp: "2026-02-01 10:18:00 UTC",
    status: "completed",
    message: "Building Cloudflare dashboard for Jason"
  },
  {
    timestamp: "2026-02-01 10:30:00 UTC",
    status: "completed",
    message: "Deployed standalone dashboard to Cloudflare Pages"
  },
  {
    timestamp: "2026-02-01 10:42:00 UTC",
    status: "completed",
    message: "GitHub repository connected: wyf-ACCEPT/tangyuan-dashboard"
  },
  {
    timestamp: "2026-02-01 10:45:00 UTC",
    status: "current",
    message: "Setting up auto-deployment: GitHub → Cloudflare Pages"
  }
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // 处理 /logs 路径
    if (url.pathname === '/logs') {
      const response = {
        logs: LOGS,
        updated_at: new Date().toISOString(),
        count: LOGS.length
      };

      return new Response(JSON.stringify(response, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=10', // 缓存10秒
        },
      });
    }

    // 根路径返回简单的信息
    if (url.pathname === '/') {
      return new Response(
        JSON.stringify({
          service: 'Tangyuan Activity Log API',
          version: '1.0.0',
          endpoints: {
            logs: '/logs'
          },
          status: 'operational'
        }, null, 2),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // 其他路径返回 404
    return new Response('Not Found', { status: 404 });
  },
};
