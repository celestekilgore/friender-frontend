import { useState, useEffect } from "react";
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
                <div key={f.username} className="mb-3">
                    <img className="small-img" src={f.image} />
                    <b>{f.username}</b>
                </div>
            )
        }
        </div>
    );
}

export default FriendsList;