import { useContext } from 'react'
import './App.css'

import { Route, Routes, useNavigate } from 'react-router-dom';
import { CustomersPage } from './Pages/Customers';
import { CustomerDebtsPage } from './Pages/CustomerDebts';
import { Banner } from './Components/Banner';
import { AuthContext } from './Contexts/Auth/AuthContext';
import { RequireAuth } from './Contexts/Auth/RequireAuth';
import { CustomerDataForm } from './Pages/CustomerDataForm';
import { NotFoundPage } from './Pages/NotFound';

export const App = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signout();
    navigate("/");
  }
  
  return (
   <div className="div">
      <Banner title="Vendas" isLogged={auth.user != null } onClickLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<RequireAuth><CustomersPage /></RequireAuth> }/>
        <Route path="/debts/:id" element={<RequireAuth><CustomerDebtsPage /></RequireAuth> }/>
        <Route path="/custormer-data-form/" element={<RequireAuth><CustomerDataForm /></RequireAuth> }/>
        <Route path="/custormer-data-form/:id" element={<RequireAuth><CustomerDataForm /></RequireAuth> }/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
   </div>
  )
}

export default App
