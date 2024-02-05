import axios from 'axios';

type PatchType = {
    [key: string]: any;
};

type ReturnType = (
    endPoint: string,
    key: string,
    patchData: PatchType
) => Promise<void>;

const usePatch = (): ReturnType => {
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
