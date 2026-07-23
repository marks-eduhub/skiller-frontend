/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        serverActions: true,
    },
    redirects: async () => {
      
        // permanently has us in the right route
        const defaultRedirects = [
          {
            source: "/",
            destination: "/auth",
            permanent: true,
          },
        ];

    
        return defaultRedirects;
      },
      images: {
        domains: [
          'img-c.udemycdn.com',
          'localhost',
          'storage.googleapis.com',
        ],
      },
}

module.exports= nextConfig
