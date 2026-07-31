import { useState } from 'react'
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { supabase } from '../libs/supabase.js';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    navigate('/admin');

    
  }

  return (
    <section>
       
        <div className='flex min-h-screen justify-center items-center'>
            
            <form onSubmit={handleLogin} className='w-96 rounded-xl bg-white p-8 shadow-lg'>

                <h1 className='mb-6 text-3xl font-bold'>
                    ล็อคอินแอดมิน
                </h1>

                <input 
                    type="email"
                    placeholder="Email"
                    className='mb-4 w-full border border-gray-300 rounded-md p-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    className='mb-6 w-full border border-gray-300 rounded-md p-3'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                    type="submit"
                    className="w-full rounded bg-blue-600 p-2 text-white"
                >
                    ล็อคอิน
                </button>
            
            </form>
            
        </div>
    </section>
  )
}

export default AdminLogin