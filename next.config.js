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
            destination: "/auth",
            permanent: true,
          },
        ];

    
        return defaultRedirects;
      },
      images: {
        domains: ['img-c.udemycdn.com', 'kinsta.com', 'localhost'],
      },
}

module.exports= nextConfig
