/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // HLS配下に共通ヘッダーを付与
        source: "/video/hls/:path*",
        headers: [
          // ブラウザによるMIME推測を抑止（念のため）
          { key: "X-Content-Type-Options", value: "nosniff" },
          // ★開発中はキャッシュ無効、本番で 1年キャッシュなどに変更
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
