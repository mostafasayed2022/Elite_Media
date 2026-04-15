import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRegister } from '../hooks/mutations/useAuth';
import { FADE_UP, SCALE_UP } from '../constants/animations';
import { Button } from '../components/ui/Button';
import logo from "../assets/logos/logo1.png";
import backgroundImage from "../assets/home/bacground.png";
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate, isPending, error } = useRegister();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ username, email, password });
    };

    return (
        <div 
          className="relative min-h-screen flex items-center justify-center font-montserrat px-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={SCALE_UP}
              className="relative z-10 w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                
                <div className="text-center mb-10">
                    <motion.img 
                        variants={FADE_UP}
                        src={logo} 
                        alt="Elite Media Logo" 
                        className="h-20 mx-auto mb-6" 
                    />
                    <motion.h2 
                        variants={FADE_UP}
                        className="text-4xl font-black text-primary uppercase tracking-tighter"
                    >
                        Join Us
                    </motion.h2>
                    <motion.p variants={FADE_UP} className="text-secondary mt-2 font-medium">Create your elite account</motion.p>
                </div>

                {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold"
                    >
                        Registration failed. Please try again.
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={FADE_UP} className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/60">User Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border-b-2 border-primary/10 bg-gray-50 focus:bg-white rounded-xl py-4 h-14 px-6 text-lg font-bold outline-none transition-all focus:border-primary"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </motion.div>

                    <motion.div variants={FADE_UP} className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/60">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border-b-2 border-primary/10 bg-gray-50 focus:bg-white rounded-xl py-4 h-14 px-6 text-lg font-bold outline-none transition-all focus:border-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </motion.div>

                    <motion.div variants={FADE_UP} className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/60">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border-b-2 border-primary/10 bg-gray-50 focus:bg-white rounded-xl py-4 h-14 px-6 text-lg font-bold outline-none transition-all focus:border-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </motion.div>

                    <motion.div variants={FADE_UP} className="pt-4">
                        <Button 
                            type="submit" 
                            className="w-full h-14 rounded-xl" 
                            isLoading={isPending}
                        >
                            Register
                        </Button>
                    </motion.div>
                </form>

                <motion.div variants={FADE_UP} className="mt-10 text-center text-secondary font-medium">
                    <p>Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link></p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Register;
