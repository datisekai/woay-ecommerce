import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/Header/Header";

export default function Home() {
  return (
    <div data-theme='mytheme'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header/>
      <div className="min-h-screen"></div>
      </main>
    </div>
  );
}
