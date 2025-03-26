const fs = require('fs');

const uploadImage = (req,res,next)=>{

    let {profile} = req.body;

    // Extract Base64 content
    const matches = profile.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return res.json({ statusCode: 200, message: 'Invalid Base64 format' });
    }
    
    const fileType = matches[1].split('/')[1]; // Get file type (e.g., png, jpg)
    const fileData = matches[2];
    
    const d = new Date();

    // Save file to server
    const fileName = `${d.getFullYear()}${d.getTime()}${d.getMilliseconds()}${d.getSeconds()}.${fileType}`
    const filePath = `uploads/${fileName}`;
    
    fs.writeFile(filePath, fileData, 'base64', (err) => {
        if (err) return res.json({statusCode:200 ,  message: 'File save failed', error: err });
        req.body.profile = fileName;
        next();
    });
    
}

module.exports = uploadImage;

