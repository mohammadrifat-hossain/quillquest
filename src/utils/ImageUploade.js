import { v2 as cloudinary} from 'cloudinary'

const ImageUpload = async (file,folder) => {
    cloudinary.config({
        cloud_name: "dgbf3zt5b",
        api_key: process.env.CLDNRY_API_KEY,
        api_secret: process.env.CLDNRY_API_SECRET
    })
    
    const buffer = await file.arrayBuffer()
    const bytes = Buffer.from(buffer)

    return await new Promise((resolve,reject) =>{
        cloudinary.uploader.upload_stream({
            folder:folder,
            resource_type:"auto"
        },(error,result)=>{
            if(error){
                return reject(error.message)
            }
            return resolve(result)
        }).end(bytes)
    })
}

export default ImageUpload