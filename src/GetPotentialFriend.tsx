import { useEffect, useState } from "react";
import FrienderApi from "./FrienderApi";
import ProfileCard from "./ProfileCard";
import Alert from "./common/Alert";

function GetPotentialFriend({ user }) {
    const [potentialFriend, setPotentialFriend] = useState(null);
    const [noMoreFriends, setNoMoreFriends] = useState(false);
    const [alerts, setAlerts] = useState([]);

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
        const status = await FrienderApi.establishRelationship(potentialFriend.username, response);
        if (status == "friends") {
            setAlerts([`You matched with ${potentialFriend.username}!`]);

            setTimeout(() => {
                setAlerts([]);
                setPotentialFriend(null);
            }, 3000);
        } else {
            setPotentialFriend(null);
        }

    }

    if (noMoreFriends) return <h1 className="vertical-center">No users found in your radius.</h1>;

    if (!potentialFriend) return <h1 className="vertical-center">Looking for potential friends...</h1>;

    return (
        <div>
            {alerts.length > 0 && <Alert alerts={alerts} category={"success"} />}
            <ProfileCard user={potentialFriend} swipe={swipe} />
        </div>);
}

export default GetPotentialFriend;