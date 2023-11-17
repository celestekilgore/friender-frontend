import { useState } from "react";

function ProfileCard({ user, swipe }) {
    const [hasSwiped, setHasSwiped] = useState(false);

    async function handleSwipe(response: boolean) {
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