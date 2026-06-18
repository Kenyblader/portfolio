import { Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import './style/theme.css';
import './style/app.css';
import Login from './screens/login';
import Dashboard from './screens/dashbord';
import ProjectForm from './screens/projectForm';
import ProtectedRoute from './components/protectedRoute';
import { analiticsService } from './services/analitics.service';
import GlobalLoading from './components/GlobaloLoading';
import EditProject from './screens/editPorject';

function App() {

  analiticsService.trackVisit();
  
  
  

  return (
   <>
 
      <div>
        <GlobalLoading/>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* ADMIN */}
          <Route path="/dashboard" element={
            <ProtectedRoute >
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/projects/new" element={
            <ProtectedRoute >
              <ProjectForm />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/projects/edit/:id" element={
            <ProtectedRoute >
              <EditProject />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>

      </div>
   
   </>
  );
}



export default App;
