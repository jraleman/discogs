import { DISCOGS_BASE_URL, DISCOGS_API_TOKEN, CURRENCY_BASE_URL } from "./constants";

const headers = {
  'Authorization': `Discogs token=${DISCOGS_API_TOKEN}`
};

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchCollectionPage(username: string, page: number) {
  const response = await fetch(`${DISCOGS_BASE_URL}/users/${username}/collection/folders/0/releases?page=${page}&per_page=50`, { headers });
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return {
    records: data.releases,
    totalPages: data.pagination.pages,
  };
}

export async function fetchCollectionBatch(username: string, totalPages: number, batchSize: number = 2, delayTime: number = 2000): Promise<any[]> {
  let allRecords: any[] = [];

  for (let i = 1; i <= totalPages; i += batchSize) {
    const batchPromises = [];

    for (let page = i; page < i + batchSize && page <= totalPages; page++) {
      batchPromises.push(fetchCollectionPage(username, page));
    }
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(result => allRecords = [...allRecords, ...result.records]);
    
    if (i + batchSize <= totalPages) {
      await delay(delayTime);
    }
  }
  return allRecords;
}

export async function fetchCollection(username: string) {
  const { totalPages } = await fetchCollectionPage(username, 1);
  return await fetchCollectionBatch(username, totalPages);
}

export async function fetchCollectionValue(username: string) {
  const response = await fetch(`${DISCOGS_BASE_URL}/users/${username}/collection/value`, { headers });
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function fetchCurrencyRate(fromCurrency: string, toCurrency: string) {
  const response = await fetch(`${CURRENCY_BASE_URL}/${fromCurrency}`);
  const data = await response.json();
  const rate = data.rates[toCurrency];
  return rate;
}

export function currencyStringToNumber(currency: string): number {
  const cleaned = currency.replace(/[^0-9.-]+/g, "");
  return parseFloat(cleaned);
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function convertCurrency(amount: number, rate: number) {
  return amount * rate;
}
