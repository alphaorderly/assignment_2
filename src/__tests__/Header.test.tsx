import Header from '../components/Header';
import { render, screen } from '../utils/test-utils';

describe('renders well', () => {
    it('test render', () => {
        render(<Header />);

        expect(screen.getByText('님의 스마트팜')).toBeInTheDocument();

        expect(
            screen.getByRole('img', { name: '상상텃밭 로고' })
        ).toBeInTheDocument();
    });
});
