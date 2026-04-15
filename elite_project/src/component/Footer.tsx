import React from "react";
import logo from "../assets/logos/logo1.png";
import { useContact } from "../hooks/queries/useContact";
import { Container } from "../components/ui/Container";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const { data: contact } = useContact();

    const services = [
        "Media Production",
        "Websites & Applications",
        "Branding & Identity",
        "Graphic Design",
    ];

    return (
        <footer className="bg-neutral-900 pt-20 pb-10 text-white font-montserrat">
            <Container>
                <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-4">
                    {/* Logo & Branding */}
                    <div className="lg:col-span-1">
                        <Link to="/">
                            <img src={logo} alt="Elite Media Logo" className="mb-8 h-16 w-auto brightness-0 invert" />
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Elevating brands through strategic creativity and innovative media solutions. Elite Media for Elites.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-8 text-xl font-black uppercase tracking-tight text-primary">Get In Touch</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href={`mailto:${contact?.email}`} className="text-neutral-300 transition-colors hover:text-accent">
                                    {contact?.email}
                                </a>
                            </li>
                            <li className="text-neutral-400">
                                Egypt | (+20) {contact?.phone}
                            </li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-8 text-xl font-black uppercase tracking-tight text-primary">Services</h4>
                        <ul className="space-y-4">
                            {services.map((service) => (
                                <li key={service} className="text-neutral-400 transition-colors hover:text-white cursor-pointer">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-8 text-xl font-black uppercase tracking-tight text-primary">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-neutral-400 hover:text-white">About Us</Link></li>
                            <li><Link to="/work" className="text-neutral-400 hover:text-white">Our Work</Link></li>
                            <li><Link to="/contact" className="text-neutral-400 hover:text-white">Career</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
                    <div className="flex space-x-6">
                        {[
                            { icon: <FaFacebookF />, url: contact?.facebook_profile },
                            { icon: <FaInstagram />, url: contact?.instagram_profile },
                            { icon: <FaLinkedinIn />, url: contact?.linkedin_profile },
                        ].map((social, i) => (
                            <a 
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xl text-neutral-400 transition-colors hover:text-accent"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <div className="text-center text-xs font-bold uppercase tracking-widest text-neutral-500">
                        <p>© {new Date().getFullYear()} Elite Media Houses. All rights reserved.</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;