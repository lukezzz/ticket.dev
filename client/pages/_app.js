import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../compontents/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <div className="container">
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    try {
        const client = await buildClient(appContext.ctx);
        const { data } = await client.get("/api/users/currentuser");

        let pageProps = {};
        if (appContext.Component.getInitialProps) {
            pageProps = await appContext.Component.getInitialProps(
                appContext.ctx,
                client,
                data.currentUser
            );
        }

        console.log(pageProps);

        return {
            pageProps,
            ...data,
        };
    } catch (error) {
        console.log(error);
        return {};
    }
};

export default AppComponent;
