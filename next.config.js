/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    redirects: async () => {
        // permanently has us in the right route
        const defaultRedirects = [
          {
            source: "/",
            destination: "/dashboard",
            permanent: true,
          },
        ];

    
        return defaultRedirects;
      },
}

module.exports= nextConfig
