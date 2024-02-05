import React from 'react';
import { useRecoilValue } from 'recoil';
import accountState from '../../../store/account-state';
import useFetch from '../../../hooks/useFetch';
import FarmItem from '../../../components/FarmItem';

const MyFarmList: React.FC = () => {
    const account = useRecoilValue(accountState);
    const [farms, loading, error] = useFetch(
        'smartfarm.json',
        'ownerId',
        account.id
    );

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>error...</div>;
    }

    return (
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:m-20 lg:grid-cols-3 xl:grid-cols-6">
            {farms.map((farm) => (
                <FarmItem
                    id={farm.id}
                    key={farm.key}
                    name={farm.name}
                    ownerId={farm.ownerId}
                />
            ))}
        </div>
    );
};

export default MyFarmList;
