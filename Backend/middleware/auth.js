import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token is provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } 
  catch (error) {
    return res.status(401).json({
      success: false,
      message: 'You have provided an invalid or expired token',
      error: error.message,
    });
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Only ${allowedRoles.join(', ')} can access this resource`,
      });
    }

    next();
  };
};

export const isCandidate = (req, res, next) => {
  if (req.user?.role !== 'candidate') {
    return res.status(403).json({
      success: false,
      message: 'Only candidates can perform this action',
    });
  }
  next();
};

export const isRecruiter = (req, res, next) => {
  if (!['recruiter', 'admin'].includes(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: 'Only recruiters can perform this action',
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Only admins can perform this action',
    });
  }
  next();
};