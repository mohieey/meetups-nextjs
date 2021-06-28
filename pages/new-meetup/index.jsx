import NewMeetupForm from "./../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (newMeetupData) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    console.log(data);
    router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Add an new meetup</title>
        <meta name="description" content="Add new meetups whenever you want" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
