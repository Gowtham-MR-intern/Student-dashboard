import React, { useState } from 'react';
import { Button, Form, Input } from '@heroui/react';
import { auth } from './firebaseconfiguration';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
    const [log, setLog] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (log === "signup" && password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            if (log === "signup") {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Account created successfully!");
                setLog("login");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Logged in successfully!");
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-lg'>
                <h1 className='text-center text-xl mb-8'>{log === "login" ? "Login Page!" : "Signup Page!"}</h1>
                
                {error && <p className="text-red-500 text-center">{error}</p>}

                <Form className='flex flex-col gap-5 justify-center items-center' onSubmit={handleSubmit}>
                    <Input label="Email" type="email" variant="flat" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input label="Password" type="password" variant="flat" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    {log === "signup" && (
                        <Input label="Confirm Password" type="password" variant="flat" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    )}

                    <Button type="submit" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-2 w-[100px]" radius="full">
                        Submit
                    </Button>

                    <p>
                        {log === "login" ? 
                            <>Don't have an account? <a href="#" className='text-blue-500' onClick={() => setLog("signup")}>Signup</a></>
                            :
                            <>Already have an account? <a href="#" className='text-blue-500' onClick={() => setLog("login")}>Login</a></>
                        }
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;
