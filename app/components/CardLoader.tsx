import React from 'react';

function CardLoader() {
    

    return (
        <div className='animate-pulse'>
            <div className={`flex flex-col gap-2 min-w-[13rem] min-h-[7rem] rounded-md bg-gray-200 dark:bg-blue-950 p-3`}>
                <div className="w-full h-5 rounded-md bg-gray-300 dark:bg-blue-900"></div>
                <div className="w-full h-3 rounded-md bg-gray-300 dark:bg-blue-900"></div>
            </div>
        </div>
    );
}

export default CardLoader;
