import axios from "axios";
import { useEffect, useState } from "react";

export default function PublicAuction() {

  // const [auctions, setAuctions] = useState([]) 

  // useEffect(() => {
  //   async function fetchOpenApi() {
  //     const res = await axios.get('/api/public-auctions');
  //     console.log("🚀 ~ fetchOpenApi ~ res:", res)
  //     if (res.status === 200) {
  //       setAuctions(res.data)
  //     }
  //   } 
  //   fetchOpenApi()
  // }, [])

  return (
    <div className="text-center">
      공매 데이터 페칭
    </div>
  )
}