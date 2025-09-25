'use client'

import { MessageCircle, Calendar, FileText, Stethoscope } from 'lucide-react'

const HowObaatanpaHelps = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Chat Securely with Mothers",
      description: "Connect with expectant and new mothers through our secure messaging platform. Provide guidance, answer questions, and offer support when they need it most.",
      color: "from-[#F59297] to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      icon: Calendar,
      title: "Manage Appointments",
      description: "Streamline your appointment scheduling with our integrated booking system. Set your availability, confirm appointments, and manage your patient calendar efficiently.",
      color: "from-[#7da8e6] to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: FileText,
      title: "Submit Care Advice & Articles",
      description: "Share your expertise by contributing health articles, care tips, and educational content. Help educate mothers across Ghana with your professional knowledge.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Stethoscope,
      title: "Track Patient Cases Digitally",
      description: "Maintain digital records of your consultations and patient interactions. Keep track of ongoing cases and provide continuity of care through our platform.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Obaatanpa Helps Health Workers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform is designed to empower healthcare professionals with the tools they need 
            to provide exceptional care and reach more mothers across Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Benefits
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Beyond helping mothers, Obaatanpa offers professional development and networking opportunities for healthcare workers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Earn Income</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monetize your expertise through consultations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7da8e6] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">🌍</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Expand Reach</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect with mothers beyond your local area</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">📚</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Share Knowledge</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Build your professional reputation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowObaatanpaHelps
