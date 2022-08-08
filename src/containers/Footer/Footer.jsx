import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.scss";

import {
    faGripfire,
    faReact,
    faHtml5,
    faSass,
} from "@fortawesome/free-brands-svg-icons";

export function Footer() {
    return (
        <div className={styles.Container}>
            <FontAwesomeIcon icon={faGripfire} size="5x" />
            <FontAwesomeIcon icon={faReact} size="5x" />
            <FontAwesomeIcon icon={faHtml5} size="5x" />
            <FontAwesomeIcon icon={faSass} size="5x" />
        </div>
    );
}

export default Footer;
