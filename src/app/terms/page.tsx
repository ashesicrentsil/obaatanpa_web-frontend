'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { FileText, AlertTriangle, Shield, Users, Gavel, Clock } from 'lucide-react'

export default function TermsOfServicePage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By accessing or using Obaatanpa, you agree to be bound by these Terms of Service',
        'If you do not agree to these terms, please do not use our services',
        'These terms apply to all users, including healthcare providers and patients',
        'We may update these terms from time to time with notice to users'
      ]
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: Shield,
      content: [
        'Obaatanpa provides maternal healthcare information and support services',
        'We connect users with qualified healthcare professionals for consultations',
        'Our platform offers educational resources, appointment scheduling, and health tracking',
        'Services are provided for informational purposes and do not replace professional medical care',
        'Emergency medical situations require immediate contact with local emergency services'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: Users,
      content: [
        'Provide accurate and complete information when creating your account',
        'Keep your login credentials secure and confidential',
        'Use the platform only for lawful purposes related to maternal healthcare',
        'Respect the privacy and confidentiality of other users',
        'Follow healthcare provider instructions and recommendations',
        'Report any technical issues or security concerns promptly'
      ]
    },
    {
      id: 'medical-disclaimer',
      title: 'Medical Disclaimer',
      icon: AlertTriangle,
      content: [
        'Obaatanpa does not provide medical diagnosis or treatment',
        'Information provided is for educational purposes only',
        'Always consult with qualified healthcare professionals for medical decisions',
        'In emergencies, contact local emergency services immediately',
        'We are not liable for any medical decisions made based on platform information',
        'Healthcare providers on our platform are independent contractors'
      ]
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      icon: Gavel,
      content: [
        'Sharing false or misleading health information',
        'Attempting to diagnose or treat other users',
        'Uploading malicious software or harmful content',
        'Violating the privacy of other users or healthcare providers',
        'Using the platform for commercial purposes without authorization',
        'Impersonating healthcare professionals or other users'
      ]
    },
    {
      id: 'termination',
      title: 'Account Termination',
      icon: Clock,
      content: [
        'You may terminate your account at any time through your account settings',
        'We may suspend or terminate accounts that violate these terms',
        'Upon termination, your access to the platform will be immediately revoked',
        'Some information may be retained as required by law or for legitimate business purposes',
        'Healthcare records may be retained for continuity of care purposes'
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
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Please read these terms carefully before using Obaatanpa. They govern your use of our maternal healthcare platform.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Gavel className="w-8 h-8 text-white" />
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
              <strong>Effective Date:</strong> January 15, 2024
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              These terms were last updated on January 15, 2024. We'll notify you of any material changes.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to Obaatanpa
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                These Terms of Service ("Terms") govern your use of the Obaatanpa platform, including our website, mobile applications, and related services (collectively, the "Service"). Obaatanpa is operated by Obaatanpa Ltd., a company incorporated in Ghana.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Our mission is to provide accessible, culturally relevant maternal healthcare support to mothers in Ghana and beyond. By using our Service, you enter into a legal agreement with us and agree to comply with these Terms.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Please read these Terms carefully. If you have any questions, please contact us at legal@obaatanpa.com before using our Service.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
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

          {/* Important Legal Information */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-3xl p-8 mt-12">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Important Legal Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Limitation of Liability
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Obaatanpa's liability is limited to the maximum extent permitted by law. We are not liable for any indirect, incidental, or consequential damages.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Governing Law
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  These Terms are governed by the laws of Ghana. Any disputes will be resolved in the courts of Ghana.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Intellectual Property
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  All content on Obaatanpa is protected by copyright and other intellectual property laws. Users may not reproduce content without permission.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Indemnification
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Users agree to indemnify Obaatanpa against any claims arising from their use of the Service or violation of these Terms.
                </p>
              </div>
            </div>
          </div>

          {/* Healthcare Provider Terms */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Additional Terms for Healthcare Providers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Professional Standards
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• Maintain current professional licenses and certifications</li>
                  <li>• Follow applicable medical ethics and standards of care</li>
                  <li>• Provide accurate and up-to-date professional information</li>
                  <li>• Respond to patient inquiries in a timely manner</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Platform Compliance
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• Complete required verification processes</li>
                  <li>• Maintain patient confidentiality at all times</li>
                  <li>• Use secure communication methods provided by the platform</li>
                  <li>• Report any security incidents or concerns immediately</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Questions About These Terms?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Legal Department
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Email: legal@obaatanpa.com
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Phone: +233 123 456 789
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Mailing Address
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Obaatanpa Legal Department<br />
                  123 Healthcare Avenue<br />
                  Accra, Ghana
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-[#F59297]/10 rounded-2xl">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Note:</strong> By continuing to use Obaatanpa after any changes to these Terms, you agree to the updated Terms. 
                We recommend reviewing these Terms periodically to stay informed of any updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
