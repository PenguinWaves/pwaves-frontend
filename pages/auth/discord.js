import Head from "next/head";
import Header from "/components/Header";
import Footer from "/components/Footer";
import styles from "/styles/Home.module.css";
import axios from "axios";

export async function getServerSideProps(context) {
  try {
    axios.defaults.withCredentials = true;

    const res = await axios.get(
      "https://pwaves-backend.vercel.app/auth/user/info",
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      },
    );

    if (res.status !== 200) {
      // Handle error, if any
      console.error("Error fetching user info:", res.status, res.statusText);
    }

    const userInfo = res.data;
    console.log(userInfo)

    // Save user info in the session
    context.res.setHeader(
      "Set-Cookie",
      `userInfo=${JSON.stringify(userInfo)}; Path=/; HttpOnly`,
    );

    // Redirect to the homepage
    return {
      redirect: {
        destination: "discord-thanks",
        permanent: false,
      },
    };
  } catch (error) {
    // Log the error details in the console
    console.error(
      "Error fetching user info:",
      error.response ? error.response.data : error.message,
    );

    return {
      redirect: {
        destination: "/error", // Redirect to an error page if fetching fails
        permanent: false,
      },
    };
  }
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PenguinWaves</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href="/">If this page did not redirect you, click this.</a>
      </main>

      <Footer />
    </div>
  );
}