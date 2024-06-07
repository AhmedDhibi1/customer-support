import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authenticate } from "../../api/services/user/user.api";

const Login = () => {
 const navigate = useNavigate();
 const emailRef = useRef(null);
 const passwordRef = useRef(null);
 const [error, setError] = useState(null);

 useEffect(() => {
    if (Cookies.get('userId')) {
      navigate("/home");
      window.location.reload();
    }
 }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await authenticate(emailRef.current.value, passwordRef.current.value);
      Cookies.set('token', response.data.user.token, { expires: 3600000 });
      Cookies.set('userId', response.data.user.id, { expires: 3600000 }); 
      Cookies.set('userEmail', emailRef.current.value, { expires: 3600000 });
      console.log(response);
      navigate("/home");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
 };

 return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-10">
              <div className="flex justify-center items-center pt-0 text-white">
 <img src="/assets/_logo.png" className="w-2/6 h-2/6 object-cover mt-[-35px]" alt="Customer Support" />
</div>
                <h3 className="text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                 <input name="email" type="text" required ref={emailRef} className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter email" />
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                 <input name="password" type="password" required ref={passwordRef} className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter password" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                
                <div className="text-sm">
                 <a href="javascript:void(0);" className="text-blue-600 hover:underline">
                    Forgot your password?
                 </a>
                </div>
              </div>
              <div className="!mt-10">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none">
                 Log in
                </button>
              </div>
              <p className="text-sm !mt-10 text-center">Don't have an account <Link to="/Register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
            </form>
          </div>
          <div className="lg:h-[500px] md:h-[400px] max-md:mt-10">
            <img src="/assets/12982910_5124558.png" className="w-full h-full object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
 );
};

export default Login;