'use client'

import { Shield, Droplets, Baby, AlertTriangle } from 'lucide-react'

const SupplementGuidance = () => {
  return (
    <section className="py-16 bg-purple-50 dark:bg-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Do I Still Need Supplements?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Understanding when and why supplements are important
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Prenatal Vitamins</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Essential vitamins and minerals that support your baby's development, especially folic acid and iron.
            </p>
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Why: Fills nutritional gaps in your diet
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Iron Tablets</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Common in Ghana Health Service care. Prevents anemia and supports increased blood volume.
            </p>
            <div className="text-sm text-red-600 dark:text-red-400 font-medium">
              Why: Your iron needs double during pregnancy
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Baby className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Omega-3</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Supports your baby's brain and eye development, especially in the third trimester.
            </p>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Why: Critical for baby's brain development
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl" data-aos="fade-up" data-aos-delay="400">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-2">Important Warning</h4>
              <p className="text-yellow-700 dark:text-yellow-400">
                Always consult your midwife or doctor before starting any supplements. They can recommend the right dosage based on your specific needs and health condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupplementGuidance
