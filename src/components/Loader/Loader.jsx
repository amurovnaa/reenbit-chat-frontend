import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = ({ loading = true, size = 50, color = "#27ae60" }) => {
  if (!loading) return null;

  return (
    <div className={styles.loaderWrapper}>
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
