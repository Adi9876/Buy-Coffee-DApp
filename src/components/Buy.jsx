const ethers = require("ethers");


const Buy = (props) => {

    const cfe = async (event) => {

        event.preventDefault();
        // console.log(`here ${state}`);
        const { contract } = props.state;
        console.log(contract);

        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        const amnt = document.querySelector("#amount").value;

        const amount = { value: ethers.parseEther(amnt) };

        console.log(name, message, amnt);
        const txn = await contract.buyCoffee(name, message, amount);

        alert("Wait 15-30 seconds for Transaction to finish...");
        await txn.wait();
        alert("Transaction Done..");
        
        window.location.reload();

    }

    return <>
        <div className="inp">
            <div className="item">
                <form onSubmit={cfe}>
                    <input type="text" id="name" placeholder="Enter your name.." />
                    <input type="text" id="message" placeholder="Enter your message.." />
                    <input type="text" id="amount" placeholder="Enter amount.." />
                    <button type="submit"
                        disabled={!props.state.contract}
                    >Pay</button>
                </form>
            </div>

        </div>

    </>

}

export default Buy;