import QueryForm from "@/components/QueryForm";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const chatId = (await params).chatId;

  return (
    <section>
      <div className="fixed bottom-0">
        <QueryForm />
      </div>
    </section>
  );
}
