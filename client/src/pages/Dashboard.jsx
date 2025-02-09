import React from 'react';
import TodoList from '../components/TodoList';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Todos</h1>
      <TodoList />
    </div>
  );
};

export default Dashboard;