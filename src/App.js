import logo from "./logo.svg";
import "./App.css";
import supabase from "./supabase";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
function App() {
  const [state, setstate] = useState(false);
  const [mysite,setmysite] = useState("https://preeminent-bienenstitch-1f1cca.netlify.app/");
  supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "verify" },
      (payload) => {
        console.log("Change received!", payload);
        setstate(payload?.new?.value);
      }
    )
    .subscribe();

  return (
    <div className="App">
      {!state ? (
        <div className="qr-main">
          <QRCode value={mysite}/>
          {/* <img className="qr" src="qrcode.png" /> */}
        </div>
      ) : (
        <div>
          <h1>SUCCESS ✅</h1> 
          </div>
        
      )}
    </div>
  );
}

export default App;
