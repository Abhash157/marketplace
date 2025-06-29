import React, { useState } from 'react';

const WhatsappChat = ({
  phoneNumber = '9709707755',
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

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Popup */}
      {open && (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#25d366] px-4 py-3">
            <div className="flex items-center space-x-2">
              {/* Company logo */}
              <img
                src="/assets/Tech.jpeg"
                alt="Company logo"
                className="w-6 h-6"
              />
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

          {/* Status */}
          <div className="px-4 py-2 bg-gray-50 border-b">
            <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <span className="text-gray-600">{availabilityText}</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="p-4 bg-gray-50 h-48 overflow-y-auto">
            <div className="inline-block max-w-[85%] bg-white text-gray-800 text-sm rounded-xl px-4 py-3 shadow-sm">
              {welcomeMessage}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow px-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Type your message"
              />
              <button
                onClick={handleSend}
                className="p-2 text-green-600 hover:text-green-700 transition-colors"
                aria-label="Send message"
              >
                <img
                  src="/assets/whatsapp.jpeg"
                  alt="Send message"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button with Notification */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`p-3 bg-[#25D366] rounded-full shadow-lg hover:bg-[#25D366] transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            open ? 'scale-95' : 'scale-100'
          }`}
          aria-label="Open WhatsApp chat"
        >
          <img
            src="/assets/images/whatsapp.jpeg"
            alt="WhatsApp logo"
            className="w-8 h-8"
          />
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
