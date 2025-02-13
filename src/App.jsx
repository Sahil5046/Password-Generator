import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  //useRef ref
  const passeordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&_-/|?{]*";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numAllowed, charAllowed, setpassword]);

  const copyPassToClipBoard = useCallback(()=>{
    passeordRef.current?.select()
    passeordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect (()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div
          className="flex shadow rounded-lg
overflow-hidden mb-4"
        >
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passeordRef}
          />

          <button onClick={copyPassToClipBoard} className="outline-none py-0.5 px-3 shrink-0 bg-blue-700 text-white">
            COPY
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(event) => {
                setlength(event.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
              name=""
              id="numberInp"
            />
            <label htmlFor="numberInp">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
              name=""
              id="charInput"
            />
            <label htmlFor="charInput">Symbol</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
