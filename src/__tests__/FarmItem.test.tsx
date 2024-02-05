import FarmItem from '../components/FarmItem';
import { render, screen } from '../utils/test-utils';

describe('render well', () => {
    it('checks rendering', async () => {
        render(<FarmItem key="test" id={1} name="name" ownerId="owner" />);

        const deviceName = await screen.findByText('에어컨');
        expect(deviceName).toBeInTheDocument();

        const sensor = screen.getByText('기온');
        expect(sensor).toBeDefined();

        const name = screen.getByText('name');
        expect(name).toBeDefined();
    });
});
