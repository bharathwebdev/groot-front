import logo from "./logo.svg";
import "./App.css";
import supabase from "./supabase";
import { useEffect, useState } from "react";
function App() {
  const [state, setstate] = useState(false);
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
          <img className="qr" src="qrcode.png" />
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
