'use client'

import { CheckCircle, Shield, UserCheck, Award } from 'lucide-react'

const WhoCanRegister = () => {
  const eligibleProfessionals = [
    {
      title: "Certified Midwives",
      description: "Licensed midwives with valid certification from recognized institutions",
      icon: "👩🏽‍⚕️",
      requirements: "Valid midwifery license & certification"
    },
    {
      title: "Registered Nurses",
      description: "Qualified nurses specializing in maternal and child health",
      icon: "👩🏽‍⚕️",
      requirements: "Nursing registration & maternal health experience"
    },
    {
      title: "Nutritionists",
      description: "Certified nutritionists with expertise in maternal and infant nutrition",
      icon: "🥗",
      requirements: "Nutrition certification & maternal health focus"
    },
    {
      title: "Obstetricians / Gynaecologists",
      description: "Medical doctors specializing in women's reproductive health",
      icon: "🩺",
      requirements: "Medical degree & OB/GYN specialization"
    },
    {
      title: "Mental Health Professionals",
      description: "Psychologists and counselors specializing in maternal mental health",
      icon: "🧠",
      requirements: "Psychology/counseling certification & maternal focus"
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Who Can Register?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We welcome qualified healthcare professionals who are passionate about improving 
            maternal health outcomes in Ghana. Here's who can join our network:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {eligibleProfessionals.map((professional, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  {professional.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {professional.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                    {professional.description}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Requirements: {professional.requirements}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Process */}
        <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="500">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Verification Process
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              All professionals are manually verified by our admin team for safety and credibility. 
              We ensure only qualified healthcare providers join our network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-[#F59297] font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Apply</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Submit your application with credentials</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <UserCheck className="w-6 h-6 text-[#7da8e6]" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Review</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Our team verifies your qualifications</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Approve</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get approved and verified status</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-purple-500 font-bold text-lg">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Start</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Begin helping mothers across Ghana</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Shield className="w-5 h-5 text-[#F59297] mr-2" />
              Verification Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Valid professional license/certification
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Proof of current practice
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Professional references
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Background verification
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoCanRegister
