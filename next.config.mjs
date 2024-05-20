/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            { 
                source: '/workspace/settings', 
                destination: '/workspace/settings/general', 
                permanent: true, 
            }, 
        ];
    }
};

export default nextConfig;
