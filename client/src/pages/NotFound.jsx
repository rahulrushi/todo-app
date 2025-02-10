import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-xl text-gray-600 mt-4">Page not found</p>
          <Link to="/" className="group mt-8 w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go back home
          </Link>
        </div>
      )
}

export default NotFound