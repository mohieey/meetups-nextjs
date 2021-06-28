import MeetupList from "./../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const Dummy_Meetups = [
  {
    id: "m1",
    title: "The First meetup",
    image: "https://picsum.photos/200",
    description: "This is the first meetup",
  },
  {
    id: "m2",
    title: "The Second meetup",
    image: "https://picsum.photos/200",
    description: "This is the second meetup",
  },
];

const HomePage = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Organize your meetups with ease" />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  console.log("This Log appears in the terminal only");

  const client = await MongoClient.connect(process.env.url);

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const results = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: results.map((result) => ({
        id: result._id.toString(),
        title: result.title,
        address: result.address,
        image: result.image,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
