/**
 * useFetch
 * firebase로 부터 특정 값을 받거나 모든 값을 받아 오는 과정을 간략화 하기 위해 작성.
 * firebase key값을 key id 로 가지는 객체들의 배열을 리턴한다.
 */

import axios from 'axios';
import { useEffect, useState } from 'react';

type ReturnType = [DataProp[], boolean, boolean, () => void];

type DataProp = {
    [key: string]: any;
};

const useFetch = (
    endPoint: string,
    orderBy?: string,
    equalTo?: string | number
): ReturnType => {
    const [data, setData] = useState<DataProp[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [reload, setReload] = useState(false);

    const reloadHandler = (): void => {
        setReload((prev) => !prev);
    };

    let query = {};

    if (orderBy !== undefined) {
        query = { ...query, orderBy: `"${orderBy}"` };
    }

    if (equalTo !== undefined) {
        if (typeof equalTo === 'string') {
            query = { ...query, equalTo: `"${equalTo}"` };
        } else {
            query = { ...query, equalTo: `${equalTo}` };
        }
    }

    useEffect(() => {
        setLoading(true);
        axios(
            `https://assignment-9ac0f-default-rtdb.asia-southeast1.firebasedatabase.app/${endPoint}`,
            {
                method: 'GET',
                params: query,
            }
        )
            .then((res) => res.data)
            .then((res) => {
                const result: DataProp[] = [];
                const keys = Object.keys(res);
                for (let i = 0; i < keys.length; i += 1) {
                    const item = {
                        key: keys[i],
                        ...res[keys[i]],
                    };
                    result.push(item);
                }
                setLoading(false);
                setData(result);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    return [data, loading, error, reloadHandler];
};

export default useFetch;
