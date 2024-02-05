import axios from 'axios';

type PatchType = {
    [key: string]: any;
};

type ReturnType = (
    endPoint: string,
    key: string,
    patchData: PatchType
) => Promise<void>;

/**
 * 파이어베이스의 값을 쉽게 변경하기 위한 함수를 리턴한다.
 * @returns patch
 */
const usePatch = (): ReturnType => {
    /**
     * 파이어베이스의 값을 변경하기 위한 함수.
     * @param {string} endPoint 파이어베이스 json 경로
     * @param {string} key 파이어베이스 key
     * @param {object} patchData 변경할 키-값
     */
    const patch = async (
        endPoint: string,
        key: string,
        patchData: PatchType
    ): Promise<void> => {
        await axios(
            `https://assignment-9ac0f-default-rtdb.asia-southeast1.firebasedatabase.app/${endPoint}/${key}.json`,
            {
                method: 'PATCH',
                data: JSON.stringify(patchData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    };

    return patch;
};

export default usePatch;
