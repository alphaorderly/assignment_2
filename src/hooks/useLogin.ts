import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import accountState from '../store/account-state';

type LoginReturnType = [(id: string) => void, boolean];

const useLogin = (): LoginReturnType => {
    const setAccount = useSetRecoilState(accountState);

    const [success, setSuccess] = useState(true);

    const login = (id: string): void => {
        axios(
            'https://assignment-9ac0f-default-rtdb.asia-southeast1.firebasedatabase.app/account.json',
            {
                method: 'GET',
                params: {
                    orderBy: '"id"',
                    equalTo: `"${id}"`,
                },
            }
        )
            .then((res) => res.data)
            .then((res) => {
                if (Object.keys(res).length === 1) {
                    const info = res[Object.keys(res)[0]];
                    setAccount({ id: info.id, name: info.name });
                } else {
                    setSuccess(false);
                }
            });
    };

    return [login, success];
};

export default useLogin;
