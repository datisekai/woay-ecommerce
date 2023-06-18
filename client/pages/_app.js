import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import UserLayout from "../src/components/layouts/UserLayout";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NextNProgress color="#000" options={{ showSpinner: false }} />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
            ;
        </>
    );
}

export default MyApp;
