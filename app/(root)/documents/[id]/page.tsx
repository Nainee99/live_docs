import CollaborativeRoom from "@/components/custom/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Document = async ({ params }: SearchParamProps) => {
  // Step 1: Explicitly extract `id` from `params`
  const id = params.id;

  // Step 2: Fetch the current user
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  // Step 3: Fetch the room document using the room ID and user email
  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  // Step 4: Redirect to the home page if the room does not exist
  if (!room) {
    redirect("/");
  }

  // Step 5: Render the CollaborativeRoom component with room metadata
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Document;