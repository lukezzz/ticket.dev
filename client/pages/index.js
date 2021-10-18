import buildClient from "../api/build-client";

const Index = ({ currentUser }) => {
    return currentUser ? (
        <h1>You are signed in</h1>
    ) : (
        <h1>You are NOT sigin in</h1>
    );
};

Index.getInitialProps = async (context) => {
    console.log("Landing page!");
    try {
        const { data } = await buildClient(context).get(
            "/api/users/currentuser"
        );
        return data;
    } catch (error) {
        return {};
    }
};

export default Index;
