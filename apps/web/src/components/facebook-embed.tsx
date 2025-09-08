"use client";

import React, { useEffect } from 'react';

const FacebookEmbed = ({ url, width = '100%', height = '240' }: { url: string; width?: string; height?: string }) => {
  // Tạo script Facebook SDK nếu chưa có
  useEffect(() => {
    if (typeof window !== 'undefined' && window.FB === undefined) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/vi_VN/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v18.0'
          });
        }
      };
      document.body.appendChild(script);
    } else if (window.FB) {
      // Nếu đã có SDK, parse lại các element
      window.FB.XFBML.parse();
    }
  }, [url]);

  return (
    <div className="w-full">
      {typeof window !== 'undefined' && window.FB ? (
        <div 
          className="fb-post" 
          data-href={url}
          data-width={width}
          data-show-text="true"
        />
      ) : (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
          <p className="text-gray-600 mb-2">Đang tải nội dung Facebook...</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Xem trên Facebook
          </a>
        </div>
      )}
    </div>
  );
};

export default FacebookEmbed;