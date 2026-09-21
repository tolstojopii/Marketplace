const adminMiddleware = (req, res, next)=>{
  if (req.userRole !== 'admin'){
    return res.status(403).json({
      success: false,
      message: 'Требуются права администратора'
    });
  }
  next();
}

module.exports = adminMiddleware;