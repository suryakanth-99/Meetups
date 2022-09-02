import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();
  async function addNewMeetupHandler(meetupdata) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Add new Meetup Page</title>
        <meta
          name="description"
          content="Add your meetups and use this as a memory to see agaiin recall your wonderful memories"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addNewMeetupHandler} />;
    </>
  );
}

export default NewMeetup;
