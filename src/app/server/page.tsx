import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
}

async function getServerPosts(): Promise<Post[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data: Post[] = await res.json();
    return data.slice(10, 20);
}

export default async function ServerTab() {
    const posts = await getServerPosts();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 px-20 mt-5">Tab 2 (SSR)</h2>
            <ul className="space-y-2 mx-10">
                {posts.map((post) => (
                    <li
                        key={post.id}
                        // onClick={() => router.push(`/post/${post.id}`)}
                        className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                    >

                        <Link href={`/post/${post.id}`} className="block">
                        {post.title}
                    </Link>
                        {/*{post.title}*/}
                    </li>
                ))}
            </ul>
        </div>
    );
}
