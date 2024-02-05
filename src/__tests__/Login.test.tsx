import userEvent from '@testing-library/user-event';
import { render, screen } from '../utils/test-utils';
import Login from '../views/Login/Login';

describe('rendered correctly', () => {
    it('test render items', () => {
        render(<Login />);

        expect(screen.getByText('텃밭 관리 페이지 로그인')).toBeInTheDocument();

        expect(
            screen.getByText('올바른 아이디를 입력해 로그인 하십시오.')
        ).toBeInTheDocument();

        expect(screen.getByRole('textbox')).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: '로그인' })
        ).toBeInTheDocument();
    });
});

describe('working correctly', () => {
    it('fails login', async () => {
        render(<Login />);

        const idInput = screen.getByRole('textbox');
        userEvent.type(idInput, 'work');

        const loginButton = screen.getByRole('button');
        userEvent.click(loginButton);

        const failText = await screen.findByText('올바른 아이디가 아닙니다.');
        expect(failText).toBeInTheDocument();
    });
});
