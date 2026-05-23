export async function searchChats() {
  const res = await fetch("http://localhost:5000/chats");

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
