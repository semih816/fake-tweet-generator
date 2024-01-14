import React from'react';
import Contentloader from'react-content-loader';


const AvatarLoader = (props) =>( 

    <Contentloader
    speed={2}
    width={60}
    height={48}
    viewBox='0 0 60 48'
    backgroundColor='#333'
    foregroundColor='#444'
    {...props}
    >
        <circle cx="24" cy="24" r="24"  />
    </Contentloader>
)

export {AvatarLoader}