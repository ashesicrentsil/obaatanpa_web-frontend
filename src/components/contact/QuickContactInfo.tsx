'use client'

import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'

const QuickContactInfo = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      info: "support@obaatanpa.com",
      description: "Send us an email anytime",
      action: "mailto:support@obaatanpa.com",
      color: "from-[#F59297] to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      info: "+233 55 123 4567",
      description: "Call or WhatsApp us",
      action: "tel:+233551234567",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: MapPin,
      title: "Address",
      info: "Accra, Ghana",
      description: "Our virtual office location",
      action: "#",
      color: "from-[#7da8e6] to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      info: "Chat Now",
      description: "Instant support available",
      action: "#",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@obaatanpa_app",
      url: "https://instagram.com/obaatanpa_app",
      color: "from-pink-500 to-purple-600"
    },
    {
      icon: Facebook,
      name: "Facebook",
      handle: "Obaatanpa",
      url: "https://facebook.com/obaatanpa",
      color: "from-blue-500 to-blue-600"
    }
  ]

  return (
    <div className="space-y-8" data-aos="fade-up" data-aos-delay="200">
      {/* Quick Contact Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Contact Info
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Choose the best way to reach us. We're here to help you every step of the way.
        </p>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              className={`${method.bgColor} rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {method.title}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-sm truncate">
                    {method.info}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {method.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Follow Us
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Stay connected and get the latest updates on maternal health tips and app features.
        </p>

        <div className="space-y-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center`}>
                <social.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {social.name}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {social.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Response Time Info */}
      <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          📞 Response Times
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Email:</span>
            <span className="font-medium text-gray-900 dark:text-white">Within 24 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Phone/WhatsApp:</span>
            <span className="font-medium text-gray-900 dark:text-white">Mon-Sat, 9AM-6PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Live Chat:</span>
            <span className="font-medium text-gray-900 dark:text-white">Instant response</span>
          </div>
        </div>
      </div>

      {/* Language Support */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          🌍 Language Support
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          We provide support in multiple languages to serve you better.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[#F59297]/10 text-[#F59297] rounded-full text-sm font-medium">
            English
          </span>
          <span className="px-3 py-1 bg-[#7da8e6]/10 text-[#7da8e6] rounded-full text-sm font-medium">
            Twi
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
            More coming soon
          </span>
        </div>
      </div>
    </div>
  )
}

export default QuickContactInfo
