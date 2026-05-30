export async function postData(route: string, postedData: any) {
  const res = await fetch(`http://localhost:5000/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postedData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
