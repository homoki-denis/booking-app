import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="-mt-8">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" action="">
                <input type="text" placeholder="your name" name="" id="" />
                <input type="email" placeholder="your@email.com" name="" id="" />
                <input type="password" placeholder="password"  />
                <button className="primary">Register</button>
                    <div className="py-1">Already a member? <Link className="underline text-black" to={'/login'}>Log in</Link>
                    </div>
            </form>
            </div>
        </div>
    );
}