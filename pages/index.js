import Head from 'next/head'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 Twitter Clone App</title>
        <meta name="description" content="A basic Web3 Twitter clone app using NextJS and firebase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
