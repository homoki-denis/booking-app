import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="-mt-8">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" action="">
                <input type="email" placeholder="your@email.com" value={name} onChange={ev => setName(ev.target.value)} />
                <input type="password" placeholder="password"  value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button className="primary">Login</button>
                    <div className="py-1">Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link>
                    </div>
            </form>
            </div>
        </div>
    );
}