import QueryForm from "@/components/QueryForm";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const chatId = (await params).chatId;

  return (
    <section className="h-screen w-[100%] relative">
      <QueryForm chatId={chatId} />
    </section>
  );
}
