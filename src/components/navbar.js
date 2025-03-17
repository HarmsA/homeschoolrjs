import {Link} from "react-router-dom"
import {useLogout} from '../hooks/useLogout'
import Bag from './school-bag.png'
import styles from './Navbar.module.css'
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
    const { logout, error, isPending } = useLogout()
    const {user, } = useAuthContext()


    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.logo}>
                    <img src={Bag} alt="School Bag"/>
                    <span>School Work</span>
                </li>
                {!user &&
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                }

                {user &&  (
                    <li>
                        {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                        {isPending && <button className="btn" disabled>Logging out...</button>}
                        {error && <div>Could not log out out, try again</div>}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;