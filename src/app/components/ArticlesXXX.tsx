'use client'
import Link from "next/link";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { useEffect, useState } from "react";


interface ArticlesState {
  article: string;
  header: string;
}

export default function Page() {
    //let posts = ['Article 1', 'Article 2', 'Article 3', 'Article 4', 'Article 5']
    const [articles, setArticles] = useState <ArticlesState[]>([{article: '', header: ''}])

    const getData = () => {
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
      const dbRef = ref(getDatabase());
      get(child(dbRef, `articles`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setArticles([...articles, snapshot.val()])
            console.log(snapshot.val(), articles);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

  useEffect(() => {
    getData()
  }, []);  
    
  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <p>Articles</p>
      <ul className="mt-10">
        {
        articles.map((item, index) =>(
          <li key={index}>
            <Link href={`/articles/${index}/`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}