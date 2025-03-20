"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function ClientTab() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data: Post[]) => setPosts(data.slice(0, 10)));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 px-20 mt-5">Tab 1 (CSR)</h2>
            <ul className="space-y-2 mx-10">
                {posts.map((post) => (
                    <li key={post.id} className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition">
                        <Link href={`/post/${post.id}`} className="block">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


// CSR
// - Dùng useEffect và fetch() để lấy dữ liệu trên trình duyệt.
// - Gọi API sau khi render lần đầu).
// - Có thể cần hiển thị loading state trước khi dữ liệu tải xong.
// - Tăng tốc độ load trang ban đầu, nhưng có thể gây flash nội dung nếu dữ liệu tải chậm.
// - Không tốt vì nội dung được tải sau khi trang đã render.
// - Phù hợp cho dữ liệu thay đổi liên tục (bình luận, bài đăng mới, chat real-time, etc.).

//SSR
// - Dùng async function kết hợp với fetch() để lấy dữ liệu trên server trước khi render.
// - Gọi API trong quá trình xử lý trước khi render ra HTML.
// - Tải dữ liệu trước khi gửi HTML về trình duyệt, giúp giảm thời gian chờ dữ liệu.
// - Tốt hơn vì nội dung đã có sẵn trong HTML khi gửi về trình duyệt.
// - Hiển thị ngay dữ liệu mà không cần loading state.
// - Phù hợp cho dữ liệu tĩnh hoặc ít thay đổi (bài viết blog, danh mục sản phẩm).
