import axios from "axios";

export async function fetchTransfers(apiKey: string) {
  const endpoint =
    "https://api.studio.thegraph.com/query/87213/thegraph-bounty/version/latest";
  //   const apiKey = "";
  const query = `
  query MyQuery {
    transfers(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
      id
      transactionHash
      blockNumber
      from
      to
      value
      blockTimestamp
    }
  }`;

  try {
    const response = await axios.post(
      endpoint,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return null;
  }
}

export async function fetchTotalTransfers(token: string) {
  type TokensEndpoints = {
    usdt: string;
    bnb: string;
    trx: string;
    shib: string;
  };

  // Define endpoints
  const tokensEndpoints: TokensEndpoints = {
    usdt: "https://api.studio.thegraph.com/query/87213/thegraph-bounty/version/latest",
    bnb: "https://api.studio.thegraph.com/query/87213/thegraph-bounty-bnb/version/latest",
    trx: "https://api.studio.thegraph.com/query/87213/thegraph-bounty-trx/version/latest",
    shib: "https://api.studio.thegraph.com/query/87213/thegraph-bounty-shib/version/latest"
  };

  // Ensure token is a valid key
  if (!(token in tokensEndpoints)) {
    throw new Error(`Invalid token key: ${token}`);
  }

  // Get the endpoint based on the token
  const endpoint = tokensEndpoints[token as keyof TokensEndpoints];

  // Format date and timestamps
  const date = new Date();
  // const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  // const startTimestamp = new Date(today).setHours(0, 0, 0, 0);
  // const stopTimestamp = new Date(today).setHours(23, 59, 59, 999);
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

  // Convert to timestamps
  const startTimestamp = startOfDay.getTime();
  const stopTimestamp = endOfDay.getTime();

  const startTimestampSeconds = Math.floor(startTimestamp / 1000);
  const stopTimestampSeconds = Math.floor(stopTimestamp / 1000);

  // If you need to convert to a string and slice the first 10 characters (not needed in this case)
  const startTimestampStr = startTimestampSeconds.toString().slice(0, 10);
  const stopTimestampStr = stopTimestampSeconds.toString().slice(0, 10);

  const query = `
  query MyQuery {
    transfers(first: 1000, where: {blockTimestamp_gte: "${startTimestampStr}", blockTimestamp_lte: "${stopTimestampStr}"}) {
      id
    }
  }`;

  try {
    // Make the request
    const response = await axios.post(
      endpoint,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          // Ensure `apiKey` is defined or remove this if not needed
          Authorization: `Bearer 93fa4c2400834278ed5a4a6ad58ce31e`, // Replace with your actual API key if needed
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return null;
  }
}