import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import accountState from '../store/account-state';

type LoginReturnType = [(id: string) => void, boolean];

/**
 * 로그인에 사용할 함수를 리턴한다.
 * [login, success] = useLogin();
 * @returns { (id: string) => void } login 유저 id를 인자로 받는 함수, 실패시 두번째 인자가 false 가 된다.
 * @returns { boolean } success 성공 여부
 */
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
