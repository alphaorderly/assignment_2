import UserFarmSelector from '../components/UserFarmSelector';
import { render, screen } from '../utils/test-utils';

describe('render well', () => {
    it('test rendering', async () => {
        render(<UserFarmSelector />);

        const select = await screen.findByRole('combobox');
        expect(select).toBeDefined();

        const options = await screen.findAllByRole('option');
        expect(options).toHaveLength(3);

        const listOption = screen.getByRole('option', { name: '농장 리스트' });
        expect(listOption).toBeDefined();
    });
});
