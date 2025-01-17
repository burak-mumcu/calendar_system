import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserCredentials } from '../lib/types';
import { LoginFormProps } from '../lib/types';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserCredentials>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<UserCredentials>>({});

  const validateForm = () => {
    const newErrors: Partial<UserCredentials> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre zorunludur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 hover:text-gray-700 transition-colors">
          Giriş Yap
        </h2>
        
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        
        <Input
          label="Şifre"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
        />
        
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading} className="w-full">
            Giriş Yap
          </Button>
        </div>
      </form>
    </div>
  );
};