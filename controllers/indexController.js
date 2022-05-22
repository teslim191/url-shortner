const Url = require('../models/Url')

const indexController = async (req, res) => {
    // check if the urlCode is in the DB
    try {
      const url = await Url.findOne({urlCode: req.params.urlcode})
      if (url) {
        res.status(301).redirect(url.longUrl)
      } else {
        res.status(401).json({error: "Invalid Url"})
      }
    } catch (error) {
      console.log(error)
    }
}

module.exports = indexController