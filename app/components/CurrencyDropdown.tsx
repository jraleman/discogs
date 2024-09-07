import { useState } from "react";
import { ALLOWED_CURRENCIES } from "~/utils/constants";

export type Props = {
  onCurrencyChange: (currency: string) => void;
}

export default function CurrencyDropdown({ onCurrencyChange }: Props) {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
    onCurrencyChange(newCurrency); // Notify parent component about currency change
  };

  const currencies = ALLOWED_CURRENCIES;

  return (
    <div className="m-2">
      <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
