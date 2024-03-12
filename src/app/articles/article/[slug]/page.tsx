'use client'
import Comments from "@/app/components/Comments";
//import dbRef from "@/app/connect-bd/firebase";
/*export async function generateStaticParams() {
  
  const articles = await fetch(
    "https://finance-blog-f38f2-default-rtdb.europe-west1.firebasedatabase.app/articles"
  ).then((res) => res.json());

  console.log(articles);

  return articles.map((article: object) => ({
    props: article,
  }));
}

export default function Page({ props }: {  props: { header: string, article: string }}) {
  console.log(`params.slug ${props}`);

  return (
    <div className="flex h-60 flex-col items-center justify-between p-24">
      <p className="mb-10">Article: {props.article}</p>
      <Comments />
    </div>
  );
}*/
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get,  } from "firebase/database";
import { useEffect, useState } from "react";

interface IArticlesState {
  article: string;
  header: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  console.log(params);
  const [articles, setArticles] = useState <IArticlesState>();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDUiAodSQPNH8r0s6F3BfaMS-b1zX1LKUI",
      authDomain: "finance-blog-f38f2.firebaseapp.com",
      databaseURL: "https://finance-blog-f38f2-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "finance-blog-f38f2",
      storageBucket: "finance-blog-f38f2.appspot.com",
      messagingSenderId: "140148358827",
      appId: "1:140148358827:web:99183db5674ede654981ee"
    };
  
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    console.log(params.slug);
    
    let result: Array<IArticlesState> = [];
    get(child(dbRef, `articles/id${params.slug}`)).then((snapshot) => {
      if (snapshot.exists()) {
        //let temp: IKeyAS = snapshot.val();
        setArticles(snapshot.val())
        //setArticles([snapshot.val()])
      } else {
        console.log("No data available");
      }
    })
      .catch((error) => {
        console.error(error);
      });
    
    
  }, []);


    return (
        <div className="flex h-60 flex-col items-center justify-between p-24">
          <p className="mb-10">Header: {articles?.header}</p>
          <p className="mb-10">Article: {articles?.article}</p>
          <Comments />
        </div>
      );
  }