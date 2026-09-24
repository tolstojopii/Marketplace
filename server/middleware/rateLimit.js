
const rateLimit = require('express-rate-limit')
const skip = () => process.env.NODE_ENV !== "production";


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  skip,
  message: {success: false, message: 'Слишкиом много запросов, попробуйте позже'}
})



const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip,
  message: { success: false, message: 'Слишком много попыток входа, попробуйте позже' },
})

module.exports = {apiLimiter, authLimiter}