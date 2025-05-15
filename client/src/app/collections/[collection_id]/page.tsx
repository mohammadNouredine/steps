import { apiEndpoints } from "@/api/apiEndpoints";
import SingleCollectionComponent from "./_components/SingleCollectionComponent";
import { Collection } from "@/types/collection";

//----------------------------SINGLE COLLECTION--------------------------
async function getCollection(collection_id: number) {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_URL
  }${apiEndpoints.GET_SINGLE_COLLECTION_BY_ID(collection_id)}`;

  const res = await fetch(apiUrl);
  const post = await res.json();

  return post;
}

//----------------------------PATHS--------------------------
export async function generateStaticParams() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiEndpoints.GET_ALL_COLLECTIONS_IDS}`;
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} - ${res.statusText}`);
    }
    const ids = await res.json();
    return ids.map((id: { id: number }) => ({
      collection_id: id.id,
    }));
  } catch (error) {
    console.error("Failed to fetch paths:", error);
    return [];
  }
}

//----------------------------RENDER--------------------------
async function SingleCollection({
  params,
}: {
  params: Promise<{ collection_id: string }>;
}) {
  const { collection_id } = await params;
  const collection = (await getCollection(Number(collection_id))) as Collection;
  return (
    <div className="overflow-clip">
      <>
        <div className="min-h-screen">
          <main>
            <SingleCollectionComponent collection={collection} />
          </main>
        </div>
      </>
    </div>
  );
}

export default SingleCollection;
