'use client'

import { useState, useRef, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Send, Phone, Video, MoreVertical, Clock, CheckCircle, Users, Heart } from 'lucide-react'

export default function ChatPage() {
  const [selectedExpert, setSelectedExpert] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const experts = [
    {
      id: 1,
      name: 'Dr. Akosua Mensah',
      title: 'Certified Midwife',
      specialization: 'Prenatal Care & Natural Birth',
      avatar: '/images/experts/midwife-1.jpg',
      status: 'online',
      rating: 4.9,
      responseTime: '< 5 min',
      languages: ['English', 'Twi'],
      experience: '12 years',
      lastMessage: 'How can I help you today?',
      lastMessageTime: '2 min ago'
    },
    {
      id: 2,
      name: 'Dr. Kwame Asante',
      title: 'Obstetrician',
      specialization: 'High-Risk Pregnancies',
      avatar: '/images/experts/doctor-1.jpg',
      status: 'online',
      rating: 4.8,
      responseTime: '< 10 min',
      languages: ['English', 'Twi', 'Ga'],
      experience: '15 years',
      lastMessage: 'Available for consultation',
      lastMessageTime: '5 min ago'
    },
    {
      id: 3,
      name: 'Nurse Ama Osei',
      title: 'Lactation Consultant',
      specialization: 'Breastfeeding Support',
      avatar: '/images/experts/nurse-1.jpg',
      status: 'away',
      rating: 4.9,
      responseTime: '< 15 min',
      languages: ['English', 'Twi'],
      experience: '8 years',
      lastMessage: 'I\'ll be back shortly',
      lastMessageTime: '1 hour ago'
    },
    {
      id: 4,
      name: 'Dr. Efua Boateng',
      title: 'Pediatrician',
      specialization: 'Newborn Care',
      avatar: '/images/experts/pediatrician-1.jpg',
      status: 'online',
      rating: 4.7,
      responseTime: '< 8 min',
      languages: ['English', 'Twi', 'Fante'],
      experience: '10 years',
      lastMessage: 'Ready to help with baby care questions',
      lastMessageTime: '10 min ago'
    }
  ]

  const sampleMessages = [
    {
      id: 1,
      sender: 'expert',
      content: 'Hello! I\'m Dr. Akosua Mensah. How can I assist you with your pregnancy journey today?',
      timestamp: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'user',
      content: 'Hi Dr. Mensah! I\'m 28 weeks pregnant and experiencing some back pain. Is this normal?',
      timestamp: '10:32 AM',
      read: true
    },
    {
      id: 3,
      sender: 'expert',
      content: 'Back pain is very common during pregnancy, especially in the second and third trimesters. As your baby grows, your center of gravity shifts and your ligaments loosen due to hormonal changes.',
      timestamp: '10:33 AM',
      read: true
    },
    {
      id: 4,
      sender: 'expert',
      content: 'Here are some safe ways to manage it:\n\n• Gentle prenatal yoga\n• Warm (not hot) baths\n• Pregnancy support belt\n• Proper posture\n• Sleep with a pregnancy pillow',
      timestamp: '10:34 AM',
      read: true
    },
    {
      id: 5,
      sender: 'user',
      content: 'Thank you! Should I be concerned if the pain gets worse?',
      timestamp: '10:35 AM',
      read: true
    },
    {
      id: 6,
      sender: 'expert',
      content: 'You should contact your healthcare provider if you experience:\n\n• Severe or sudden pain\n• Pain with fever\n• Pain that radiates down your legs\n• Difficulty walking\n• Any concerns about your symptoms',
      timestamp: '10:36 AM',
      read: false
    }
  ]

  useEffect(() => {
    if (selectedExpert) {
      setMessages(sampleMessages)
    }
  }, [selectedExpert])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim() && selectedExpert) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      }
      setMessages([...messages, newMessage])
      setMessage('')
      
      // Simulate expert response
      setTimeout(() => {
        const expertResponse = {
          id: messages.length + 2,
          sender: 'expert',
          content: 'Thank you for your question. Let me provide you with some helpful information...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        }
        setMessages(prev => [...prev, expertResponse])
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Chat with Experts
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Get instant support from certified midwives and healthcare professionals
          </p>
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Certified Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Compassionate Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
            <div className="flex h-full">
              
              {/* Experts Sidebar */}
              <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Available Experts
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Choose an expert to start chatting
                  </p>
                </div>
                
                <div className="space-y-2 p-4">
                  {experts.map((expert) => (
                    <div
                      key={expert.id}
                      onClick={() => setSelectedExpert(expert)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                        selectedExpert?.id === expert.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {expert.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            expert.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                              {expert.name}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {expert.lastMessageTime}
                            </span>
                          </div>
                          
                          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                            {expert.title}
                          </p>
                          
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {expert.lastMessage}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-yellow-500">★</span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {expert.rating}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {expert.responseTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedExpert ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {selectedExpert.name.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              selectedExpert.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {selectedExpert.name}
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {selectedExpert.title} • {selectedExpert.specialization}
                            </p>
                            <p className="text-xs text-gray-500">
                              {selectedExpert.status === 'online' ? 'Online now' : 'Away'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Phone className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Video className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            msg.sender === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{msg.content}</p>
                            <p className={`text-xs mt-1 ${
                              msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-end space-x-4">
                        <div className="flex-1">
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                            rows={2}
                          />
                        </div>
                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className={`p-3 rounded-2xl transition-all duration-200 ${
                            message.trim()
                              ? 'bg-blue-500 hover:bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Select an Expert to Start Chatting
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Choose from our certified healthcare professionals
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
