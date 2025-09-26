'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Shield, Lock, Eye, Users, FileText, Clock } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal information you provide when creating an account (name, email, phone number)',
        'Health information you share during consultations and assessments',
        'Pregnancy and medical history you input into our platform',
        'Usage data and analytics to improve our services',
        'Device information and IP addresses for security purposes'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Provide personalized maternal healthcare guidance and support',
        'Connect you with qualified healthcare professionals',
        'Send appointment reminders and health notifications',
        'Improve our services and develop new features',
        'Ensure platform security and prevent fraud',
        'Comply with legal and regulatory requirements'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We never sell your personal information to third parties',
        'Healthcare providers only access information relevant to your care',
        'Anonymous, aggregated data may be used for research purposes',
        'Legal authorities may access information when required by law',
        'Service providers who help us operate our platform (with strict confidentiality agreements)'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'End-to-end encryption for all sensitive health information',
        'Secure servers with regular security audits and updates',
        'Multi-factor authentication for healthcare provider accounts',
        'Regular data backups with encrypted storage',
        'Strict access controls and employee training on data protection'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: Eye,
      content: [
        'Access and review your personal information at any time',
        'Request corrections to inaccurate information',
        'Delete your account and associated data',
        'Download your data in a portable format',
        'Opt out of non-essential communications',
        'File complaints with relevant data protection authorities'
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Clock,
      content: [
        'Account information retained while your account is active',
        'Health records kept for 7 years as required by medical regulations',
        'Usage analytics anonymized after 2 years',
        'Consultation records maintained for continuity of care',
        'Marketing preferences stored until you opt out'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your privacy and the security of your health information are our top priorities. Learn how we protect and use your data.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Last Updated:</strong> January 15, 2024
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              We may update this policy from time to time. We'll notify you of any significant changes.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Commitment to Your Privacy
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At Obaatanpa, we understand that your health information is deeply personal and sensitive. This Privacy Policy explains how we collect, use, protect, and share your information when you use our maternal healthcare platform.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We are committed to maintaining the highest standards of privacy and security, complying with applicable data protection laws, and giving you control over your personal information.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By using Obaatanpa, you agree to the practices described in this policy. If you have any questions or concerns, please contact us at privacy@obaatanpa.com.
              </p>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <div key={section.id} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#F59297]/10 rounded-2xl flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-[#F59297]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-[#F59297] mr-3 mt-2">•</span>
                        <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Special Considerations */}
          <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 rounded-3xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Special Considerations for Healthcare Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  HIPAA Compliance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We follow international healthcare privacy standards similar to HIPAA to protect your medical information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Emergency Situations
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  In medical emergencies, we may share necessary information with emergency responders to ensure your safety.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Minors' Privacy
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For users under 18, we require parental consent and provide additional privacy protections.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Cross-Border Data
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your data is primarily stored in Ghana, with secure international backups for disaster recovery.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Us About Privacy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Privacy Officer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Email: privacy@obaatanpa.com
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Phone: +233 552 025 654
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Mailing Address
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Obaatanpa Privacy Department<br />
                  123 Healthcare Avenue<br />
                  Accra, Ghana
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-[#F59297]/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quick Privacy Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#F59297] text-white px-6 py-2 rounded-lg hover:bg-[#e67d82] transition-colors">
                  Download My Data
                </button>
                <button className="bg-[#7da8e6] text-white px-6 py-2 rounded-lg hover:bg-[#6b9ce6] transition-colors">
                  Update Preferences
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
