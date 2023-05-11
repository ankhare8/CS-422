import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../util/authContext";
import axios from "axios";
import { apiUrl } from "../../config/apiUrl";
import Loading from "../Loading";
import { toast } from 'react-toastify';

export default function Settings() {
    const [isLoading, setLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('')
    let originalName = ''
    const navigate = useNavigate()


    useEffect(()=>{
        setLoading(true);
        const getUserData = async () => {
            try{
                const idToken = await currentUser.getIdToken(true);
                const response = await axios.get(apiUrl + '/getuser', {
                    headers: {
                      Authorization: `Bearer ${idToken}`,
                    }
                });
                const data = await response.data
                setName(data.name)
                originalName = data.name
                setEmail(data.email)
                setPlan(data.subscription_tier)
                
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };
        if(currentUser){
            getUserData();
            
        }    
    }, [currentUser])

    if(!currentUser){
        return <Navigate to="/login" />;
    }
    
    const handleUserUpdate =  async ()=>{
        setName(name.trim())
        if(name.length > 0 && name != originalName){
            setLoading(true);
            try{
                const idToken = await currentUser.getIdToken(true);
                const response = await axios.post(apiUrl + '/updateuser',
                {name},
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    }
                });
                
                if (response.status == 200){
                    toast.success("User updated successfully", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } else{
                    throw new Error("Invalid response")
                }
                
            }catch(error){
                console.log(error);
                toast.error("Unable to update user", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }finally{
                setLoading(false);
            }
        }

        if(name.length == 0 ){
            toast.error("Please enter a valid name", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleLogout = ()=>{
        navigate('/logout')
    }

    return (
        currentUser && 
      <div className="mx-4 pageContainer">
        <Loading isLoading={isLoading}/>
          <div className="w-100 p-5">
            <h1 className="font-bold tracking-tight text-white-200 text-xl pb-4 custom-border-bottom">
                Settings
            </h1>
            <div className="mt-4">
                {/* <p className="text-md leading-8 text-gray-200">
                Your Information
                </p> */}
                <form className="">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm">
                        <label htmlFor="name" className="text-gray-200 font-semibold">
                        Your Display Name
                        </label>
                        <div className="flex">
                            <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your Display Name"
                            required
                            className="bg-transparent relative px-2 rounded-tl  rounded-bl text-white block w-full border-0 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-600"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            <button
                            type="button"
                            onClick={handleUserUpdate}
                            className="ml-auto justify-center rounded bg-transparent py-2 px-3 text-sm font-semibold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
                <div className="mt-2">
                    <p className="text-gray-200 font-semibold">Your Email</p>
                    <p>{email}</p>
                </div>
                <div className="mt-4">
                    <p className="text-gray-200 font-semibold">Your Subscription Plan: {plan} Plan</p>
                    <p className="ml-6">
                        - With the Free Plan, users can create up to 10 wishlists and store up to 25 items in each. 
                        <br/> - With the Premium Plan* users can create up to 30 wishlists and store 50 items in each list. Updates will be autosaved and you can enjoy an ad free experience!
                    </p>
                    <p className="mt-4">*Coming Soon</p>
                </div>
                <div>
                <div className="mt-4">
                    <p className="text-gray-200 font-semibold">Have Thoughts, Comments or Questions about Budgeter?</p>
                    <div className="flex">
                        <div className="mr-auto">
                            <a href="mailto:ankhare8@gmail.com">• Reach out to our Developer</a>
                        </div>
                        <div className="mr-auto">
                            <a href="https://github.com/ankhare8/CS-422/issues">• Report a Bug</a>
                        </div>
                    </div>
                </div>
                </div>
                <button
                type="button"
                onClick={handleLogout}
                className="mt-20 w-full rounded justify-center bg-purple-500 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                >
                    Log Out
                </button>
            </div>

          </div>
          <div
            className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-[calc(100%-50rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
    )
  }
  