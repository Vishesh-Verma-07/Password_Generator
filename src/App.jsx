import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [largecharAllowed, setLargecharAllowed] = useState(true)
  const [smallcharAllowed, setSmallcharAllowed] = useState(true)
  const [Password, setPassword] = useState("")
  let [img, setImg] = useState("")
  let [status, setStatus] = useState("")
  let [color, setColor] = useState("olive")

  const [isActive, setIsActive] = useState(false)
  
  const ToggleClass = ()=>{
    setIsActive(true);
  }
  setTimeout(() => {
    setIsActive(false)
  }, 500);

  //useRef hook
  const PasswordRef = useRef(null)

  const PasswordGenerator = useCallback(()=>{
    let pass = ""
    let str = ""

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_=+()[]{}~`"
    if(largecharAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(smallcharAllowed) str += "abcdefghijklmnopqrstuvwxyz"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])
  

  const copyPasswordToClipboard = useCallback(()=>{
    PasswordRef.current?.select();
    PasswordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  const increase = ()=>{
    let temp = length + 1
    if(temp>=50) temp=50
    setLength(temp);
  }
  const decrease = ()=>{
    let temp = length - 1
    if(temp<=1) temp=1
      
    setLength(temp);
  }
    
  const imgsetter = ()=>{
    if(length<8){
      img = "img/very_weak.svg"
      status="Very Weak"
      color = "Red"
    }
    else if(length<=12 && length>=8){
      img = "img/weak.svg"
      status="Weak"
      color = "orange"
    }
    else if(length<=15 && length>12){
      img = "img/good.svg"
      status="Good"
      color = "pink"
    }
    else if(length<=18 && length>15){
      img = "img/strong.svg"
      status="Strong"
      color = "yellow"
    }
    else if(length<=25 && length>18){
      img = "img/very_strong.svg"
      status="Very Strong"
      color = "greenyellow"
    }
    else if(length>25){
      img = "img/insanee.svg"
      status="Insane"
      color = "Chartreuse"
    }
  }
  useEffect(()=>{
    PasswordGenerator()
    
  }, [length, numberAllowed, charAllowed, largecharAllowed, smallcharAllowed, PasswordGenerator])
  imgsetter()


  return (
    <>
    <h1 className=' text-black text-center my-9 text-6xl font-bold italic'> Password Generator</h1>
      <div className='  w-full max-w-5xl h-full mx-auto rounded-lg px-4 py-3 my-8 border-4 grid sm:grid-cols-12 grid-cols-2'>
        <div className='bg-yellow-300 m-1 flex col-span-4 content-center justify-center rounded-lg'>
        
        <img src={img} alt="img not available" />
        </div>

      <div className=" bg-blue-300  max-w-3xl m-1 rounded-lg px-4 py-8 text-black-500 col-span-8">
      
      <div className= 'rounded-lg overflow-hidden mb-4 grid sm:h-16 h-32 sm:grid-cols-12 grid-cols-2'  >
        <div className=' bg-white col-span-10 flex sm:mr-10 outline-none sm:h-11/12 h-14 w-11/12 py-1 px-3 rounded-s-full rounded-e-full shadow-sm border-2 border-red-300 text-lg font-bold '>
          <div className=''>
            <input
            type="text"
            value = {Password}
            className='Password outline-none sm:h-full h-11 w-11/12 py-1 px-3 rounded-s-full rounded-e-full shadow-sm text-lg font-bold'
            placeholder='Password'
            readOnly
            ref = {PasswordRef}
            />
          </div>
          <div
          className='color mt-1 py-1 px-3 h-8 w-44 text-base rounded-lg flex justify-center content-center'
          onChange={()=>{setColor({status})}}
          style={{backgroundColor: color} }
          >
            {status}
            
          </div>
          <div
          className='mt-1 py-1 ml-6 h-8 rounded-lg flex justify-end content-center relative fixed '
          onClick={PasswordGenerator}
          >
           <img src="img\reload.svg" alt="d" />
          </div>

        </div>
        <div className=' col-span-2 flex justify-center content-center'>
          <button
          onClick={ ()=> {(copyPasswordToClipboard()); ToggleClass();}}
          className={`outline-none w-24 bg-blue-700 text-white sm:h-5/6 h-10 rounded-s-full hover:text-xl rounded-e-full px-3 py-0.5 shadow-sm shrink-0 ${isActive ? 'active' : ''}`}>Copy
          </button>
        </div>
      </div>


      
      <div className='text-sm gap-x-2'>
        <div className='p-4 text-2xl grid sm:grid-cols-6 gap-y-1'>
          <label className='m-2 font-bold text-xl col-span-2 flex justify-center content-center'>Password Length: {length}</label>
          <div className='col-span-4 w-full flex justify-between content-center m-2'>
            <button
            onClick={ decrease }
            className='sm:mt-2 w-10 h-10 border-2 border-gray-300 text-gray-700 rounded-full p-0.5 hover:bg-yellow-300'><img src="img\icons8-minus-50.png" alt=""  />            </button>
            <input 
            type="range" 
            min={1}
            max={50}
            value={length}
            className='cursor-pointer sm:w-64 w-56'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <button
            onClick={increase}
            className='sm:mt-2 w-10 h-10 border-2 border-gray-300 text-gray-700 rounded-full p-0.5 hover:bg-yellow-300 '><img src="img\plus.svg" alt=""  />
            </button>
          </div>
          
        </div>
        <div className='grid sm:grid-cols-3 gap-x-2 gap-y-1 text-3xl sm:my-4'>
        <label className='m-2 sm:py-12 px-4 font-bold text-xl col-span-1 flex justify-between content-center'>characters used:</label>
        <div className='col-span-2 p-4 grid grid-cols-2 text-2xl'>  
          <div className='flex items-center font-bold gap-x-2'>
            <input 
            type="checkbox" 
            defaultChecked = {largecharAllowed}
            id = "largecharInput"
            onChange={()=>{
              setLargecharAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor='largecharInput'>ABC</label>
          </div>
          <div className='flex items-center font-bold gap-x-2'>
            <input 
            type="checkbox" 
            defaultChecked = {numberAllowed}
            id = "numberInput"
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
            />
            <label chtmlFor='numberInput'>123</label>
          </div>
          <div className='flex items-center font-bold gap-x-2'>
            <input 
            type="checkbox" 
            defaultChecked = {smallcharAllowed}
            id = "smallCharacterInput"
            onChange={()=>{
              setSmallcharAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor='smallCharacterInput'>abc</label>
          </div>
          <div className='flex items-center font-bold gap-x-2'>
            <input 
            type="checkbox" 
            defaultChecked = {charAllowed}
            id = "characterInput"
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor='characterInput'>#$&</label>
          </div>
          
        </div>
          
        </div>
        
        
      </div>

        </div>
        
    </div>


    </>
  )
}

export default App
