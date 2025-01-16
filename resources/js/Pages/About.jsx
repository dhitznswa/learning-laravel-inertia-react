import { usePage } from "@inertiajs/react";

export default function About() {
    const { auth } = usePage().props;

    return (
        <div>
            <h1 className="title">About User</h1>

            <p>Name : {auth.user?.name}</p>
            <p>email : {auth.user?.email}</p>
        </div>
    );
}
