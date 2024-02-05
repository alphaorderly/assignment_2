import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

type AccountState = {
    id?: string;
    name?: string;
};

const accountStateDefault: AccountState = {
    id: undefined,
    name: undefined,
};

const accountState = atom<AccountState>({
    key: 'accountState',
    default: accountStateDefault,
    effects_UNSTABLE: [persistAtom],
});

export default accountState;
