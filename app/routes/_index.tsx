import type { MetaFunction } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
import Collection from "~/components/Collection";
import { DISCOGS_USERNAME } from "~/utils/constants";
import { fetchCollection, fetchCollectionValue } from "~/utils/helpers";

export const loader: LoaderFunction = async () => {
  const collection = await fetchCollection(DISCOGS_USERNAME);
  const value = await fetchCollectionValue(DISCOGS_USERNAME)
  return { collection, value };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Discogs" },
    { name: "description", content: "Welcome to my records collection!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Discogs</h1>
      <Collection />
    </div>
  );
}
