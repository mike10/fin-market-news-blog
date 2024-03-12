'use client'
import Link from "next/link";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get,  } from "firebase/database";
import { useEffect, useState } from "react";
import Article from '@/app/articles/article/[slug]/page'
//import dbRef from "@/app/connect-bd/firebase";


interface IArticlesState {
  article: string;
  header: string;
}
interface IKeyAS {
  [key: string]: IArticlesState;
}

export default function Page() {
    //let posts = ['Article 1', 'Article 2', 'Article 3', 'Article 4', 'Article 5']
    const [articles, setArticles] = useState <Array<IArticlesState>>([]);

    let data:Array<IArticlesState> = []
    //data = getData()
    //console.log('data =', data);
    
    

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
  
    let result: Array<IArticlesState> = [];
    get(child(dbRef, `articles`)).then((snapshot) => {
      if (snapshot.exists()) {
        let temp: IKeyAS = snapshot.val();
  
        for (const key in temp) {
          //console.log(key, temp[key]);
          result.push(temp[key]);
        }
        setArticles(result)
  
  
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
    
    
    <div className="flex flex-col items-center justify-center mt-10 ">
      <p>Articles</p>
      <ul className="mt-10">
        {
        articles.map((item, index) =>(
          <li key={index}>
            <Link href={`/articles/article/${index+1}/`}>{item.header}</Link>
          </li>
        ))
        
        }
      </ul>
    </div>
  );
}

/*function getData(data: Array<IArticlesState>) {
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

  let result: Array<IArticlesState> = [];
  get(child(dbRef, `articles`)).then((snapshot) => {
    if (snapshot.exists()) {
      let temp: IKeyAS = snapshot.val();

      for (const key in temp) {
        //console.log(key, temp[key]);
        result.push(temp[key]);
      }
      data = result


      //setArticles([snapshot.val()])
    } else {
      console.log("No data available");
    }
  })
    .catch((error) => {
      console.error(error);
    });
console.log('result2 =', result);
  return result;
}*/