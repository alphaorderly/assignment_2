import { render, screen } from '../utils/test-utils';
import FarmInformation from '../views/Farm/FarmInformation/FarmInformation';

describe('it renderes well', () => {
    it('renders', async () => {
        render(<FarmInformation />);

        const farmName = await screen.findByText('tname1');
        expect(farmName).toBeInTheDocument();

        const deviceName = await screen.findByText('에어컨');
        expect(deviceName).toBeInTheDocument();
    });
});
