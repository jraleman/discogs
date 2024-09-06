# Discogs

Record collection viewer using Discogs API.

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Step-by-step Implementation Guide

To develop the application, let's follow step-by-step the following guide to create the record collection app viewer using Remix, TypeScript, and vanilla JavaScript for most functions.
This will cover setting up the project, interacting with the Discogs API, and incorporating key features like search, currency conversion, and theming.

### Step 1: Set Up Remix

1. **Install Remix and create a new project:**

   Open your terminal and run the following command:
   ```bash
   npx create-remix@latest
   ```

2. **Install Dependencies**

Although you aim to use vanilla JavaScript as much as possible, some libraries can streamline the process:

- **Testing**: Use `jest` and `react-testing-library` for unit and component testing:
  ```bash
  npm install jest @testing-library/react @testing-library/jest-dom
  ```

- **i18n**: Use `react-i18next` for internationalization (i18n):
  ```bash
  npm install react-i18next i18next
  ```

### Step 2: Setting Up Discogs API Access with Fetch

1. **Create a utility function** to fetch the user’s record collection using the Discogs API directly with `fetch`. This function will make a GET request to Discogs and retrieve the collection data.

2. **Discogs API URL and Authorization**: 
   You will need your Discogs API token for authentication, which is provided in your Discogs developer account. Use this token in the `Authorization` header.

Here's the updated code for fetching data using `fetch`:

### Step 3: Fetching the Discogs Collection using `fetch`

Create a file called `app/utils/constants.ts`, and define the base URL

```typescript
export const DISCOGS_API_URL = 'https://api.discogs.com';
```

In your `app/utils/helpers.ts` file, you can create the `fetchCollection` function using vanilla JavaScript's `fetch` method:

```typescript
export async function fetchCollection(username: string) {
  const response = await fetch(`${DISCOGS_API_URL}/users/${username}/collection/folders/0/releases`, {
    headers: {
      'Authorization': `Discogs token=${process.env.DISCOGS_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch collection');
  }

  const data = await response.json();
  return data.releases;
}
```

Here, we are making a GET request to retrieve the user’s collection of releases in folder `0` (which is typically the main collection folder). The API token is passed in the `Authorization` header.

### Step 4: Loader to Fetch Data in Remix

In the `app/routes/index.tsx` (or wherever you want to load the data), use Remix's `loader` function to fetch the data server-side before rendering the component:

```typescript
import { LoaderFunction } from "@remix-run/node";
import { fetchCollection } from "~/utils/discogs";

export const loader: LoaderFunction = async () => {
  const username = "your-discogs-username"; // Replace with actual username or dynamic parameter
  const collection = await fetchCollection(username);
  return { collection };
};
```

### Step 5: Rendering the Collection Data in Your React Component

In your main `Collection` component, use `useLoaderData` to access the data fetched by the loader:

```tsx
import { useLoaderData } from "@remix-run/react";

export default function Collection() {
  const { collection } = useLoaderData();

  return (
    <div>
      {collection.map((record: any) => (
        <div key={record.id}>
          <img src={record.basic_information.cover_image} alt={record.basic_information.title} />
          <h2>{record.basic_information.title}</h2>
          <p>{record.basic_information.artists[0].name}</p>
          <p>{record.basic_information.year}</p>
          <p>{record.basic_information.genres.join(", ")}</p>
          <p>Low: {record.lowest_price}, Mid: {record.median_price}, High: {record.highest_price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Step 6: Implementing the Currency Conversion Dropdown

We can now implement the currency conversion logic using a free currency conversion API, such as the [ExchangeRate API](https://www.exchangerate-api.com/), as mentioned before.

1. **Create a Currency Conversion Utility Function** in `app/utils/currency.ts`:

```typescript
export async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string) {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  const data = await response.json();
  const rate = data.rates[toCurrency];
  return amount * rate;
}
```

2. **Use the conversion function in your collection component**. Update the `Collection` component to handle currency changes:

```tsx
import { useState } from 'react';
import { convertCurrency } from '~/utils/currency';

export default function Collection() {
  const { collection } = useLoaderData();
  const [currency, setCurrency] = useState('USD');

  const handleCurrencyChange = async (newCurrency: string) => {
    setCurrency(newCurrency);
    for (let record of collection) {
      record.lowest_price = await convertCurrency(record.lowest_price, 'USD', newCurrency);
      record.median_price = await convertCurrency(record.median_price, 'USD', newCurrency);
      record.highest_price = await convertCurrency(record.highest_price, 'USD', newCurrency);
    }
  };

  return (
    <div>
      <CurrencyDropdown onCurrencyChange={handleCurrencyChange} />
      {collection.map((record: any) => (
        <div key={record.id}>
          <img src={record.basic_information.cover_image} alt={record.basic_information.title} />
          <h2>{record.basic_information.title}</h2>
          <p>{record.basic_information.artists[0].name}</p>
          <p>{record.basic_information.year}</p>
          <p>{record.basic_information.genres.join(", ")}</p>
          <p>Low: {record.lowest_price}, Mid: {record.median_price}, High: {record.highest_price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Step 8: Dark/Light Mode Support

1. **Theme Context**: Create a context to store the current theme and a toggle function.
   ```tsx
   import { createContext, useState, useContext } from "react";

   const ThemeContext = createContext();

   export const ThemeProvider = ({ children }) => {
     const [theme, setTheme] = useState('light');
     const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

     return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
         <div className={theme}>{children}</div>
       </ThemeContext.Provider>
     );
   };

   export const useTheme = () => useContext(ThemeContext);
   ```

2. **Apply theme** in your app:
   ```tsx
   const { theme, toggleTheme } = useTheme();
   return (
     <button onClick={toggleTheme}>
       Switch to {theme === 'light' ? 'dark' : 'light'} mode
     </button>
   );
   ```

### Step 9: Add i18n Support

Configure i18n with `react-i18next`:

1. **Initialize i18n** in `app/i18n.ts`:
   ```typescript
   import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import translationEn from './locales/en/translation.json';
   import translationEs from './locales/es/translation.json';

   i18n.use(initReactI18next).init({
     resources: {
       en: { translation: translationEn },
       es: { translation: translationEs },
     },
     lng: 'en',
     fallbackLng: 'en',
     interpolation: { escapeValue: false },
   });

   export default i18n;
   ```

2. Use translation in components with the `useTranslation` hook:
   ```tsx
   import { useTranslation } from 'react-i18next';

   const { t } = useTranslation();
   return <h1>{t('your.translation.key')}</h1>;
   ```

### Step 10: Testing the Application

1. **Unit Tests**: Use `jest` and `@testing-library/react` to write unit tests for your components. Here is an example test for the `Collection` component:

```typescript
import { render, screen } from '@testing-library/react';
import Collection from './Collection';

test('renders collection', () => {
  const mockData = [
    {
      id: 1,
      basic_information: {
        cover_image: 'url',
        title: 'Album Title',
        artists: [{ name: 'Artist Name' }],
        year: '2022',
        genres: ['Rock'],
      },
      lowest_price: 10,
      median_price: 15,
      highest_price: 20,
    },
  ];
  render(<Collection collection={mockData} />);

  expect(screen.getByText('Album Title')).toBeInTheDocument();
  expect(screen.getByText('Artist Name')).toBeInTheDocument();
});
```

### Step 11: Build and Deploy

Once everything is ready and tested:

1. **Build** the project for production:
   ```bash
   npm run build
   ```

2. **Deploy**: Use a platform like Vercel, Netlify, or Render to deploy your Remix app. These platforms handle Remix apps seamlessly.
