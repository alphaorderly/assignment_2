// src/mocks/handlers.ts
import { rest } from 'msw';

export default [
    rest.get(
        'https://assignment-9ac0f-default-rtdb.asia-southeast1.firebasedatabase.app/account.json',
        (req, res, ctx) => {
            const userId = req.url.searchParams.get('equalTo');
            if (userId === '"testid"') {
                return res(
                    ctx.status(200),
                    ctx.json({ key: { id: 'test1', name: 'test' } })
                );
            }
            return res(ctx.status(200), ctx.json({}));
        }
    ),
    rest.get(
        'https://assignment-9ac0f-default-rtdb.asia-southeast1.firebasedatabase.app/device.json',
        (req, res, ctx) =>
            res(
                ctx.status(200),
                ctx.json({
                    exampledevice: {
                        connection: true,
                        id: 0,
                        name: '에어컨',
                        power: true,
                        smartFarmId: 0,
                    },
                })
            )
    ),
    rest.get(
        'https://assignment-9ac0f-default-rtdb.asia-southeast1.firebasedatabase.app/smartfarm.json',
        (req, res, ctx) =>
            res(
                ctx.status(200),
                ctx.json({
                    aa: {
                        id: 'tid1',
                        name: 'tname1',
                        ownerId: 'town1',
                    },
                })
            )
    ),
];
