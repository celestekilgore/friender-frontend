import { useState, useEffect } from "react";
import FrienderApi from "./FrienderApi";
import { UserInterface } from "./interfaces";

/** Friends List component
 *
 * Props:
 * - user: object like {username, zip_code, friend_radius, hobbies, interests, image}
 *
 * State:
 * - friends: array of friends like: [{username, image},...]
 *
 * RoutesList -> FriendsList
 */

function FriendsList({ user }: { user: UserInterface; }) {
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        async function getFriends(): Promise<void> {
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