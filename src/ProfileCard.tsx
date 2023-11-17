import FrienderApi from "./FrienderApi";

function ProfileCard({ user, swipe }) {
    async function handleSwipe(response: boolean) {
        await swipe(response);
    }

    return (
        <div className="ProfileCard Form">
            <h1>{user.username}</h1>
            <div className="text-center">
                <img src={user.image} />
            </div>


            <h4>Hobbies</h4>
            <p>{user.hobbies}</p>

            <h4>Interests</h4>
            <p>{user.interests}</p>

            <button className="btn btn-danger" onClick={() => { handleSwipe(false); }}>No</button>
            <button className="btn btn-success" style={{ float: "right" }} onClick={() => { handleSwipe(true); }}>Yes</button>

        </div>
    );
}

export default ProfileCard;