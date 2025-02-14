import ProfileImage from '../../components/profile/ProfileImage';

const NavBar = () => {
return (
<div className="navbar w-full fixed top-0 left-0 bg-clip-padding backdrop-filter backdrop-blur-lg border-b border-black-300">
                
<div className="flex-1">
    <a className="btn btn-ghost text-3xl font-semibold" style={{ color: 'var(--dark-yellow)', fontFamily: 'var(--logo-font)' }} href='/'>
        Conversify
    </a>
</div>
<div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <ProfileImage/>
            </div>
        </div>
    </div>
</div>
</div>
)
};

export default NavBar;
