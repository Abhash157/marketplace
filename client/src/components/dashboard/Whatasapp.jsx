import React, { useState } from 'react';

const WhatsappChat = ({
  phoneNumber = '9818847845',
  companyName = "Tech Connect",
  availabilityText = 'Typically replies within a day',
  welcomeMessage = "Welcome to Tech Connect Services! How can we help you?",
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setMessage('');
    setOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const WhatsAppIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-14 h-14">
      <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/>
      <path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5z"/>
      <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"/>
      <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open && (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all">
          <div className="flex items-center justify-between bg-[#25d366] px-4 py-3">
            <div className="flex items-center space-x-2">
              <img src="/assets/Tech.jpeg" alt="Company logo" className="w-6 h-6" />
              <div className="text-black font-bold">{companyName}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-black text-lg font-bold hover:text-gray-700 transition-colors"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="px-4 py-2 bg-gray-50 border-b">
            <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-gray-600">{availabilityText}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 h-48 overflow-y-auto">
            <div className="inline-block max-w-[85%] bg-white text-gray-800 text-sm rounded-xl px-4 py-3 shadow-sm">
              {welcomeMessage}
            </div>
          </div>

          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow px-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                className="p-2 text-green-600 hover:text-green-700 transition-colors"
                aria-label="Send message"
              >
                {WhatsAppIcon}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className={`w-14 h-14 flex items-center justify-center bg-[#25D366] rounded-full shadow-lg hover:bg-[#25D366] transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
      open ? 'scale-95' : 'scale-100'
    }`}
    aria-label="Open WhatsApp chat"
  >
    {WhatsAppIcon}
  </button>

  {!open && (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
      1
    </span>
  )}
</div>

    </div>
  );
};

export default WhatsappChat;
