import { type AppType } from "next/app";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { ModalContextProvider } from "@/context/modalContext";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";
import AddCryptoModal from "@/components/AddCryptoModal";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>CoinSynch</title>
        <meta
          name="description"
          content="CoinSynch is a cryptocurrency portfolio tracker."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider>
        <ModalContextProvider>
          <Component {...pageProps} />

          <SignInModal />
          <SignUpModal />
          <AddCryptoModal />
        </ModalContextProvider>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
