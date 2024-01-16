/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['res.cloudinary.com','img.freepik.com','source.unsplash.com','images.unsplash.com','wpamelia.com']
    },
    env:{
        MONGO_URL:"mongodb+srv://mohammadrifathossainrk:12123252@cluster0.dx8itbt.mongodb.net/networknest?retryWrites=true&w=majority",
        CLDNRY_API_KEY:"797883618939327",
        CLDNRY_API_SECRET:"NM_yTNZDzHqQPOL3lc_iao6J-4c",
    },
    reactStrictMode:false
}

module.exports = nextConfig
