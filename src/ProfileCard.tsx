import { useState } from "react";
import { UserInterface } from "./interfaces";
/** Profile Card component
 *
 * Props:
 * user: object like {username, zip_code, friend_radius, hobbies, interests, image}
 * swipe: function to call in parent.
 *
 * State:
 * hasSwiped: bool
 *
 * GetPotentialFriend -> ProfileCard
 */

function ProfileCard({ user, swipe }: { user: UserInterface, swipe: Function; }) {
    const [hasSwiped, setHasSwiped] = useState(false);

    async function handleSwipe(response: boolean): Promise<void> {
        setHasSwiped(true);
        await swipe(response);
    }

    return (
        <div className="ProfileCard Form">
            <h1>{user.username}</h1>
            <div className="text-center">
                <img className="profile-card-image" src={user.image} />
            </div>


            <h4>Hobbies</h4>
            <p>{user.hobbies}</p>

            <h4>Interests</h4>
            <p>{user.interests}</p>

            <button className="btn btn-danger" onClick={() => { handleSwipe(false); }} disabled={hasSwiped}>No</button>
            <button className="btn btn-success" style={{ float: "right" }} onClick={() => { handleSwipe(true); }} disabled={hasSwiped}>Yes</button>

        </div>
    );
}

export default ProfileCard;