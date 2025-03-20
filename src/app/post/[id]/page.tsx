interface Post {
    id: number;
    title: string;
    body: string;
}

async function getPostDetail(id: number): Promise<Post> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res.json();
}

export default async function PostDetail({ params }: { params: { id: string } }) {
    const post = await getPostDetail(Number(params.id));

    return (
        <div className="px-20" >
            <h1 className="text-3xl font-bold mt-10 ">{post.title}</h1>
            <p className="text-2xl mt-2">{post.body}</p>
        </div>
    );
}
