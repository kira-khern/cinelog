import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth()

    return (
        <section>
            <h1>{user.username}</h1>
            <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
        </section>
    )
}