import Head from "next/head";
import { useState } from "react";
import styles from "./product.module.css";
import Link from "next/link";

export default function Home() {
  const [productNameInput, setProductNameInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setResult("");
    setTranslatedText("");
    setIsGenerating(true);

    // apiディレクトリのgenerate.jsファイルを読み込み
    const responseFromGenerate = await fetch("/api/generate", {
      // fetchのメソッド定義
      method: "POST",
      // headerはjson形式で定義
      headers: {
        "Content-Type": "application/json",
      },
      // bodyにコンテンツを定義し、generate.jsへpostする値を定義
      body: JSON.stringify({ productName: productNameInput }),
    });
    const data = await responseFromGenerate.json();

    setResult(data.result);

    const responseFromTranslate = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetText: result }),
    });

    const text = await responseFromTranslate.json();

    setTranslatedText(text.result);
    setProductNameInput("");
    setIsGenerating(false);
  }

  return (
    <div>
      <Head>
        <title>Generate Product Description</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Generate Product Description</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Enter a product name"
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>
          {isGenerating && "... Generating"}
          <p>{result}</p>
          <p>{translatedText}</p>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link href="/" className={styles.footer}>
          TOP
        </Link>
      </footer>
    </div>
  );
}
