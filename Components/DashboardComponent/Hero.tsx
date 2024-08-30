"use client";

import Image from "next/image";
import Link from "next/link";
import { fetchTransfers, fetchTotalTransfers } from "@/Services/http";
import bnb from "@/public/assets/bnbbsc.svg";
import trx from "@/public/assets/tron.svg";
import usdt from "@/public/assets/usdterc20.svg";
import shib from "@/public/assets/shib.svg"
import Chart from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
import { useState, useEffect } from "react";
import { BarChart } from "@/Components/DashboardComponent/Charts";

Chart.register(CategoryScale);


const Hero = () => {

  const [usdttransfers, setUSDTTransfers] =  useState<number>(0);
  const [trxtransfers, setTRXTransfers] =  useState<number>(0);
  const [bnbtransfers, setBNBTransfers] =  useState<number>(0);
  const [shibtransfers, setSHIBTransfers] =  useState<number>(0);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: ["USDT", "BNB", "TRX", "SHIB"],
    datasets: [
      {
        label: "Transactions Today",
        data: [0,0,0,0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      }
    ]
  });

  useEffect(() => {
    async function getTotalTransfers() {
      // replace string with apiKey
      const usdtData = await fetchTotalTransfers("usdt");
      const trxData = await fetchTotalTransfers("trx");
      const bnbData = await fetchTotalTransfers("bnb");
      const shibData = await fetchTotalTransfers("shib");
      //   const data = await fetchTransfers(`${apiKey}`); // uncomment once router is fixed
      if (usdtData && trxData && bnbData && shibData) {
        // console.log(data)
        let usdtTotal = usdtData.data.transfers
        let trxTotal = trxData.data.transfers
        let bnbTotal = bnbData.data.transfers
        let shibTotal = shibData.data.transfers
        setUSDTTransfers(usdtTotal.length);
        setTRXTransfers(trxTotal.length);
        setBNBTransfers(bnbTotal.length);
        setSHIBTransfers(shibTotal.length);
console.log(usdtTotal.length,trxTotal.length,bnbTotal.length,shibTotal.length)
        setChartData({
          labels: ["USDT", "BNB", "TRX", "SHIB"],
          datasets: [
            {
              label: "Transactions Today",
              data: [usdtTotal.length, bnbTotal.length, trxTotal.length, shibTotal.length],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            }
          ]
        });
      }
    }

    getTotalTransfers();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-primary-100 mt-4">Total Transfers</h1>
    <div className="flex mt-8 justify-evenly">
      
      <Link href="/usdt" className=" border-2 shadow-2xl hover:scale-110 transform transition-transform duration-[1s] ease-in-out w-80 tablet:w-full cursor-pointer">
        <div className="flex flex-col justify-center items-center py-5 space-y-6" >
          <h2 className="text-xl font-semibold text-primary-200">USDT</h2>
          <Image src={bnb} alt="bnb" className="object-contain w-24" />
          <h2 className="text-xl font-semibold text-primary-300" >{usdttransfers==1000?`${usdttransfers}+`:`${usdttransfers}`}</h2>
        </div>
      </Link>
      <Link href="/bnb" className="flex flex-col justify-center items-center border-2  p-4 shadow-2xl hover:scale-110 transform transition-transform duration-[1s] ease-in-out w-80 tablet:w-full cursor-pointer">
        <div className="flex flex-col justify-center items-center space-y-6">
         <h2 className="text-xl font-semibold text-primary-200">BNB</h2>
          <Image src={usdt} alt="bnb" className="object-contain w-16" />
          <h2 className="text-xl font-semibold text-primary-300">{bnbtransfers==1000?`${bnbtransfers}+`:`${bnbtransfers}`}</h2>
        </div>
      </Link>
      <Link href="/trx" className="flex flex-col justify-center items-center border-2p-4 shadow-2xl hover:scale-110 transform transition-transform duration-[1s] ease-in-out w-80 tablet:w-full cursor-pointer">
        <div className="flex flex-col justify-center items-center space-y-6">
        <h2 className="text-xl font-semibold text-primary-200">TRX</h2>
          <Image src={trx} alt="bnb" className="object-contain w-16" />
          <h2 className="text-xl font-semibold text-primary-300">{trxtransfers==1000?`${trxtransfers}+`:`${trxtransfers}`}</h2>
        </div>
      </Link>
      <Link href="/trx" className="flex flex-col justify-center items-center border-2p-4 shadow-2xl hover:scale-110 transform transition-transform duration-[1s] ease-in-out w-80 tablet:w-full cursor-pointer">
        <div className="flex flex-col justify-center items-center space-y-6">
        <h2 className="text-xl font-semibold text-primary-200">SHIB</h2>
          <Image src={shib} alt="bnb" className="object-contain w-16" />
          <h2 className="text-xl font-semibold text-primary-300">{shibtransfers==1000?`${shibtransfers}+`:`${shibtransfers}`}</h2> 
        </div>
      </Link>
    </div>
    <div className="mt-5">
    <BarChart chartData={chartData} />
    </div>
    </div>
  );
};

export default Hero;
