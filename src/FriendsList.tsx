import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FrienderApi from "./FrienderApi";

function FriendsList({ user }) {
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        async function getFriends() {
            const friends = await FrienderApi.getFriends(user.username);
            setFriends(friends);
        }
        getFriends();
    }, []);

    if (!friends) return <h1 className="vertical-center">Loading friends...</h1>;

    if (friends.length === 0) return <h1 className="vertical-center">You have no friends.</h1>;

    return (
        <div className="Form mt-3">{
            friends.map(f =>
                <Link key={f.username} to={`/friends/${f.username}`}>
                    {f.username}
                </Link>
            )
        }
        </div>
    );
}

export default FriendsList;