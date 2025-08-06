import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import TaskManager from './TaskManager';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskManager />
            </PrivateRoute>
          }
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}
