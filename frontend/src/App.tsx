import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import type { Auction } from './types/auction';

function App() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const auctionsLength = auctions?.length; 

  useEffect(() => {
    async function fetchOpenApi() {
      const res = await axios.get('/api/auctions');
      console.log("🚀 ~ fetchOpenApi ~ res:", res)
      if (res.status === 200) {
        setAuctions(res.data)
      }
    } 
    fetchOpenApi()
  }, [])


  return (
    <>
      <div>
        <h1>총 : {auctionsLength}개</h1>
        {
          auctions.slice(0, 10).map(auction => (
            <div>
              <div>{auction.jiwonNm}</div>
              <div>{auction.dspslUsgNm}</div>
              <div>{auction.printSt}</div>
              <div>{auction.convAddr}</div>
              <div>{auction.gamevalAmt}</div>
              <div>{auction.notifyMinmaePrice1}</div>
              <div>{auction.jpDeptNm}</div>
              <div>유찰 {auction.yuchalCnt}회</div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
