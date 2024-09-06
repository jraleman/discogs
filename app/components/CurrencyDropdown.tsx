import { useState } from "react";
import { CURRENCIES } from "~/utils/constants";

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

  const currencies = CURRENCIES;

  return (
      <div>
      <label htmlFor="currency">Select Currency: </label>
      <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}