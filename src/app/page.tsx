
import Articles from '@/app/articles/page'

export default function Home() {
  /*const router = useRouter()
  router.push('/articles')*/
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Articles/>
    </main>
  );
}
