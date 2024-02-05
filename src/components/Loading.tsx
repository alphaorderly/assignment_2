import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

const Loading: React.FC = () => (
    <div className="flex h-[80vh] w-[100%] items-center justify-center">
        <RefreshIcon className="animate-spin" fontSize="large" />
    </div>
);

export default Loading;
