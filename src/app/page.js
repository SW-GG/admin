import Image from "next/image";
import styles from "./page.module.css";
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>버튼</Button>
    </div>
  );
}
