import buildClient from "../api/build-client";
import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
    if (!currentUser) {
        return <div>You are not sign in</div>;
    }

    const ticketList = tickets.map((ticket) => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link
                        href="/tickets/[ticketId]"
                        as={`/tickets/${ticket.id}`}
                    >
                        <a>View</a>
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    // console.log("Landing page!");
    // try {
    //     const { data } = await buildClient(context).get(
    //         "/api/users/currentuser"
    //     );
    //     return data;
    // } catch (error) {
    //     return {};
    // }
    const { data } = await client.get("/api/tickets");
    return { tickets: data };
};

export default LandingPage;
