import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails(props) {
  // const router = useRouter();
  // const meetupId = router.query.meetupid;
  // console.log(meetupId);
  return (
    <Fragment>
      <Head>
        <title>{props.meetupdata.title}</title>
        <meta name="description" content={props.meetupdata.description} />
      </Head>

      <MeetupDetail
        image={props.meetupdata.image}
        title={props.meetupdata.title}
        address={props.meetupdata.address}
        description={props.meetupdata.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-surya:hello123@cluster0.bd0g5.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupcollections = db.collection("meetups");
  const meetups = await meetupcollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupid: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupid;
  const client = await MongoClient.connect(
    "mongodb+srv://admin-surya:hello123@cluster0.bd0g5.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupcollections = db.collection("meetups");
  const meetup = await meetupcollections.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return {
    props: {
      meetupdata: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
