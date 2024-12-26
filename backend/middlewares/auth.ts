import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// JWT payload için bir arayüz tanımlayın
interface JwtPayload {
  id: string;
}

// Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Token kontrolü
  if (!req.headers.authorization?.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Token bulunamadı' });
  }

  try {
    // Bearer token'dan JWT'yi çıkar
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Kullanıcıyı veritabanından al
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Request'e kullanıcı bilgilerini ekle
    req.user = {
      _id: user._id as string,
      name: user.name,
      email: user.email,
    };

    next(); // İşlemi bir sonraki middleware'e geçir
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token süresi dolmuş' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Geçersiz token' });
    }

    next(error); // Diğer hataları merkezi hata yönetimine geçir
  }
};
