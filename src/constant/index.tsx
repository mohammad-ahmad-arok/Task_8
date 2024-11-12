import { CiBookmark } from 'react-icons/ci';
import { TbPackages } from 'react-icons/tb';

const navLinks = [
    {
        path: '',
        label: 'Products',
        icon: <TbPackages />
    },
    {
        path: '',
        label: 'Favorites',
        icon: <CiBookmark/>
    },
    {
        path: '',
        label: 'Order List',
        icon: <CiBookmark />
    }
];

export {navLinks}