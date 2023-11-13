import { useState, useEffect } from "react";
import "./App.css";
import ABI from "./contractJson/coffee.json";
import Memos from "./components/Memos";
import Buy from "./components/Buy";
import coffeepng from "./coffee.png";

const ethers = require("ethers");

function App() {
  const [state, setState] = useState({
    // provider: null,
    // signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x0719c5e01262b7Cd68Dec84ae8fA58D9263a239D";
      const contractABI = ABI.abi;

      //metamask
      try {
        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        /// this windows.ethereum.on helps in auto refresh when account change
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(account[0]);

        const provider = new ethers.BrowserProvider(ethereum);

        // helps in changing state
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        // console.log({provider,signer,contract});
        setState({ contract: contract });
      } catch (error) {
        alert(error);
      }
    };
    template();
  }, []);

  return (
    <div className="texts">
      <img src={coffeepng} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Your Account - {account}</small>
      </p>
      <Buy state={state} />
      <center>
        <p>Messages</p>
      </center>
      <Memos state={state} />
    </div>
  );
}

export default App;
