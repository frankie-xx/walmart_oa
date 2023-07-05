import Image from "next/image";
import CharacterList from "./components/CharacterList/CharacterList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>Rick and Morty Characters</div>
      <CharacterList></CharacterList>
    </main>
  );
}
