/** @type {import("next").NextConfig} */
const nextConfig = {
    webpack: config => {
        config.externals.push("pino-pretty", "lokijs", "encoding", "net", "tls", "fs")
        return config
    },
}

export default nextConfig
