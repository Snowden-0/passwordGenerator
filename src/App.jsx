import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numAllowed) str += "0123456789"
      if(charAllowed) str += "!@#$%^&*()"

      for(let i = 1; i<=length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-2xl rounded-lg px-4 py-6 my-16 bg-gray-800'>
        <h1 className='text-white text-center my-5 text-2xl font-extrabold'>Password Generator</h1>
          <div className='flex shadow-xl rounded-lg overflow-hidden mb-6'> 
            <input 
            type="text"
            value={password}
            className='outline-none w-full py-2 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-black text-white px-3 py-2 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer '
            onChange={(e) => setLength(e.target.value)}
            />
              <label className='text-orange-500 font-bold'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={()=>{
                setNumAllowed((prev => !prev));
              }}
              />
              <label className='text-orange-500 font-bold' htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={()=>{
              setCharAllowed((prev => !prev));
              }} 
              />
              <label className='text-orange-500 font-bold' htmlFor="characterInput">Characters</label>
          </div>
        </div>
    </div>
      
    </>
  )
}

export default App
