import { BookOpen, Clock } from 'lucide-react'

interface Article {
  title: string
  time: string
  category: string
}

interface TrimesterArticlesProps {
  trimesterData: {
    title: string
    articles: Article[]
  }
}

const TrimesterArticles = ({ trimesterData }: TrimesterArticlesProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {trimesterData.title} Articles
      </h2>
      
      <div className="space-y-4">
        {trimesterData.articles.map((article, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-[#F59297] mr-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{article.title}</h3>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="mr-4">{article.time}</span>
                  <span className="bg-[#F59297]/10 text-[#F59297] px-2 py-1 rounded-full text-xs">
                    {article.category}
                  </span>
                </div>
              </div>
              <button className="bg-[#F59297] text-white px-4 py-2 rounded-lg hover:bg-[#e67d82] transition-colors duration-200">
                Read
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrimesterArticles
