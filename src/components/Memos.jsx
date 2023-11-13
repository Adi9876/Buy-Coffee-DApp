import { useEffect, useState } from "react";

const Memos = (props) => {

    const [memos, setMemos] = useState(["Name", "Message", "From"]);
    const { contract } = props.state;

    useEffect(() => {
        const memoMessage = async () => {
            const memos = await contract.getFunders();
            setMemos(memos);
            // console.log(memos);
        }
        contract && memoMessage();
    }, [contract]);

    return <>
        {memos.map((memo, index) => {
            return <div className="tab" key={index}>
                <table >
                    <tbody>
                        <tr>
                            <td>{memo.name}</td>
                            <td>{memo.message}</td>
                            <td>{memo.from}</td>
                        </tr></tbody>
                </table>
            </div>;
        })}

    </>

}

export default Memos;