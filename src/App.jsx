import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  // const formArray = [
  //   ...Object.entries({1: "Account"}),
  //   ...Object.entries({2: "Payment"}),
  //   ...Object.entries({3: "Billing"}),
  //   ...Object.entries({4: "Done"}),
  // ];
  const formArray = [1,2,3,4];
  const [formNo, setFormNo] = useState(formArray[0])
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    contact: '',
    city: '',
    country: '',
    estate: '',
    cardc: '',
    items: '',
    quantity: '',
    amount: ''
  })
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const next = () => {
    if (formNo === 1 && state.name && state.email && state.password && state.cpassword ) {
      setFormNo(formNo + 1)
    } else if (formNo === 2 && state.contact && state.city && state.estate && state.country) {
      setFormNo(formNo + 1)
    } else if (formNo === 3 && state.cardc && state.items && state.quantity && state.amount ) {
      setFormNo(formNo + 1) 
    } else {
      toast.error('Please fillup all input field')
    }
  }
  const pre = () => {
    setFormNo(formNo - 1)
  }
  const finalSubmit = () => {
    setFormNo(4)
    if (state.cardc && state.items && state.quantity && state.amount) {
      toast.success('form submit success')
    } else {
      toast.error('Please fillup all input field')
    }
  }

  // Theme section starts here
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  console.log(darkQuery, "darkQuery")
  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
    {
      icon: "desktop-outline",
      text: "system",
    }
  ];

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark")
        break;
      case "light":
        element.classList.remove("light");
        localStorage.setItem("theme", "light")
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch()
        break;
    }
    // eslint-disable-next-line
  }, [theme]);

  function onWindowMatch() {
    if(localStorage.theme === "dark" || 
      (!("theme" in localStorage) && darkQuery.matches)
      ) {
        element.classList.add("dark")
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();

  darkQuery.addEventListener("change", (e) => {
    if(!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark")
      } else {
        element.classList.remove("dark")
      }
    }
  })
  // Theme section ends here

  return (
    <section className='flex items-center justify-center min-h-screen pt-8 duration-100 dark:text-gray-100 dark:bg-slate-900'>
  
        {/* Theme */}
         <div className='fixed duration-100 bg-gray-100 rounded top-5 right-10 dark:bg-slate-300'>
          {/* {options && Array.isArray(options) && options?.map((opt) => (  */}
          {options?.map((opt) => ( 
              <button key={opt.text} 
              onClick={() => setTheme(opt.text)}
                className={`w-8 h-8 m-1 text-xl leading-9 rounded-full 
                ${theme === opt.text && "text-sky-600"}`}> 
                <ion-icon name={opt.icon}></ion-icon>
              </button>
            ))}
          </div>
        {/* Theme ends here */}
        
      <ToastContainer />
      
      <div className="card w-[470px] rounded-md shadow-md color-black bg-white dark:text-gray-100 dark:bg-slate-900 p-5">
        <div className='flex items-center justify-center'>  
          {
            formArray.map((v, i) => <><div className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo -1 === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'} h-[35px] flex justify-center items-center`}>
              {v}
            </div>
              {
                i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === i + 3|| formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
              }
            </>)
          }
        </div>
        
        {
          formNo === 1 &&  <div>            
            <div className='flex flex-row items-center mb-2'>
              <span className='mr-2 text-xl'>Account</span>
            </div>

            <div className='flex flex-col mb-2'>
              <label  htmlFor="name">Name</label>
              <input value={state.name} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="text" name='name' placeholder='name' id='name' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="email">Email</label>
              <input value={state.email} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="email" name='email' placeholder='email' id='email' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="password">Password</label>
              <input value={state.password} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="password" name='password' placeholder='password' id='password'/>
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="cpassword">Confirm Password</label>
              <input value={state.cpassword} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="password" name='cpassword' placeholder='confirm password' id='cpassword'/>
            </div>
            <div className='flex items-center justify-center mt-4'>
              <button onClick={next} className='w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md'>Next</button>
            </div>
          </div>
        }

        {
          formNo === 2  && <div>
            <div className='flex flex-row items-center mb-2'>
              <span className='mr-2 text-xl'>Personal</span>
            </div>
            <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="contact">Phone Number</label>
              <input value={state.contact} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="number" name='contact' placeholder='contact' id='contact' />
            </div>
            <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="city">City</label>
              <input value={state.city} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="text" name='city' placeholder='city' id='city' />
            </div>
            <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="state">State</label>
              <input value={state.estate} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="text" name='estate' placeholder='state' id='estate' />
            </div>
            <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="country">Country</label>
              <input value={state.country} onChange={inputHandle} className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-900 focus:border-blue-500' type="text" name='country' placeholder='country' id='country' />
            </div>
            {/* <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="address">Address</label>
              <textarea value={state.address} onChange={inputHandle} row='10' className='p-2 mt-1 border rounded-md border-slate-400 outline-0 text-slate-500 focus:border-blue-500' type="text" name='state' placeholder='state' ></textarea>
            </div> */}
            <div className='flex items-center justify-center gap-3 mt-4'>
              <button onClick={pre} className='w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md'>Previous</button>
              <button onClick={next} className='w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md'>Next</button>
            </div>
          </div>
        }

        {
          formNo === 3 && <div>
             <div className='flex flex-row items-center mb-2'>
              <span className='mr-2 text-xl'>Billing</span>
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="Card/Cash">Card/Cash</label>
              <input value={state.cardc} onChange={inputHandle} className='p-2 mt-1 border rounded-md text-slate-900 border-slate-400 outline-0 focus:border-blue-500' type="text" name='cardc' placeholder='card or cash name' id='cardc' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="items">Items</label>
              <input value={state.items} onChange={inputHandle} className='p-2 mt-1 border rounded-md text-slate-900 border-slate-400 outline-0 focus:border-blue-500' type="number" name='items' placeholder='items' id='items' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="quantity">Quantity</label>
              <input value={state.quantity} onChange={inputHandle} className='p-2 mt-1 border rounded-md text-slate-900 border-slate-400 outline-0 focus:border-blue-500' type="number" name='quantity' placeholder='quantity' id='quantity' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="amount">Amount</label>
              <input value={state.amount} onChange={inputHandle} className='p-2 mt-1 border rounded-md text-slate-900 border-slate-400 outline-0 focus:border-blue-500' type="number" name='amount' placeholder='total amount' id='amount' />
            </div>
            <div className='flex items-center justify-center gap-3 mt-4'>
              <button onClick={pre} className='w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md'>Previous</button>
              <button onClick={finalSubmit} className='w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md'>Submit</button>
            </div>
          </div>
        }

        {
          formNo === 4 && <div>
            <h2 className='text-xl font-bold'>Done</h2>
            <div className='flex flex-col mb-2'>
              <label htmlFor="Thank you">Thank you</label>
            </div>
          </div>
        }

      </div>
    </section>
    
  );
}

export default App;
