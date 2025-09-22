export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/hostaway`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  console.log("reviews:", data);
  return <h1>Home</h1>;
}
