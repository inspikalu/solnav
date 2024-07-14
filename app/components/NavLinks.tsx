'use client'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface INavlinksProps {
    links: { path: string, name: string, navIcon: IconProp }[]
}
const NavLinks: React.FC<INavlinksProps> = ({ links }) => {
    const path = usePathname()
    console.log(path)
    return (
        <ul className="flex gap-2 md:flex-col justify-between md:justify-start items-center md:items-start w-full space-x-0 md:space-x-0  space-y-0 md:space-y-4 bg-white dark:bg-gray-800 p-2 md:p-0 border-t md:border-t-0 border-gray-200 dark:border-gray-700">
            {links.map((link, index) => (
                <li key={index} className="w-full">
                    <Link href={link.path} className={ `flex flex-col md:flex-row items-center md:space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 w-full justify-center md:justify-start ${path === link.path && 'bg-gray-200 dark:bg-gray-700'}`}>
                        <FontAwesomeIcon icon={link.navIcon}  className="text-blue-500" />
                        <span className="text-sm font-medium text-center md:text-left">{link.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default NavLinks;
