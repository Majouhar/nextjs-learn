import Link from "next/link";
import classes from "./page.module.css";
import ImageSlideshow from "@/components/images/images-slideshow";
import { getDictionary } from "@/lib/dictionary";
export default async function Home({ params }) {
  const dict = await getDictionary(params.lang);
  const lang = dict.home
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>{lang["caption"]}</h1>
            <p>{lang["sub-caption"]}</p>
          </div>
          <div className={classes.cta}>
            <Link href={"/community"}>{lang["join-the-community"]}</Link>
            <Link href={"/meals"}>{lang["secondary-btn"]}</Link>
          </div>
        </div>
      </header>
      <main>
        {" "}
        <section className={classes.section}>
          <h2>{lang["how-it-works"]}</h2>
          <p>{lang["how-it-works-para-1"]}</p>
          <p>{lang["how-it-works-para-2"]}</p>
        </section>
        <section className={classes.section}>
          <h2>{lang["why-food"]}</h2>
          <p>{lang["why-food-para-1"]}</p>
          <p>{lang["why-food-para-2"]}</p>
        </section>
      </main>
    </>
  );
}
