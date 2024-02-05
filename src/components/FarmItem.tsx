import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePatch from '../hooks/usePatch';

type FarmItemProp = {
    key: string;
    id: number;
    name: string;
    ownerId: string;
};

const FarmItem: React.FC<FarmItemProp> = (props) => {
    const temperature = Math.floor(Math.random() * 10) + 20;
    const humidity = Math.floor(Math.random() * 30) + 40;
    const co2 = Math.floor(Math.random() * 30) + 80;
    const ec = Math.floor(Math.random() * 400) + 800;
    const ph = Math.floor(Math.random() * 2) + 5.5;
    const waterTemperature = Math.floor(Math.random() * 10) + 20;

    const navigate = useNavigate();

    const [devices, loading, , reload] = useFetch(
        'device.json',
        'smartFarmId',
        props.id
    );

    const patch = usePatch();

    const devicePowerHandler = (
        deviceKey: string,
        currentPower: boolean
    ): void => {
        patch('device', deviceKey, { power: !currentPower }).then(() => {
            reload();
        });
    };

    const clickHandler = (): void => {
        navigate(`/farms/${props.id}`);
    };

    return (
        <div className="m-4">
            <div
                className="cursor-pointer rounded-lg hover:shadow-lg hover:shadow-black"
                onClick={clickHandler}
            >
                <div className="rounded-t-lg bg-[#95d5b2] p-4 shadow-sm">
                    <p className="text-2xl font-bold">{props.name}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 bg-[#d8f3dc] p-4 shadow-lg">
                    {loading && <div>loading...</div>}
                    {loading ||
                        devices.map(
                            (device): ReactNode => (
                                <div
                                    key={device.id}
                                    className="mx-4 flex justify-between"
                                >
                                    <p>{device.name}</p>
                                    <div>
                                        <PowerSettingsNewIcon
                                            className={`${device.power ? 'rounded-lg text-green-900 shadow-inner shadow-gray-500' : 'text-gray-300'} mr-3 cursor-pointer`}
                                            onClick={(e): void => {
                                                devicePowerHandler(
                                                    device.key,
                                                    device.power
                                                );
                                                e.stopPropagation();
                                            }}
                                        />
                                        <span>
                                            {device.power ? '켜짐' : '꺼짐'}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                </div>
                <div className="grid grid-cols-2 gap-3 rounded-b-lg bg-[#95d5b2] p-4 shadow-sm">
                    <div className="flex justify-around ">
                        <p className="font-bold">기온</p>
                        <p>{temperature}℃</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">습도</p>
                        <p>{humidity}%</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">이산화탄소</p>
                        <p>{co2}ppm</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">EC</p>
                        <p>{ec}</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">pH</p>
                        <p>{ph}</p>
                    </div>
                    <div className="flex justify-around">
                        <p className="font-bold">수온</p>
                        <p>{waterTemperature}℃</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmItem;
