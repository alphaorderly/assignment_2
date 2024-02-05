import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useFetch from '../hooks/useFetch';
import accountState from '../store/account-state';

type UserFarmSelectorProp = {
    className?: string;
};

const UserFarmSelector: React.FC<UserFarmSelectorProp> = ({ className }) => {
    const account = useRecoilValue(accountState);
    const [farms, loading] = useFetch('smartfarm.json', 'ownerId', account.id);
    const navigate = useNavigate();

    const selectHandler = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        if (Number(event.target.value) === -1) return;
        navigate(`/farms/${event.target.value}`);
        window.location.reload();
    };

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <select
            defaultValue={-1}
            onChange={selectHandler}
            className={`${className} border-2 border-black p-2`}
        >
            <option value={-1}>농장 리스트</option>
            {farms.map((farm) => (
                <option value={farm.id} key={farm.id}>
                    {farm.name}
                </option>
            ))}
        </select>
    );
};

export default UserFarmSelector;
