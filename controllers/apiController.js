const validUrl = require('valid-url')
const shortid =  require('shortid')
const Url = require('../models/Url')

const baseUrl = "http://localhost:7000/"
const apiController = async (req, res)=>{
    const {longUrl} = req.body
  
    // Check if the baseurl is valid
    if(!validUrl.isUri(baseUrl)){
      res.status(400).json({error: 'Invalid base url'})
    }
    // if it is a valid url, then create a short urlcode
    const urlCode = shortid.generate()
    // check if the long url is valid
    if(validUrl.isUri(longUrl)){
      try {
        // check if the long url is already in the database
        let url = await Url.findOne({longUrl})
        if (url) {
          res.status(200).json({msg : 'Url already exists', shortUrl: baseUrl + url.urlCode})
        }
        else{
          // if the long url is not in the database, then create a new url
          // create the shorturl code
          const shortUrl = `${baseUrl}${urlCode}`
          url = new Url({
            urlCode,
            longUrl,
            shortUrl,
            date: new Date
          })
          // Url.create({urlCode,longUrl,shortUrl,date: new Date})
          await url.save()
          res.json(url)
        }
      } catch (error) {
        console.log(error)
      }
    }
    else{
      res.status(401).json({error: "Invalid longUrl"})
    }
}

module.exports = apiController