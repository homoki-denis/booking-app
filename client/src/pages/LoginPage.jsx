import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="-mt-8">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" action="">
                <input type="email" placeholder="your@email.com" name="" id="" />
                <input type="password" placeholder="password" name="" id="" />
                <button className="primary">Login</button>
                    <div className="py-1">Don't have an account yet? 
                        <Link to={'/register'}> Register</Link>
                    </div>
            </form>
            </div>
        </div>
    );
}