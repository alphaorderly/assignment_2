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
        <div className="m-20 grid auto-rows-min auto-rows-min grid-cols-6">
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
