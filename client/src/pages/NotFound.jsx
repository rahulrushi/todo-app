import React from 'react'

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-xl text-gray-600 mt-4">Page not found</p>
          <Link to="/" className="mt-8 text-primary-500 hover:text-primary-600">
            Go back home
          </Link>
        </div>
      )
}

export default NotFound