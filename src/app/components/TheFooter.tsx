import "./footer.css";
import Link from "next/link";


const TheFooter = () =>{
    return(
         <div className="header">
            <div className="nav-left">
                    <Link href="/">Home</Link>
                    <Link href="/token">Token</Link>
                </div>

         </div>
                
        
    )

}
    


export {TheFooter};
