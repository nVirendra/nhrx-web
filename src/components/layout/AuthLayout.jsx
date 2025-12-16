// components/layout/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ children, illustration }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 items-center justify-center p-12">
        <div className="max-w-md w-full">
          {illustration || (
            <div className="text-center">
              <div className="mb-8">
                <img
                  src="/auth-illustration.svg"
                  alt="Authentication"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Welcome to E-Shop Admin
              </h2>
              <p className="text-blue-100 text-lg">
                Manage your e-commerce platform with powerful tools
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
