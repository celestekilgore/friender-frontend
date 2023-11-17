import { useEffect, useState } from "react";
import FrienderApi from "./FrienderApi";
import ProfileCard from "./ProfileCard";

function GetPotentialFriend({ user }) {
    const [potentialFriend, setPotentialFriend] = useState(null);
    const [noMoreFriends, setNoMoreFriends] = useState(false);

    useEffect(() => {
        async function getPotentialFriend() {
            const newPotentialFriend = await FrienderApi.getPotentialFriend(user.username);
            if (newPotentialFriend) {
                setPotentialFriend(newPotentialFriend);
            } else {
                setNoMoreFriends(true);
            }
        }

        if (!potentialFriend) {
            getPotentialFriend();
        }

    }, [potentialFriend]);

    async function swipe(response: boolean) {
        await FrienderApi.establishRelationship(potentialFriend.username, response);
        setPotentialFriend(null);
    }

    if (noMoreFriends) return <h1 className="vertical-center">No users found in your radius.</h1>;

    if (!potentialFriend) return <h1 className="vertical-center">Looking for potential friends...</h1>;

    return <ProfileCard user={potentialFriend} swipe={swipe} />;
}

export default GetPotentialFriend;