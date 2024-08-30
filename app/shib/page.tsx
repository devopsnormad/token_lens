'use client';

import { fetchTransfers } from "@/Services/http"; // Replace with actual fetch logic
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoEyeOutline } from "react-icons/io5";

// Utility function to truncate text
const truncText = (str: string, length: number) => {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
};

// Modal Component for Transaction Details
const DetailsModal = ({
  open,
  data,
  close,
}: {
  open: boolean;
  data: any;
  close: () => void;
}) => {
  return (
    <>
      <div
        className={`flex justify-center z-10 absolute h-[100vh] w-[100vw]  ${
          open ? "visible" : "hidden"
        }`}
      >
        <div className=" bg-white text-black  h-fit w-[750px] mt-[5%] p-5 rounded-lg">
          <h2 className="text-2xl font-bold text-black mb-4 ">
            Transaction Details
          </h2>
          <ul className="flex flex-col gap-3">
            <li className="flex gap-1">
              {" "}
              <strong>ID:</strong>
              <span className="break-all">{data?.id}</span>
            </li>
            <li className="flex gap-2">
              {" "}
              <strong>Block Number:</strong>
              <span> {data?.blockNumber}</span>
            </li>
            <li className="flex gap-2">
              {" "}
              <strong>Block Timestamp:</strong>
              <span> {data?.blockTimestamp}</span>
            </li>
            <li className="flex gap-2">
              {" "}
              <strong>From:</strong>{" "}
              <span className="break-all">{data?.from}</span>
            </li>
            <li className="flex gap-2">
              {" "}
              <strong>To:</strong>
              <span className="break-all">{data?.to}</span>
            </li>
            <li className="flex gap-2">
              {" "}
              <strong>Transaction Hash:</strong>
              <span className="break-all">{data?.transactionHash}</span>
            </li>
            <li className="flex gap-2">
              {" "}
              <strong>Value:</strong>
              <span> {data?.value}</span>
            </li>
          </ul>
          <div className="flex justify-center items-center my-5">
            <button
              onClick={close}
              className="px-10 py-3 border text-sm font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Page = () => {
  const [transfers, setTransfers] = useState([]);
  const [open, setOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<any>({});
   //   const router = useRouter();
  //   const { apiKey, token } = router.query;

  useEffect(() => {
    async function getTransfers() {
      // Replace the string with the actual API key or logic to fetch TRX transfers
      const data = await fetchTransfers("YOUR_TRX_API_KEY_HERE");
       //   const data = await fetchTransfers(`${apiKey}`); // uncomment once router is fixed
      if (data) {
        setTransfers(data.data.transfers);
      }
    }

    getTransfers();
  }, []);

  // Table Row
  const TableRow = ({
    openDetails,
    data,
  }: {
    data: any;
    openDetails: () => void;
  }) => {
    const handleDetails = () => {
      setTransactionDetails(data);
      openDetails();
    };

    return (
      <div className="grid grid-cols-7 justify-between items-center">
        <div className="border h-10 flex items-center">
          <span
            onClick={handleDetails}
            className="border p-2 mx-1 bg-red-500 cursor-pointer"
          >
            <IoEyeOutline />
          </span>
          {truncText(data.id, 10)}
        </div>
        <div className="border h-10 flex justify-center items-center">
          {data.blockNumber}
        </div>
        <div className="border h-10 flex justify-center items-center">
          {data.blockTimestamp}
        </div>
        <div className="border h-10 flex justify-center items-center">
          {truncText(data.from, 20)}
        </div>
        <div className="border h-10 flex justify-center items-center">
          {truncText(data.to, 20)}
        </div>
        <div className="border h-10 flex justify-center items-center">
          {truncText(data.transactionHash, 20)}
        </div>
        <div className="border h-10 flex justify-center items-center">
          {data.value}
        </div>
      </div>
    );
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className={`h-[100vh] z-5 absolute opacity-75 w-[100vw] bg-black `}
        ></div>
      )}
      <DetailsModal
        data={transactionDetails}
        open={open}
        close={() => setOpen(false)}
      />
      <div>
        {/* Navbar */}
        <div>
          {/* <h2>Transactions for TRX</h2> */}
          <h2 className="text-3xl font-bold my-3">Transactions for SHIB</h2>
          <div className="grid grid-cols-7 justify-between thead">
            <div className="border h-10 flex justify-center items-center">
              ID
            </div>
            <div className="border h-10 flex justify-center items-center">
              Block Number
            </div>
            <div className="border h-10 flex justify-center items-center">
              Block Timestamp
            </div>
            <div className="border h-10 flex justify-center items-center">
              From
            </div>
            <div className="border h-10 flex justify-center items-center">
              To
            </div>
            <div className="border h-10 flex justify-center items-center">
              Transaction Hash
            </div>
            <div className="border h-10 flex justify-center items-center">
              Value
            </div>
          </div>
          {transfers.length > 0
            ? transfers.map((transaction: any) => (
                <TableRow
                  key={transaction.id}
                  openDetails={() => setOpen(true)}
                  data={transaction}
                />
              ))
            : "Loading transactions..."}
        </div>
      </div>
    </>
  );
};

export default Page;
