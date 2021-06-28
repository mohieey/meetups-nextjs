import { Fragment } from "react";
import MeetupDetail from "./../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = ({ meetupData }) => {
  const { id, image, title, address, description } = meetupData;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
        id={id}
      />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return { props: { meetups: Dummy_Meetups } };
// }

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.url);

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const results = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: results.map((result) => ({
      params: { meetupId: result._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  console.log("This Log appears in the terminal only");

  const client = await MongoClient.connect(process.env.url);

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetup = await meetupCollection.findOne({
    _id: ObjectId(context.params.meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        image: meetup.image,
        title: meetup.title,
        id: context.params.meetupId,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
