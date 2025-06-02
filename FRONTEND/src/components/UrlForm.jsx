import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api.js';
import { useSelector } from 'react-redux';

const UrlForm = () => {
    const [url, setUrl] = useState("https://jenildev.netlify.app/")
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [customSlug, setCustomSlug] = useState("");
    const {isAuthenticated} = useSelector((state) => state.auth);
    const handleSubmit = async() =>{
        const shortUrl = await createShortUrl(url);
        setShortUrl(shortUrl);
      }

      const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
      }
  return (
    <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your long URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very/long/url"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button type="submit" onClick={handleSubmit} className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors`}> Shorten URL </button>
          {/* {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )} */}
        {isAuthenticated && (
            <div>
              <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
                Custom URL (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="my-custom-url"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        {shortUrl && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium mb-2">Your shortened URL</h2>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 border border-gray-300 rounded-l bg-gray-50"
              />
               <button onClick={copyToClipboard} className={`px-4 py-2 rounded-r transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}> 
                  {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
          </div>
        )}
    </div>
        
        
  )
}

export default UrlForm