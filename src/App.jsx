import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) string += "01234567890";
    if (charAllowed) string += "!@#$%&(){}[]?/>.<,";

    for (let i = 0; i < length; i++) {
      pass += string[Math.floor(Math.random() * string.length)];
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed, generatePassword]);

  const copyToclipboard =()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  }

  return (
    <div className="py-5">
      <h1 className="text-center text-[30px] mb-5">Password Generator</h1>
      <div className="w-[full] flex justify-center items-center flex-col">
        <div className="flex gap-5 w-[500px] justify-center">
          <input
            className="bg-gray-50 h-[40px] w-[80%] border rounded-lg pl-2 outline-none"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly
            ref={passwordRef}
          />
          <button className="bg-blue-500 px-3 py-2 rounded-md text-white" onClick={copyToclipboard}>
            Copy
          </button>
        </div>
        <div className="flex w-[500px] gap-5 justify-between items-center pt-5 px-5 pr-20">
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <span>Length: {length}</span>
          </div>
          <div className="flex gap-3 justify-center items-center mt-[-30px]">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => setNumAllowed(!numAllowed)}
            />
            <span>Numbers</span>
          </div>
          <div className="flex gap-3 justify-center items-center mt-[-30px]">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
            />
            <span>Characters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
