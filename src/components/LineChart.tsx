import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type LineChartProp = {
    start: number;
    count: number;
    title: string;
    color: string;
};

const randomNumber = (current: number): number =>
    current + Math.random() * (Math.random() >= 0.5 ? -1 : 1);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart: React.FC<LineChartProp> = ({ start, count, title, color }) => {
    const labels: number[] = [];

    for (let i = 0; i < count; i += 1) {
        labels.push(i);
    }

    let value = start;

    const data = {
        labels,
        datasets: [
            {
                data: labels.map(() => {
                    value = randomNumber(value);
                    return value;
                }),
                borderColor: color,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 1,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
        },
    };

    return (
        <div className="shadow-lg shadow-gray-400">
            <div className="m-4">
                <p className="text-xl font-bold">{title}</p>
            </div>
            <div className="m-4">
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default LineChart;
