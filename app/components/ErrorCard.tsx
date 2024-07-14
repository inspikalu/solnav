import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
interface IErrorCard {
    message: string
}
function ErrorCard({ message }: IErrorCard) {
    return (
        <div className='bg-red-100 dark:bg-red-800 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-2'>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default ErrorCard;
