import type { MetaFunction } from "@remix-run/node";
import { LoaderFunction, json } from "@remix-run/node";;
import Collection from "~/containers/Collection";
import { DISCOGS_USERNAME } from "~/utils/constants";
import { fetchCollection, fetchCollectionValue } from "~/utils/helpers";

export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  const collection = await fetchCollection(DISCOGS_USERNAME);
  const value = await fetchCollectionValue(DISCOGS_USERNAME)
  return json({ collection, value });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Discogs" },
    { name: "description", content: "Welcome to my records collection!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4 bg-gray-900 dark:bg-gray-900">
      <h1 className="mt-10 tracking-wide text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        🎶 🎧 My Records Collection
      </h1>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <Collection />
    </div>
  );
}
