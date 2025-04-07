import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import image404 from "../../public/404.jpg";

export default function ErrorPage() {
  return (
    <>
      <main className={styles.main}>
        <p className={styles.text404}>404</p>
        <p>Sorry, an unexpected error has occurred.</p>
        <Link href="/" className={styles.turnMainPageLink}>
          Turn to main page! ======&gt;&gt;&gt;
        </Link>
        <div className={styles.imageContainer} data-testid="404">
          <Image src={image404} alt="404" width="300" height="300" className={styles.img404} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const errorMessage = "Sorry, an unexpected error has occurred.";
  return {
    props: {
      errorMessage,
    },
  };
}
